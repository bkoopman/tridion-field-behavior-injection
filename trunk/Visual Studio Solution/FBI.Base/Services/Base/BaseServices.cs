using System;
using System.ServiceModel;
using System.ServiceModel.Activation;
using System.ServiceModel.Web;


using System.Collections.Generic;
using System.Collections;
using Tridion.ContentManager;


using System.Reflection;
using System.IO;

using System.Web;
using Tridion.ContentManager.CoreService.Client;
using System.Runtime.Serialization;
using System.Xml;
using Tridion.Web.UI.Core.Extensibility;
using System.Text;
using System.Web.Script.Serialization;
using System.Configuration;





namespace Tridion.Extensions.Services.Base
{


    /// <summary>
    /// Implementation of the Services
    /// </summary>
    /// <remarks></remarks>    
    public class BaseServices
    {
        public readonly string CONFIGURATION_KEY = "PE4Settings";
        private static string IMPERSONATION_USER_KEY = "ImpersonationUser";
        private static string TRIDION_SERVER_NAME = "TridionURL";
        protected Dictionary<string, string> settings = null;
        protected SessionAwareCoreServiceClient session;
        protected StreamDownloadClient downloadChannel;

        protected NetTcpBinding GetTcpBinding()
        {
            NetTcpBinding binding = new NetTcpBinding();
            binding.Name = "netTcp";
            binding.TransactionFlow = true;
            binding.TransactionProtocol = TransactionProtocol.WSAtomicTransaction11;
            binding.MaxReceivedMessageSize = 10485760;
            binding.ReaderQuotas.MaxStringContentLength = 10485760;
            binding.ReaderQuotas.MaxArrayLength = 10485760;

            return binding;
        }

        protected BasicHttpBinding GetBasicHttpStreamBinding(){
            BasicHttpBinding downloadBinding = new BasicHttpBinding();
            downloadBinding.Name = "streamDownload_basicHttp";
            downloadBinding.MaxReceivedMessageSize = 209715200;
            downloadBinding.TransferMode = TransferMode.StreamedResponse;
            downloadBinding.MessageEncoding = WSMessageEncoding.Mtom;
            downloadBinding.SendTimeout = TimeSpan.FromMinutes(10);
            downloadBinding.Security.Mode = BasicHttpSecurityMode.TransportCredentialOnly;
            downloadBinding.Security.Transport.ClientCredentialType = HttpClientCredentialType.Windows;
            return downloadBinding;
        }


        


        protected void OpenSession()
        {
            if (session == null)
            {
                NetTcpBinding binding = GetTcpBinding();
                EndpointAddress address = new EndpointAddress(string.Format("net.tcp://{0}:2660/CoreService/2012/netTcp", ConfigurationSettings.AppSettings.Get(TRIDION_SERVER_NAME)));
                session = new SessionAwareCoreServiceClient(binding, address);                
            }
            if (session.State != CommunicationState.Opened) {
                session.Open();
            }
            
            
        }

        protected void OpenChannel() { 
            if(downloadChannel == null || !(downloadChannel.State == CommunicationState.Opened)){
                BasicHttpBinding downloadBinding = GetBasicHttpStreamBinding();
                EndpointAddress address = new EndpointAddress(string.Format("http://{0}/webservices/CoreService2012.svc/streamDownload_basicHttp", ConfigurationSettings.AppSettings.Get(TRIDION_SERVER_NAME)));
                downloadChannel = new StreamDownloadClient(downloadBinding, address);
            }
            downloadChannel.Open();
        }

        

        protected void OpenSession(string userName)
        {
            if (session == null || !(session.State == CommunicationState.Opened))
            {
                NetTcpBinding binding = GetTcpBinding();
                EndpointAddress address = new EndpointAddress(string.Format("net.tcp://{0}:2660/CoreService/2012/netTcp", ConfigurationSettings.AppSettings.Get(TRIDION_SERVER_NAME)));
                session = new SessionAwareCoreServiceClient(binding, address);
            }
            session.Open();
            session.Impersonate(userName);
        }



        protected void CloseSession()
        {
            if (session.State != CommunicationState.Closed)
                session.Close();
        }

        protected void CloseChannel()
        {
            if (downloadChannel.State != CommunicationState.Closed)
                downloadChannel.Close();
        }


        public BaseServices()
        {



        }

        public bool SetConfigurationSetting(Dictionary<string, string> vars)
        {

            try
            {
                if (settings == null)
                {
                    InitilizeSettings();
                }

                this.OpenSession();
                UserData ud = session.GetCurrentUser();
                //Save config per user
                string subjectId = ud.Id;
                ApplicationData applicationData = session.ReadApplicationData(subjectId, CONFIGURATION_KEY);
                if (applicationData != null && applicationData.Data != null)
                {

                    session.ReadApplicationData(subjectId, CONFIGURATION_KEY);
                }
                foreach (string key in vars.Keys)
                {
                    if (settings.ContainsKey(key))
                    {
                        settings.Remove(key);
                    }
                    settings.Add(key, vars[key]);
                }
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                string sSettings = serializer.Serialize(settings);
                ApplicationDataAdapter applicationDataAdapter = new ApplicationDataAdapter(CONFIGURATION_KEY, sSettings);
                session.SaveApplicationData(subjectId, new ApplicationData[1] { applicationDataAdapter.ApplicationData });


            }
            catch (Exception ex)
            {
                return false;
            }
            finally
            {
                this.CloseSession();
            }
            return true;
        }

        public bool SetConfiguration(Dictionary<string, string> vars)
        {
            throw new NotImplementedException();
        }

        public String GetConfigurationSetting(string name)
        {
            try
            {
                if (settings == null)
                {
                    InitilizeSettings();
                }
                return settings[name];
            }
            catch
            {
                return null;
            }

        }

        public string[] GetConfigurationSettingsArray(string[] names)
        {
            try
            {
                if (settings == null)
                {
                    InitilizeSettings();
                }
                List<string> subSetOfSettings = new List<string>();
                foreach (string name in names)
                {
                    if (settings.ContainsKey(name))
                    {
                        subSetOfSettings.Add(settings[name]);
                    }
                    else
                    {
                        subSetOfSettings.Add(string.Empty);
                    }
                }
                return subSetOfSettings.ToArray();


            }
            catch
            {
                return null;
            }

        }


        public Dictionary<string, string> GetConfigurationSettings(string[] names)
        {
            try
            {
                if (settings == null)
                {
                    InitilizeSettings();
                }
                Dictionary<string, string> subSetOfSettings = new Dictionary<string, string>();
                foreach (string name in names)
                {
                    if (settings.ContainsKey(name))
                    {
                        subSetOfSettings.Add(name, settings[name]);
                    }
                    else
                    {
                        subSetOfSettings.Add(name, string.Empty);
                    }
                }
                return subSetOfSettings;


            }
            catch
            {
                return null;
            }

        }


        private void InitilizeSettings()
        {
            string subjectId = null;
            if (settings == null)
            {
                try
                {
                    Pipeline pipeline = new Pipeline();
                    settings = new Dictionary<string, string>();
                    this.OpenSession();
                    UserData ud = session.GetCurrentUser();
                    //Save config per user
                    subjectId = ud.Id;
                    JavaScriptSerializer serializer = new JavaScriptSerializer();

                    ApplicationData applicationData = session.ReadApplicationData(subjectId, CONFIGURATION_KEY);
                    if (applicationData == null || applicationData.Data == null)
                    {
                        session.DeleteApplicationData(subjectId, CONFIGURATION_KEY);

                        string sSettings = serializer.Serialize(settings);
                        ApplicationDataAdapter applicationDataAdapter = new ApplicationDataAdapter(CONFIGURATION_KEY, sSettings);
                        session.SaveApplicationData(subjectId, new ApplicationData[1]
                        {
                            applicationDataAdapter.ApplicationData
                        });
                    }
                    else
                    {
                        ApplicationDataAdapter applicationDataAdapter = new ApplicationDataAdapter(applicationData);
                        StringBuilder sb = new StringBuilder();
                        sb.Append(applicationDataAdapter.ApplicationData.GetAs<string>());
                        settings = serializer.Deserialize<Dictionary<string, string>>(sb.ToString());

                    }
                }
                catch (Exception ex)
                {
                    session.DeleteApplicationData(subjectId, CONFIGURATION_KEY);
                    throw ex;
                }
                finally
                {
                    this.CloseSession();
                }
            }

        }

        public byte[] GetMultimediaAsBytes(string tcmId)
        {
            byte[] buffer = null;
            try
            {
                this.OpenChannel();
                Stream s = downloadChannel.DownloadBinaryContent(tcmId);
                MemoryStream m = new MemoryStream();
                int b;
                do
                {
                    b = s.ReadByte();
                    m.WriteByte((byte)b);
                } while (b != -1);

                buffer = m.ToArray();
                return buffer;

            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally {
                this.CloseChannel();
            }
        }

        public Stream GetMultimediaAsStream(string tcmId)
        {
            
            try
            {
                this.OpenChannel();
                Stream s = downloadChannel.DownloadBinaryContent(tcmId);
                return s;

            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                this.CloseChannel();
            }
        }

        

    }
}
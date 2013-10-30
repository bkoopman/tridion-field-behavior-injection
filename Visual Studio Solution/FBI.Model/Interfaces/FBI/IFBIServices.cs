using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ServiceModel;
using System.ServiceModel.Web;
//using Tridion.Extensions.FBI.Model;


namespace Tridion.Extensions.FBI.Services.Interfaces
{
    /// <summary>
    /// Service Contract definition
    /// </summary>
    /// <remarks></remarks>
    [ServiceContract(Name = "FBIServices", Namespace = "Tridion.Extensions.FBI.Services")]
    public interface IFBIServices
    {
        
        [OperationContract]
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        String Echo(String input);

    }




}

using System;
using System.ServiceModel;
using System.ServiceModel.Activation;
using System.ServiceModel.Web;
using System.Threading;

using System.Collections.Generic;
using System.Collections;



using System.Reflection;
using System.IO;
using System.Web;

using System.Runtime.Serialization;
using System.Xml;
using System.Text;
using System.Web.Script.Serialization;



using System.Security;


using System.Xml.Linq;
using System.Linq;
using Tridion.Extensions.FBI.Model;
using Tridion.Extensions.Services.Base;
using Tridion.Extensions.UI.Validators;
using Tridion.Extensions.FBI.Services.Interfaces;





namespace Tridion.Extensions.Services.FBI
{

    
    /// <summary>
    /// Implementation of the Services
    /// </summary>
    /// <remarks></remarks>
    [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Required)]
    public class FBIServices :BaseServices, IFBIServices
    {
        private XElement _config = null;
        Dictionary<String, FieldValidationType> _validationTypes = null;


        Dictionary<String, FieldValidationType> ValidationTypes
        {
            get {
                if (_validationTypes == null) {
                    GetValidationTypes();
                }
                return _validationTypes;
            }
        }
        XElement Config
        {
            get
            {
                if (_config == null)
                {
                    string codeBase = Assembly.GetExecutingAssembly().CodeBase;
                    UriBuilder pathUri = new UriBuilder(codeBase);
                    string path = Uri.UnescapeDataString(pathUri.Path);
                    string configPath = Path.GetDirectoryName(path);
                    configPath = configPath + "\\FieldValidation.config";
                    _config = XElement.Load(configPath);
                }
                return _config;
            }

        }

        public FieldValidationType[] GetValidations()
        {
            return ValidationTypes.Values.ToArray();
        }

        public ValidationResult ValidateField(ValidationInput[] inputs)
        {
            ValidationResult result = new ValidationResult();
            result.Success = true;
            try
            {
                foreach (ValidationInput input in inputs)
                {


                    if (ValidationTypes.ContainsKey(input.Type))
                    {
                        FieldValidationType vt = ValidationTypes[input.Type];

                        string sAssembly = vt.Assembly;
                        string className = vt.Class;

                        Assembly assembly = null;
                        string codeBase = Assembly.GetExecutingAssembly().CodeBase;
                        UriBuilder uri = new UriBuilder(codeBase);
                        string path = Uri.UnescapeDataString(uri.Path);
                        path = Path.GetDirectoryName(path);
                        path = System.IO.Path.Combine(path, sAssembly);

                        // Use the file name to load the assembly into the current
                        assembly = Assembly.LoadFrom(path);

                        // Create a type
                        Type type = assembly.GetType(className);

                        // Create an instance.

                        IValidator validator = (IValidator)Activator.CreateInstance(type);
                        result = validator.ValidateField(vt, input.FieldName, input.FieldValue);
                        if (result.Success == false)
                        {
                            return result;
                        }

                    }
                }
            }
            catch (Exception ex) {
                result.Success = false;
                result.ErrorMessage = ex.Message;
                return result;
            }
            

            
            return result;   
        }

        private void GetValidationTypes() {
            _validationTypes = new Dictionary<string, FieldValidationType>();
            _validationTypes = Config.Descendants("ValidationType")
                .ToDictionary(
                    t => t.Attribute("type").Value,
                    t => new FieldValidationType()
                    {
                        Type = t.Attribute("type").Value,
                        Assembly = t.Attribute("assembly").Value,
                        Class = t.Attribute("class").Value,
                        Name = t.Descendants("Name").FirstOrDefault().Value.ToString(),
                        ErrorMessage = t.Descendants("ErrorMessage").FirstOrDefault().Value.ToString(),
                        RegularExpression = t.Descendants("Regex").FirstOrDefault().Value.ToString(),
                    }
                );
        }
    }
}
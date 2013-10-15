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

        public String Echo(String input)
        {
            return input;
        }
    }
}
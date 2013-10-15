using System;
using System.ServiceModel.Activation;
using Tridion.Extensions.Services.Base;
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
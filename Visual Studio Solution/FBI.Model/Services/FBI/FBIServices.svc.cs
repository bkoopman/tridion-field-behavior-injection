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

        /// <summary>
        /// Prepares the image for edition. This is meant to be used with the ImageEditor Behaviour
        /// </summary>
        /// <param name="itemId">The multimedia item URI</param>
        /// <returns>Path to temporary location of the image</returns>
        public string PrepareImage(string itemId)
        {
            throw new NotImplementedException();
        }
    }
}
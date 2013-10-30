using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ServiceModel;
using System.ServiceModel.Web;
//using Tridion.Extensions.FBI.Model;
using Tridion.Extensions.UI.FBI.Model.Services.FBI.SchemaFieldImageEditor.Data;


namespace Tridion.Extensions.FBI.Services.Interfaces
{
    /// <summary>
    /// Service Contract definition
    /// </summary>
    /// <remarks></remarks>
    [ServiceContract(Name = "FBIImageEditorServices", Namespace = "Tridion.Extensions.FBI.Services")]
    public interface IFBIImageEditorServices
    {
        
        [OperationContract]
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        String Echo(String input);

        

        [OperationContract]
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        ImageEditorResult CropImage(CropImageEditorInput input);

        [OperationContract]
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        ImageEditorResult FilterImage(FiltersImageEditorInput input);

        

    }




}

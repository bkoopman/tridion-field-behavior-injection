using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace Tridion.Extensions.UI.FBI.Model.Services.FBI.SchemaFieldImageEditor.Data
{
    [DataContract]
    public class FiltersImageEditorInput: BaseImageEditorInput
    {
        [DataMember]
        public Dictionary<string, string> Filters { get; set; }
    }
}
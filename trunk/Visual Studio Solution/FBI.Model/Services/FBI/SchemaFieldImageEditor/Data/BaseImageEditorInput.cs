using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace Tridion.Extensions.UI.FBI.Model.Services.FBI.SchemaFieldImageEditor.Data
{
    [DataContract]
    public class BaseImageEditorInput
    {
        [DataMember]
        public String Action { get; set; }

        [DataMember]
        public String ItemURI { get; set; }
    }
}
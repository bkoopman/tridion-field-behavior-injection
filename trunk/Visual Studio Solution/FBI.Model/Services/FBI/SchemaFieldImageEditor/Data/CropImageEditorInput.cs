using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace Tridion.Extensions.UI.FBI.Model.Services.FBI.SchemaFieldImageEditor.Data
{
    [DataContract]
    public class CropImageEditorInput: BaseImageEditorInput
    {
        [DataMember]
        public int X { get; set; }

        [DataMember]
        public int Y { get; set; }

        [DataMember]
        public int Width { get; set; }

        [DataMember]
        public int Height { get; set; }
    }
}
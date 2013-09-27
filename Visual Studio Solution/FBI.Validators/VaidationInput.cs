using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Runtime.Serialization;

namespace Tridion.Extensions.FBI.Model
{
    [DataContract]
    public class ValidationInput
    {
        [DataMember]
        public String Type { get; set; }
        [DataMember]
        public String FieldName { get; set; }
        [DataMember]
        public String FieldValue { get; set; }

    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Runtime.Serialization;

namespace Tridion.Extensions.FBI.Model
{
    [DataContract]
    public class FieldValidationType
    {
        
        [DataMember]
        public String Type { get; set; }
        [DataMember]
        public String Name { get; set; }
        [DataMember]
        public String Assembly { get; set; }
        [DataMember]
        public String Class { get; set; }
        [DataMember]
        public String ErrorMessage{ get; set; }
        [DataMember]
        public String RegularExpression { get; set; }
    }
}
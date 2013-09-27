using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Runtime.Serialization;

namespace Tridion.Extensions.FBI.Model
{
    [DataContract]
    public class ValidationResult
    {
        [DataMember]
        public bool Success { get; set; }
        [DataMember]
        public String ErrorMessage { get; set; }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Tridion.Extensions.FBI.Model;

namespace Tridion.Extensions.UI.Validators
{
    public interface IValidator
    {
        ValidationResult ValidateField(FieldValidationType validationType, string fieldName, string valueToValidate);
    }
}

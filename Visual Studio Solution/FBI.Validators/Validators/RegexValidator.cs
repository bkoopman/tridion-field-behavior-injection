using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Tridion.Extensions.UI.Validators;
using Tridion.Extensions.FBI.Model;
using System.Net.Mail;
using System.Text.RegularExpressions;

namespace FV.Validators
{
    public class RegexValidator: IValidator
    {

        public ValidationResult ValidateField(FieldValidationType validationType, string fieldName, string valueToValidate)
        {
            ValidationResult result = new ValidationResult();
            try
            {
                result.Success = true;

                if (!string.IsNullOrEmpty(validationType.RegularExpression)) {
                    if (!Regex.IsMatch(valueToValidate, validationType.RegularExpression)){                
                        result.Success = false;
                        result.ErrorMessage = string.Format(validationType.ErrorMessage, fieldName, "");
                    }
                }
                
                return result;
            }
            catch (FormatException ex)
            {
                result.ErrorMessage = string.Format(validationType.ErrorMessage, fieldName, ex.Message);
                result.Success = false;
                return result;
            }
                
            
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Tridion.Extensions.UI.Validators;
using System.Net.Mail;
using Tridion.Extensions.FBI.Model;

namespace FV.Validators
{
    public class EmailValidator: IValidator
    {

        public ValidationResult ValidateField(FieldValidationType validationType, string fieldName, string valueToValidate)
        {
            ValidationResult result = new ValidationResult();
            try
            {
                MailAddress m = new MailAddress(valueToValidate);                
                result.Success = true;
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

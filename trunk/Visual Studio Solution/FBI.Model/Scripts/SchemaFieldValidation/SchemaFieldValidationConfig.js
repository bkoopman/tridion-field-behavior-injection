Tridion.Type.registerNamespace("Tridion.Extensions.UI.FBI.Behaviours.SchemaFieldValidation");

Tridion.Extensions.UI.FBI.Behaviours.SchemaFieldValidation.Configuration = function SFVConfiguration() {
    /// <summary>
    /// Handler class to deal with the behaviours configuration, and triggers them.
    /// Moreover, it exposes a Helper class based on <see cref="Tridion.Extensions.UI.FBI.SchemaFieldBehaviourHelper"/>
    /// </summary>
    Tridion.OO.enableInterface(this, "Tridion.Extensions.UI.FBI.Behaviours.SchemaFieldValidation.Configuration");
    this.properties = {};
};

Tridion.Extensions.UI.FBI.Behaviours.SchemaFieldValidation.Configuration.prototype.getValidationRules = function SFVConfiguration$getValidationRules() {
    var p = this.properties;
    if (typeof p.validationRules === "undefined") {
        p.validationRules = [];
        var editor = $config.Editors[$fbiConst.EDITOR_NAME].configuration;
        if (editor) {
            var confXml = $xml.getNewXmlDocument(editor);
            var confObj = $xml.toJson(confXml);
            if (confObj) {
                confObj = confObj.behaviour;
                if (!confObj.length) {
                    confObj = [].concat(confObj);
                }

                for (var i = 0; i < confObj.length; i++) {
                    var validations = confObj[i].validation;
                    if (validations) {
                        for (var j = 0; j < validations.length; j++) {
                            var validation = validations[j];
                            var Name = this.getResourceValue(validation["@name"]);
                            var Message = this.getResourceValue(validation["@error"]);

                            var validationRule = {
                                Type: validation["@type"],
                                Name: Name,
                                Message: Message,
                                Regex: validation.regex

                            };
                            p.validationRules.push(validationRule.Type);
                            p.validationRules[validationRule.Type] = validationRule;
                        }
                        break;
                    }
                }
            }
            
        }
    }

    return p.validationRules;
};

Tridion.Extensions.UI.FBI.Behaviours.SchemaFieldValidation.Configuration.prototype.getValidationRule = function SFVConfiguration$getValidationRule(type) {
    var validationRules = this.getValidationRules();
    return validationRules[type];
};

Tridion.Extensions.UI.FBI.Behaviours.SchemaFieldValidation.Configuration.prototype.checkRule = function SFVConfiguration$checkRule(type, value) {
    var validationRules = this.getValidationRules();
    var rule = validationRules[type];
    var regexPattern = rule.Regex;
    var regex = XRegExp(regexPattern);
    var match = regex.test(value);
    var result = {
        Success: match,
        ValidationName: rule.Name,
        Message: rule.Message
    };
    return result;
};

Tridion.Extensions.UI.FBI.Behaviours.SchemaFieldValidation.Configuration.prototype.getResourceValue = function SFVConfiguration$checkRule(value) {
    if (value.indexOf("resources:") >= 0) {
        return $fbiConfig.getLabel(value.replace(/resources:/, ''));
    } else {
        return $fbiConfig.getLabel(value).replace('[', '').replace(']', '');
    }
};

$fbiValidationConfig = new Tridion.Extensions.UI.FBI.Behaviours.SchemaFieldValidation.Configuration();



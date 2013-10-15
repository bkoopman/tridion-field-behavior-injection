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
            
            if (!confObj.length) { 
                confObj = [].concat(confObj);
            }
            for (var i = 0; i < confObj.length; i++) {
                var validations = confObj[i].validation;
                if (validations) {
                    for (var j = 0; j < validations.length; j++) {
                        var validation = validations[j];
                        var Name = validation["@name"];
                        var Message = validation["@error"];
                        
                        Name = $fbiConfig.getLabel(Name);
                        Message = $fbiConfig.getLabel(Message);
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

    return p.validationRules;
};

$fbiValidationConfig = new Tridion.Extensions.UI.FBI.Behaviours.SchemaFieldValidation.Configuration();



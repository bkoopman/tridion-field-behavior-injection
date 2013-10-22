Tridion.Type.registerNamespace("Tridion.Extensions.UI.FBI.Behaviours.SchemaFieldSyntaxHighlight");

Tridion.Extensions.UI.FBI.Behaviours.SchemaFieldSyntaxHighlight.Configuration = function SFVConfiguration() {
    Tridion.OO.enableInterface(this, "Tridion.Extensions.UI.FBI.Behaviours.SchemaFieldSyntaxHighlight.Configuration");
    this.properties = {};

};

/*
Get a list of the languages from the extension configuration

*/
Tridion.Extensions.UI.FBI.Behaviours.SchemaFieldSyntaxHighlight.Configuration.prototype.getLanguages = function SFVConfiguration$getLanguages() {
    var p = this.properties;
    if (typeof p.Languages === "undefined") {
        p.Languages = [];
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
                    var languages = confObj[i].language;
                    if (languages) {

                        for (var j = 0; j < languages.length; j++) {
                            var language = languages[j];

                            var Type = language["@type"];
                            var LanguageItem = {
                                Type: language["@type"],
                                Name: language["@name"]
                            };
                            p.Languages.push(LanguageItem.Type);
                            p.Languages[LanguageItem.Type] = LanguageItem;
                        }
                        break;
                    }
                }
            }
            
        }
    }
    return p.Languages;
};

Tridion.Extensions.UI.FBI.Behaviours.SchemaFieldSyntaxHighlight.Configuration.prototype.getValidationRule = function SFVConfiguration$getValidationRule(type) {
    var validationRules = this.getValidationRules();
    return validationRules[type];
};

Tridion.Extensions.UI.FBI.Behaviours.SchemaFieldSyntaxHighlight.Configuration.prototype.checkRule = function SFVConfiguration$checkRule(type, value) {
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

$fbiSyntaxHighlightConfig = new Tridion.Extensions.UI.FBI.Behaviours.SchemaFieldSyntaxHighlight.Configuration();



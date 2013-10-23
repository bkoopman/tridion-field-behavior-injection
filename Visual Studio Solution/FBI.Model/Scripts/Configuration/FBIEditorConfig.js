/// <reference path="../Costants/FBIConstants.js" />
/// <reference path="../Helper/FBIHelper.js" />
Type.registerNamespace("Tridion.Extensions.UI.FBI");
Tridion.Extensions.UI.FBI.FBIEditorConfig = function FBIEditorConfig() {
    
    Tridion.OO.enableInterface(this, "Tridion.Extensions.UI.FBI.FBIEditorConfig");
    this.addInterface("Tridion.DisposableObject");
    var p = this.properties;
    this.Namespace = p.ns = $fbiConst.NAMESPACE_URL;
    var ns = { };
    ns[$fbiConst.NAMESPACE_PREFIX] = $fbiConst.NAMESPACE_URL;
    ns[$fbiConst.CONFIG_PREFIX] = $fbiConst.CONFIG_URL;

    p.disabled = false;
    var editor = $config.Editors[$fbiConst.EDITOR_NAME];
    p.configDoc = $xml.getNewXmlDocument(editor.configuration);

    p.enabled = $xml.selectStringValue(p.configDoc, "//cfg:fbi/@enabled", ns) == "true";
    p.showtab = $xml.selectStringValue(p.configDoc, "//cfg:fbi/@showTab", ns) == "true";
    p.behaviours = [];

    var behaviourNodes = $xml.selectNodes(p.configDoc, "//cfg:behaviour", ns);
    for (var i = 0; i < behaviourNodes.length; i++) {
        var behaviourNode = behaviourNodes[i];
        var behaviour = {
            enabled: $xml.selectStringValue(behaviourNode, "@enabled", ns) == "true",
            allFieldTypes: $xml.selectStringValue(behaviourNode, "@allFieldTypes", ns) == "true",
            name: $xml.selectStringValue(behaviourNode, "@name", ns),
            key: $xml.selectStringValue(behaviourNode, "@name", ns), //key is the name
            handler: $xml.selectStringValue(behaviourNode, "@handler", ns),
            allowedTypes: parseInt($xml.selectStringValue(behaviourNode, "//cfg:allowedFieldTypes/@value", ns)),
            
        };
        if (isNaN(behaviour.allowedTypes)) {
            behaviour.allowedTypes = 0;
        }

        p.behaviours.push(behaviour.key);
        p.behaviours[behaviour.key] = behaviour;
    }
};



Tridion.Extensions.UI.FBI.FBIEditorConfig.prototype.getBehaviourConfig = function BehaviourConfigurationBase$getBehaviourConfig(key) {
    var p = this.properties;
    return p.behaviours[key];
};


Tridion.Extensions.UI.FBI.FBIEditorConfig["SingleLineTextField"] = 1;
Tridion.Extensions.UI.FBI.FBIEditorConfig["MultiLineTextField"] = 2;
Tridion.Extensions.UI.FBI.FBIEditorConfig["KeywordField"] = 4;
Tridion.Extensions.UI.FBI.FBIEditorConfig["XHTMLField"] = 8;
Tridion.Extensions.UI.FBI.FBIEditorConfig["NumberField"] = 16;
Tridion.Extensions.UI.FBI.FBIEditorConfig["DateField"] = 32;
Tridion.Extensions.UI.FBI.FBIEditorConfig["ExternalLinkField"] = 64;
Tridion.Extensions.UI.FBI.FBIEditorConfig["ComponentLinkField"] = 128;
Tridion.Extensions.UI.FBI.FBIEditorConfig["MultimediaLinkField"] = 512;
Tridion.Extensions.UI.FBI.FBIEditorConfig["EmbeddedSchemaField"] = 1024;


Tridion.Extensions.UI.FBI.FBIEditorConfig.SingleLineTextField = 1;
Tridion.Extensions.UI.FBI.FBIEditorConfig.MultiLineTextField = 2;
Tridion.Extensions.UI.FBI.FBIEditorConfig.KeywordField = 4;
Tridion.Extensions.UI.FBI.FBIEditorConfig.XHTMLField = 8;
Tridion.Extensions.UI.FBI.FBIEditorConfig.NumberField = 16;
Tridion.Extensions.UI.FBI.FBIEditorConfig.DateField = 32;
Tridion.Extensions.UI.FBI.FBIEditorConfig.ExternalLinkField = 64;
Tridion.Extensions.UI.FBI.FBIEditorConfig.ComponentLinkField = 128;
Tridion.Extensions.UI.FBI.FBIEditorConfig.MultimediaLinkField = 512;
Tridion.Extensions.UI.FBI.FBIEditorConfig.EmbeddedSchemaField = 1024;




$fbiEditorConfig = new Tridion.Extensions.UI.FBI.FBIEditorConfig();
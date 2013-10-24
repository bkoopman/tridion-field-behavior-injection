/// <reference path="../Constants/FBIConstants.js" />
/// <reference path="../Helper/FBIHelper.js" />
Type.registerNamespace("Tridion.Extensions.UI.FBI");
Tridion.Extensions.UI.FBI.FBIEditorConfig = function FBIEditorConfig() {
    
    Tridion.OO.enableInterface(this, "Tridion.Extensions.UI.FBI.FBIEditorConfig");
    this.addInterface("Tridion.DisposableObject");
    var p = this.properties;
    p.fieldTypes = {};
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
    p.enabledBehaviours = [];
    p.enabledBehaviourKeys = [];

    var behaviourNodes = $xml.selectNodes(p.configDoc, "//cfg:behaviour", ns);
    for (var i = 0; i < behaviourNodes.length; i++) {
        var behaviourNode = behaviourNodes[i];
        var behaviour = {
            enabled: $xml.selectStringValue(behaviourNode, "@enabled", ns) == "true",
            allFieldTypes: $xml.selectStringValue(behaviourNode, "@allFieldTypes", ns) == "true",
            name: $xml.selectStringValue(behaviourNode, "@name", ns),
            key: $xml.selectStringValue(behaviourNode, "@name", ns), //key is the name
            handler: $xml.selectStringValue(behaviourNode, "@handler", ns),
            areaHandler: $xml.selectStringValue(behaviourNode, "@areaHandler", ns),
            allowedTypes: parseInt($xml.selectStringValue(behaviourNode, "cfg:allowedFieldTypes/@value", ns)),
            
        };
        if (isNaN(behaviour.allowedTypes)) {
            behaviour.allowedTypes = 0;
        }

        p.behaviours.push(behaviour.key);
        p.behaviours[behaviour.key] = behaviour;

        if (behaviour.enabled) {
            p.enabledBehaviours.push(behaviour);
            p.enabledBehaviourKeys.push(behaviour.key);
        }
    }
    
    p.fieldTypes = {};

    p.fieldTypes["SingleLineTextField"] = 1;
    p.fieldTypes["MultiLineTextField"] = 2;
    p.fieldTypes["KeywordField"] = 4;
    p.fieldTypes["XHTMLField"] = 8;
    p.fieldTypes["NumberField"] = 16;
    p.fieldTypes["DateField"] = 32;
    p.fieldTypes["ExternalLinkField"] = 64;
    p.fieldTypes["ComponentLinkField"] = 128;
    p.fieldTypes["MultimediaLinkField"] = 256;
    p.fieldTypes["EmbeddedSchemaField"] = 512;
    
    p.SingleLineTextField = 1;
    p.MultiLineTextField = 2;
    p.KeywordField = 4;
    p.XHTMLField = 8;
    p.NumberField = 16;
    p.DateField = 32;
    p.ExternalLinkField = 64;
    p.ComponentLinkField = 128;
    p.MultimediaLinkField = 512;
    p.EmbeddedSchemaField = 1024;
};

Tridion.Extensions.UI.FBI.FBIEditorConfig.prototype.getEnabledBehaviours = function BehaviourConfigurationBase$getEnabledBehaviours() {
    var p = this.properties;    
    return p.enabledBehaviours;
};

Tridion.Extensions.UI.FBI.FBIEditorConfig.prototype.getEnabledBehaviourKeys = function BehaviourConfigurationBase$getEnabledBehaviourKeys() {
    var p = this.properties;
    return p.enabledBehaviourKeys;
};

Tridion.Extensions.UI.FBI.FBIEditorConfig.prototype.getBehaviourConfig = function BehaviourConfigurationBase$getBehaviourConfig(key) {
    var p = this.properties;
    return p.behaviours[key];
};

Tridion.Extensions.UI.FBI.FBIEditorConfig.prototype.getAllBehaviours = function BehaviourConfigurationBase$getAllBehaviours() {
    var p = this.properties;
    return p.behaviours;
};

Tridion.Extensions.UI.FBI.FBIEditorConfig.prototype.isEnabled = function BehaviourConfigurationBase$isEnabled() {
    var p = this.properties;
    return p.enabled;
};

Tridion.Extensions.UI.FBI.FBIEditorConfig.prototype.isBehaviourEnabled = function BehaviourConfigurationBase$isBehaviourEnabled(key) {
    var p = this.properties;
    return p.behaviours[key].enabled;
};

Tridion.Extensions.UI.FBI.FBIEditorConfig.prototype.getFieldTypeValue = function BehaviourConfigurationBase$getFieldTypeValue(type) {
    var p = this.properties;
    return p.fieldTypes[type];
};







$fbiEditorConfig = new Tridion.Extensions.UI.FBI.FBIEditorConfig();
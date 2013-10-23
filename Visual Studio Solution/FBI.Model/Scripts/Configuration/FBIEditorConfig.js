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

    p.enabled = $xml.selectStringValue(configDoc, "//cfg:fbi/@enabled", ns) == "true";
    p.showtab =$xml.selectStringValue(configDoc, "//cfg:fbi/@showTab", ns) == "true";
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
            allowedTypes: parseInt($xml.selectStringValue(behaviourNode, "//cfg:allowedTypes/@value", ns))
        };
        
        p.behaviours.push(behaviour.key);
        p.behaviours[behaviour.key] = behaviour;
    }
    };

$fbiEditorConfig = new Tridion.Extensions.UI.FBI.FBIEditorConfig();
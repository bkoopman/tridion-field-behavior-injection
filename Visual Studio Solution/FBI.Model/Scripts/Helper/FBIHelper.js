Type.registerNamespace("Tridion.Extensions.UI.FBI");
//###########################################################################################################
//Schema Field Behaviour Helper
//###########################################################################################################
Tridion.Extensions.UI.FBI.SchemaFieldBehaviourHelper = function SchemaFieldBehaviourHelper() {
    Tridion.OO.enableInterface(this, "Tridion.Extensions.UI.FBI.SchemaFieldBehaviourHelper");
    this.addInterface("Tridion.DisposableObject");
    var p = this.properties;
    var c = p.controls = {};
    this.Namespace = p.ns = $fbiConst.NAMESPACE_URL;

};

Tridion.Extensions.UI.FBI.SchemaFieldBehaviourHelper.prototype.setFieldDesigner = function SchemaFieldBehaviourHelper$setFieldDesigner(fieldDesigner) {
    var p = this.properties;
    var c = p.controls;
    c.fieldDesigner = fieldDesigner;
};

Tridion.Extensions.UI.FBI.SchemaFieldBehaviourHelper.prototype.removeConfigurationValue = function SchemaFieldBehaviourHelper$removeConfigurationValue(fieldXml, groupId, behaviourName) {
    var p = this.properties;
    var c = p.controls;
    
    if (fieldXml) {
        var extensionXmlElement = $xml.selectSingleNode(fieldXml, "tcm:ExtensionXml");
        if (extensionXmlElement) {
            var configurationNode = $xml.selectSingleNode(extensionXmlElement, "fbi:configuration");
            console.debug(configurationNode);
            var groupNode = $xml.selectSingleNode(configurationNode, "fbi:group[@xlink:href='" + groupId + "']");
            if (configurationNode && groupNode) {
                var valueNode = $xml.selectSingleNode(groupNode, "fbi:" + behaviourName);
                if (valueNode) {
                    groupNode.removeChild(valueNode);
                    if (!groupNode.hasChildNodes()) {
                        configurationNode.removeChild(groupNode);
                    }
                    if (c && c.fieldDesigner) {
                        c.fieldDesigner.setFieldXml(fieldXml);
                    }
                }
            }
        }
    }
};

Tridion.Extensions.UI.FBI.SchemaFieldBehaviourHelper.prototype.removeConfigurationValue = function SchemaFieldBehaviourHelper$removeConfigurationValue(groupId, behaviourName) {
    var p = this.properties;
    var c = p.controls;
    var fieldXml = c.fieldDesigner.getFieldXml();
    this.removeConfigurationValue(fieldXml, groupId, behaviourName);

};


Tridion.Extensions.UI.FBI.SchemaFieldBehaviourHelper.prototype.getConfigurationValue = function SchemaFieldBehaviourHelper$getConfigurationValue(groupId, behaviourName) {
    var xmlNode = this.getConfigurationValueNode(groupId, behaviourName);
    return $xml.getInnerText(xmlNode);
};


Tridion.Extensions.UI.FBI.SchemaFieldBehaviourHelper.prototype.getConfigurationValueNode = function SchemaFieldBehaviourHelper$getConfigurationValueNode(fieldXml, groupId, behaviourName) {
    if (fieldXml) {
        var extensionXmlElement = $xml.selectSingleNode(fieldXml, "tcm:ExtensionXml");
        if (extensionXmlElement) {
            var configurationNode = $xml.selectSingleNode(extensionXmlElement, "fbi:configuration");
            var groupNode = $xml.selectSingleNode(configurationNode, "fbi:group[@xlink:href='" + groupId + "']");
            if (configurationNode && groupNode) {
                var valueNode = $xml.selectSingleNode(groupNode, "fbi:" + behaviourName);
                if (valueNode) {
                    return valueNode;
                }
            }
        }
    }
    return null;
};

Tridion.Extensions.UI.FBI.SchemaFieldBehaviourHelper.prototype.getConfigurationValueNode = function SchemaFieldBehaviourHelper$getConfigurationValueNode(groupId, behaviourName) {
    var p = this.properties;
    var c = p.controls;
    var fieldXml = c.fieldDesigner.getFieldXml();
    return this.getConfigurationValueNode(fieldXml, groupId, behaviourName);

};

Tridion.Extensions.UI.FBI.SchemaFieldBehaviourHelper.prototype.setConfigurationValue = function SchemaFieldBehaviourHelper$setConfigurationValue(groupId, behaviourName, value) {
    var p = this.properties;
    var c = p.controls;
    var fieldXml = c.fieldDesigner.getFieldXml();

    if (fieldXml) {
        var fieldDocument = fieldXml.ownerDocument;
        var extensionXmlElement = $xml.selectSingleNode(fieldXml, "tcm:ExtensionXml");
        if (!extensionXmlElement) {
            //no extension xml point available so we need to add it
            extensionXmlElement = $xml.createElementNS(fieldDocument, $const.Namespaces.tcm, "tcm:ExtensionXml");
            fieldXml.appendChild(extensionXmlElement);
        }

        // set the xml value to yes
        var configurationNode = $xml.selectSingleNode(extensionXmlElement, "fbi:configuration");
        
        if (!configurationNode) {
            configurationNode = $xml.createElementNS(fieldDocument, p.ns, "configuration");
            extensionXmlElement.appendChild(configurationNode);
        }

        var groupNode = $xml.selectSingleNode(extensionXmlElement, "fbi:configuration/fbi:group[@xlink:href='" + groupId + "']");
        if (!groupNode) {
            
            groupNode = $xml.createElementNS(fieldDocument, p.ns, "group");
            var attIdNode = $xml.createAttributeNS(fieldDocument, $const.Namespaces.xlink, "xlink:href");
            attIdNode.value = groupId;
            var attTypeNode = $xml.createAttributeNS(fieldDocument, $const.Namespaces.xlink, "xlink:type");
            attTypeNode.value = "simple";
            $xml.setAttributeNodeNS(groupNode, attIdNode, "");
            $xml.setAttributeNodeNS(groupNode, attTypeNode, "");
            $xml.setInnerXml(groupNode, "<{0} xmlns=\"{1}\">{2}</{0}>".format(behaviourName, p.ns, value));
            
            c.fieldDesigner.setFieldXml(fieldXml);
        }

    }
};
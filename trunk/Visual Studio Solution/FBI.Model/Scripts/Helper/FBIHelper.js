Type.registerNamespace("Tridion.Extensions.UI.FBI");

//###########################################################################################################
//Schema Field Behaviour Helper
//###########################################################################################################
Tridion.Extensions.UI.FBI.SchemaFieldBehaviourHelper = function SchemaFieldBehaviourHelper() {
    Tridion.OO.enableInterface(this, "Tridion.Extensions.UI.FBI.SchemaFieldBehaviourHelper");
    this.addInterface("Tridion.DisposableObject");
    var p = this.properties;
    p.controls = {};
    var ns = Tridion.Constants.Namespaces;
    this.Namespace = p.ns = $fbiConst.NAMESPACE_URL;
    ns[$fbiConst.NAMESPACE_PREFIX] = $fbiConst.NAMESPACE_URL;

};




Tridion.Extensions.UI.FBI.SchemaFieldBehaviourHelper.prototype.setFieldDesigner = function SchemaFieldBehaviourHelper$setFieldDesigner(fieldDesigner) {
    var p = this.properties;
    var c = p.controls;
    c.fieldDesigner = fieldDesigner;
};

Tridion.Extensions.UI.FBI.SchemaFieldBehaviourHelper.prototype.removeConfigurationValue = function SchemaFieldBehaviourHelper$removeConfigurationValue(groupId, behaviourName) {
    var p = this.properties;
    var c = p.controls;
    if (c.fieldDesigner) {
        var fieldXml = c.fieldDesigner.getFieldXml();

        if (fieldXml) {
            var extensionXmlElement = $xml.selectSingleNode(fieldXml, "tcm:ExtensionXml");
            if (extensionXmlElement) {
                var configurationNode = $xml.selectSingleNode(extensionXmlElement, "fbi:configuration");
                
                var groupNode = $xml.selectSingleNode(configurationNode, "fbi:group[@xlink:href='" + groupId + "']");
                if (configurationNode && groupNode) {
                    var valueNode = $xml.selectSingleNode(groupNode, "fbi:" + behaviourName);
                    if (valueNode) {
                        groupNode.removeChild(valueNode);
                        if (!groupNode.hasChildNodes()) {
                            configurationNode.removeChild(groupNode);
                        }
                        if (!configurationNode.hasChildNodes()) {
                            extensionXmlElement.removeChild(configurationNode);
                        }
                        c.fieldDesigner.setFieldXml(fieldXml);
                    }
                }
            }
        }
    } else {
        console.warn("This method is meant to be called on the 'SchemaView' only.");
    }
};


Tridion.Extensions.UI.FBI.SchemaFieldBehaviourHelper.prototype.getConfigurationValueFromFieldXml = function SchemaFieldBehaviourHelper$getConfigurationValueFromFieldXml(fieldXml, groupId, behaviourName) {
    var xmlNode = this.getConfigurationValueNodeFromFieldXml(fieldXml, groupId, behaviourName);
    return $xml.getInnerText(xmlNode);
};


Tridion.Extensions.UI.FBI.SchemaFieldBehaviourHelper.prototype.getConfigurationValueNodeFromFieldXml = function SchemaFieldBehaviourHelper$getConfigurationValueNodeFromFieldXml(fieldXml, groupId, behaviourName) {
    
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



Tridion.Extensions.UI.FBI.SchemaFieldBehaviourHelper.prototype.hasConfigurationValueFromFieldXml = function SchemaFieldBehaviourHelper$hasConfigurationValueNodeFromFieldXml(fieldXml, behaviourName) {
    
    if (fieldXml) {
        var extensionXmlElement = $xml.selectSingleNode(fieldXml, "tcm:ExtensionXml");
        if (extensionXmlElement) {
            var configurationNode = $xml.selectSingleNode(extensionXmlElement, "fbi:configuration");
            var xpath = "*/fbi:" + behaviourName;
            var valueNode = $xml.selectNodes(configurationNode, xpath);
            if (valueNode) {
                var result = {
                    behaviour: behaviourName,
                    groups: []
                };
                 
                for (var i = 0; i < valueNode.length; i++) {
                    var groupData =
                    {
                        groupId: $xml.selectStringValue(valueNode[i].parentNode, "@xlink:href", $const.Namespaces),
                        value: $xml.getInnerXml(valueNode[i])
                    };
                    result.groups.push(groupData);
                }
                return result;
            }
        }
    }
    return false;
};


Tridion.Extensions.UI.FBI.SchemaFieldBehaviourHelper.prototype.getConfigurationValue = function SchemaFieldBehaviourHelper$getConfigurationValue(groupId, behaviourName) {
    var xmlNode = this.getConfigurationValueNode(groupId, behaviourName);
    return $xml.getInnerText(xmlNode);
};

Tridion.Extensions.UI.FBI.SchemaFieldBehaviourHelper.prototype.getConfigurationValueNode = function SchemaFieldBehaviourHelper$getConfigurationValueNode(groupId, behaviourName) {
    var p = this.properties;
    var c = p.controls;
    if (c.fieldDesigner) {
        var fieldXml = c.fieldDesigner.getFieldXml();
        return this.getConfigurationValueNodeFromFieldXml(fieldXml, groupId, behaviourName);
    } else {
        console.warn("This method is meant to be called on the 'SchemaView' only.");
        return null;
    }
};

Tridion.Extensions.UI.FBI.SchemaFieldBehaviourHelper.prototype.setConfigurationValue = function SchemaFieldBehaviourHelper$setConfigurationValue(groupId, behaviourName, value) {
    var p = this.properties;
    var c = p.controls;
    var fieldXml = c.fieldDesigner.getFieldXml();
    
    if (c.fieldDesigner) {
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
                configurationNode.appendChild(groupNode);
            }
            var attIdNode = $xml.createAttributeNS(fieldDocument, $const.Namespaces.xlink, "xlink:href");
            attIdNode.value = groupId;
            var attTypeNode = $xml.createAttributeNS(fieldDocument, $const.Namespaces.xlink, "type");
            attTypeNode.value = "simple";
            $xml.setAttributeNodeNS(groupNode, attIdNode, $const.Namespaces.xlink);
            //$xml.setAttributeNodeNS(groupNode, attTypeNode, $const.Namespaces["xlink"]);

            var valueNode = $xml.selectSingleNode(groupNode, "fbi:" + behaviourName);
            if (!valueNode) {
                valueNode = $xml.createElementNS(fieldDocument, p.ns, behaviourName);
                groupNode.appendChild(valueNode);
            }

            $xml.setInnerXml(valueNode, value);
            c.fieldDesigner.setFieldXml(fieldXml);
            

        }
    } else {
        console.warn("This method is meant to be called on the 'SchemaView' only.");
    }
}; 
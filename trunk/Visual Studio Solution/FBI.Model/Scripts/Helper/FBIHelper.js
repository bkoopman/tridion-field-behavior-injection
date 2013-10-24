/// <reference path="../Costants/FBIConstants.js" />
Type.registerNamespace("Tridion.Extensions.UI.FBI");

Tridion.Extensions.UI.FBI.SchemaFieldBehaviourHelper = function SchemaFieldBehaviourHelper() {
    /// <summary>
    /// Helper class to access the configuration values within the Schema View. It also allows configuration retrieval from the field Xml 
    /// </summary>
    
    Tridion.OO.enableInterface(this, "Tridion.Extensions.UI.FBI.SchemaFieldBehaviourHelper");
    this.addInterface("Tridion.DisposableObject");
    var p = this.properties;
    p.controls = {};
    var ns = Tridion.Constants.Namespaces;
    this.Namespace = p.ns = $fbiConst.NAMESPACE_URL;
    ns[$fbiConst.NAMESPACE_PREFIX] = $fbiConst.NAMESPACE_URL;
};

Tridion.Extensions.UI.FBI.SchemaFieldBehaviourHelper.prototype.setFieldDesigner = function SchemaFieldBehaviourHelper$setFieldDesigner(fieldDesigner) {
    /// <summary>
    /// This method should be used in context if there is a <see cref="Tridion.Controls.FieldDesigner"/>.
    /// This will enable the getters and setters methods withouth the fieldXml. Those methods will pick the fieldXml from the fieldDesigner.
    /// </summary>
    var p = this.properties;
    var c = p.controls;
    c.fieldDesigner = fieldDesigner;
};

Tridion.Extensions.UI.FBI.SchemaFieldBehaviourHelper.prototype.removeConfigurationValue = function SchemaFieldBehaviourHelper$removeConfigurationValue(groupId, behaviourName) {
    /// <summary>Removes a given configuration value from the field selected in <see cref="this.properties.controsl.fieldDesigner"/>.</summary>
    /// <param name="groupId" type="Number">The group id to remove the configuration value. It can be a user id too.</param>
    /// <param name="behaviourName" type="Number">The behaviour to remove the configuration value.</param>
    
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
    /// <summary>Gets configuration value from the field XML.</summary>
    /// <param name="fieldXml" type="Number">The field Xml containing the configuration information.</param>
    /// <param name="groupId" type="Number">The group id of the configuration value. It can be a user id too.</param>
    /// <param name="behaviourName" type="Number">The behaviour of the configuration value.</param>
    /// <returns type="string">The configuration value as an string</returns>
    var xmlNode = this.getConfigurationValueNodeFromFieldXml(fieldXml, groupId, behaviourName);
    return $xml.getInnerText(xmlNode);
};

Tridion.Extensions.UI.FBI.SchemaFieldBehaviourHelper.prototype.getConfigurationValueNodeFromFieldXml = function SchemaFieldBehaviourHelper$getConfigurationValueNodeFromFieldXml(fieldXml, groupId, behaviourName) {
    /// <summary>Gets configuration value from the field XML.</summary>
    /// <param name="fieldXml" type="Number">The field Xml containing the configuration information.</param>
    /// <param name="groupId" type="Number">The group id of the configuration value. It can be a user id too.</param>
    /// <param name="behaviourName" type="Number">The behaviour of the configuration value.</param>
    /// <returns type="node">The configuration value as a node</returns>
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

Tridion.Extensions.UI.FBI.SchemaFieldBehaviourHelper.prototype.hasConfigurationValueFromFieldXml = function SchemaFieldBehaviourHelper$hasConfigurationValueNodeFromFieldXml(fieldXml, behaviourName, user) {
    /// <summary>Checks the configuration existence and returns its values.</summary>
    /// <param name="fieldXml" type="Number">The field Xml containing the configuration information.</param>
    /// <param name="behaviourName" type="Number">The behaviour of the configuration value.</param>
    /// <param name="user" type="Number">User logged in in the system.</param>
    /// <returns type="custom">
    /// The following object:
    /// var result = {
    ///     behaviourName: THE_NAME,
    ///     groupValues: 
    ///     [
    ///         {
    ///             groupId: groupId,
    ///             value: configValue
    ///         },
    ///         ...
    ///     ]
    /// };
    ///</returns>
    if (fieldXml) {
        var extensionXmlElement = $xml.selectSingleNode(fieldXml, "tcm:ExtensionXml");
        if (extensionXmlElement) {
            var configurationNode = $xml.selectSingleNode(extensionXmlElement, "fbi:configuration");
            var xpath = "*/fbi:" + behaviourName;
            var valueNode = $xml.selectNodes(configurationNode, xpath);
            
            if (valueNode.length>0) {
                var result = [];
                for (var i = 0; i < valueNode.length; i++) {
                    var groupId = $xml.selectStringValue(valueNode[i].parentNode, "@xlink:href", $const.Namespaces);
                    //TODO: Remove when done, shows the group memeberships.
                    //console.debug("Group [" + groupId + "] : Memberships: [" + user.getGroupMemberships() + "] : "+ user.getGroupMemberships().indexOf(groupId));
                    if (user.getGroupMemberships().indexOf(groupId) >= 0 || groupId == user.getId()) {
                        var configValue = $xml.getInnerXml(valueNode[i]);
                        var value;
                        if (typeof configValue === "undefined") {
                            value = false;
                        } else {
                            value =
                            {
                                groupId: groupId,
                                value: configValue
                            };
                        }

                        if (value) {
                            result.push(value);
                        }
                        
                    } 
                }
                return result;
                

            }
        }
    }
    return false;
};

Tridion.Extensions.UI.FBI.SchemaFieldBehaviourHelper.prototype.getConfigurationValue = function SchemaFieldBehaviourHelper$getConfigurationValue(groupId, behaviourName) {
    /// <summary>Gets configuration value from the field currently seleted in the <see cref="this.properties.controls.fieldDesigner"/>.</summary>
    /// <param name="groupId" type="Number">The group id to of the configuration value. It can be a user id too.</param>
    /// <param name="behaviourName" type="Number">The behaviour of the configuration value.</param>
    /// <returns type="string">The configuration value as a string</returns>
    var xmlNode = this.getConfigurationValueNode(groupId, behaviourName);
    return $xml.getInnerText(xmlNode);
};

Tridion.Extensions.UI.FBI.SchemaFieldBehaviourHelper.prototype.getConfigurationValueNode = function SchemaFieldBehaviourHelper$getConfigurationValueNode(groupId, behaviourName) {
    /// <summary>Gets configuration value from the field currently seleted in the <see cref="this.properties.controls.fieldDesigner"/>.</summary>
    /// <param name="groupId" type="Number">The group id of the configuration. It can be a user id too.</param>
    /// <param name="behaviourName" type="Number">The behaviour of the configuration.</param>
    /// <returns type="node">The configuration value as a node</returns>
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
    /// <summary>Sets the configuration value from the field currently seleted in the <see cref="this.properties.controls.fieldDesigner"/>.</summary>
    /// <param name="groupId" type="Number">The group id of the configuration. It can be a user id too.</param>
    /// <param name="behaviourName" type="Number">The behaviour of the configuration.</param>
    /// <param name="value" type="Number">The value.</param>
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

Tridion.Extensions.UI.FBI.SchemaFieldBehaviourHelper.prototype.getFieldType = function SchemaFieldBehaviourHelper$getFieldType() {
    var p = this.properties;
    var c = p.controls;
    if (c.fieldDesigner) {
        var fieldXml = c.fieldDesigner.getFieldXml();
        return fieldXml;
        $dom.getLocalName(fieldXml);
    } else {
        console.warn("This method is meant to be called on the 'SchemaView' only.");
    }
};
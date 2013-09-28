Type.registerNamespace("Tridion.Extensions.UI.FBI");


//###########################################################################################################
//Schema Field Behaviour
//###########################################################################################################
Tridion.Extensions.UI.FBI.SchemaFieldBehaviour = function SchemaFieldBehaviour()
{
    Tridion.OO.enableInterface(this, "Tridion.Extensions.UI.FBI.SchemaFieldBehaviour");
    this.addInterface("Tridion.DisposableObject");
};

Tridion.Extensions.UI.FBI.SchemaFieldBehaviour.prototype.initialize = function SchemaFieldBehaviour$initialize(deckPage) {    

    //Extension Initialization    
    $fbiConfig = new Tridion.Extensions.UI.FBI.SchemaFieldBehaviourHelper(deckPage);
    $fbiConfig.Namespace = $fbi.properties.ns;
    $fbiConfig.init(deckPage);
    var ns = Tridion.Constants.Namespaces;
    ns["fbi"] = $fbi.Namespace;
    
};



//###########################################################################################################
//Schema Field Behaviour Helper
//###########################################################################################################
Tridion.Extensions.UI.FBI.SchemaFieldBehaviourHelper = function SchemaFieldBehaviourHelper(deckPage) {
    Tridion.OO.enableInterface(this, "Tridion.Extensions.UI.FBI.SchemaFieldBehaviourHelper");
    this.addInterface("Tridion.DisposableObject");
    var p = this.properties;
    p.ns = "http://www.sdltridion.com/2013/FieldBehaviourInjection";
    
};

Tridion.Extensions.UI.FBI.SchemaFieldBehaviourHelper.prototype.init = function SchemaFieldBehaviourHelper$init(deckPage) {
    var p = this.properties;
    var c = p.controls = {};
    c.fieldDesigner;    
    c.fieldsSecurityPanel = $controls.getControl($("#SchemaDesignFieldSecurity"), "Tridion.Controls.Panel");

    switch (deckPage) {
        case "SchemaDesignTab":            
            c.fieldDesigner = $controls.getControl($("#SchemaDesignFieldDesigner"), "Tridion.Controls.FieldDesigner");
            break;
        case "MetadataDesignTab":            
            c.fieldDesigner = $controls.getControl($("#MetadataDesignFieldDesigner"), "Tridion.Controls.FieldDesigner");
            break;
    }

    //Todo: close panel by default 
    //c.fieldsSecurityPanel.close();

    var element = $("#FBISettings");
    c.UsersAndGroupsList = $controls.getControl($("#UsersAndGroupsList"), "Tridion.Controls.List");
    this.initializeGroups();
};


Tridion.Extensions.UI.FBI.SchemaFieldBehaviourHelper.prototype.initializeGroups = function SchemaFieldBehaviourHelper$initializeGroups() {
    var p = this.properties;
    var c = p.controls;
    var listControl = c.UsersAndGroupsList;
    var self = this;

    listControl.setLoading(true);
    listControl.clearSelection();


    function FieldBehaviour$listLoaded() {
        $evt.removeEventHandler(listControl, "load", FieldBehaviour$listLoaded);
        self._renderList(listControl.getXml());
    };


    if (!listControl.isLoaded(true)) {
        var xml = this._getStaticTrusteesXml();
        this._renderList(xml);

    }
    else {
        $evt.addEventHandler(listControl, "load", FieldBehaviour$listLoaded);
        listControl.load();
    }
};

Tridion.Extensions.UI.FBI.SchemaFieldBehaviourHelper.prototype._getStaticTrusteesXml = function SchemaFieldBehaviourHelper$_getStaticTrusteesXml(settingsType, parentItem) {
    var xml = "";
    var schema = $display.getItem();
    var parentItem = schema.getOrganizationalItem();

    /*if (parentItem && parentItem.isStaticLoaded()) {        
        if (settingsType == Tridion.Cme.SecurityTab.SettingsType.PERMISSIONS) {
            xml = parentItem.getStaticTrusteesXml();
        }
        else if (settingsType == Tridion.Cme.SecurityTab.SettingsType.EXCEPTIONS) {
            xml = parentItem.getStaticTrusteesWithDenialXml();
        }

        
    }*/
    var hardcodedList = ''
     + '<tcm:Trustee xmlns:tcm="http://www.tridion.com/ContentManager/5.0" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:title="Information Designer" xlink:href="tcm:0-4-65568" ItemType="65568"><tcm:Right Type="2" Setting="Allow"/><tcm:Right Type="4" Setting="Allow"/><tcm:Right Type="8" Setting="Implicit Deny"/><tcm:Right Type="16" Setting="Allow"/><tcm:Right Type="32" Setting="Implicit Deny"/><tcm:Right Type="64" Setting="Implicit Deny"/><tcm:Right Type="128" Setting="Implicit Deny"/><tcm:Right Type="256" Setting="Implicit Deny"/><tcm:Right Type="512" Setting="Implicit Deny"/><tcm:Right Type="1024" Setting="Implicit Deny"/><tcm:Right Type="2048" Setting="Implicit Deny"/><tcm:Right Type="4096" Setting="Implicit Deny"/><tcm:Right Type="8192" Setting="Allow"/><tcm:Right Type="16384" Setting="Implicit Deny"/><tcm:Right Type="32768" Setting="Allow"/><tcm:Right Type="65536" Setting="Implicit Deny"/><tcm:Right Type="33554432" Setting="Implicit Deny"/><tcm:Right Type="67108864" Setting="Implicit Deny"/><tcm:Right Type="134217728" Setting="Implicit Deny"/><tcm:Right Type="268435456" Setting="Implicit Deny"/><tcm:Right Type="536870912" Setting="Implicit Deny"/><tcm:Right Type="1073741824" Setting="Implicit Deny"/><tcm:Right Type="2147483648" Setting="Implicit Deny"/></tcm:Trustee>'
     + '<tcm:Trustee xmlns:tcm="http://www.tridion.com/ContentManager/5.0" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:title="Author" xlink:href="tcm:0-5-65568" ItemType="65568"><tcm:Right Type="2" Setting="Implicit Deny"/><tcm:Right Type="4" Setting="Implicit Deny"/><tcm:Right Type="8" Setting="Implicit Deny"/><tcm:Right Type="16" Setting="Implicit Deny"/><tcm:Right Type="32" Setting="Allow"/><tcm:Right Type="64" Setting="Implicit Deny"/><tcm:Right Type="128" Setting="Implicit Deny"/><tcm:Right Type="256" Setting="Implicit Deny"/><tcm:Right Type="512" Setting="Implicit Deny"/><tcm:Right Type="1024" Setting="Implicit Deny"/><tcm:Right Type="2048" Setting="Implicit Deny"/><tcm:Right Type="4096" Setting="Implicit Deny"/><tcm:Right Type="8192" Setting="Implicit Deny"/><tcm:Right Type="16384" Setting="Implicit Deny"/><tcm:Right Type="32768" Setting="Implicit Deny"/><tcm:Right Type="65536" Setting="Implicit Deny"/><tcm:Right Type="33554432" Setting="Implicit Deny"/><tcm:Right Type="67108864" Setting="Implicit Deny"/><tcm:Right Type="134217728" Setting="Implicit Deny"/><tcm:Right Type="268435456" Setting="Implicit Deny"/><tcm:Right Type="536870912" Setting="Implicit Deny"/><tcm:Right Type="1073741824" Setting="Implicit Deny"/><tcm:Right Type="2147483648" Setting="Implicit Deny"/></tcm:Trustee>'
     + '<tcm:Trustee xmlns:tcm="http://www.tridion.com/ContentManager/5.0" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:title="Template Designer" xlink:href="tcm:0-6-65568" ItemType="65568"><tcm:Right Type="2" Setting="Implicit Deny"/><tcm:Right Type="4" Setting="Allow"/><tcm:Right Type="8" Setting="Implicit Deny"/><tcm:Right Type="16" Setting="Implicit Deny"/><tcm:Right Type="32" Setting="Implicit Deny"/><tcm:Right Type="64" Setting="Allow"/><tcm:Right Type="128" Setting="Implicit Deny"/><tcm:Right Type="256" Setting="Allow"/><tcm:Right Type="512" Setting="Implicit Deny"/><tcm:Right Type="1024" Setting="Implicit Deny"/><tcm:Right Type="2048" Setting="Implicit Deny"/><tcm:Right Type="4096" Setting="Implicit Deny"/><tcm:Right Type="8192" Setting="Implicit Deny"/><tcm:Right Type="16384" Setting="Allow"/><tcm:Right Type="32768" Setting="Allow"/><tcm:Right Type="65536" Setting="Implicit Deny"/><tcm:Right Type="33554432" Setting="Implicit Deny"/><tcm:Right Type="67108864" Setting="Implicit Deny"/><tcm:Right Type="134217728" Setting="Implicit Deny"/><tcm:Right Type="268435456" Setting="Implicit Deny"/><tcm:Right Type="536870912" Setting="Implicit Deny"/><tcm:Right Type="1073741824" Setting="Implicit Deny"/><tcm:Right Type="2147483648" Setting="Implicit Deny"/></tcm:Trustee>'
     + '<tcm:Trustee xmlns:tcm="http://www.tridion.com/ContentManager/5.0" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:title="Editor" xlink:href="tcm:0-7-65568" ItemType="65568"><tcm:Right Type="2" Setting="Implicit Deny"/><tcm:Right Type="4" Setting="Allow"/><tcm:Right Type="8" Setting="Implicit Deny"/><tcm:Right Type="16" Setting="Implicit Deny"/><tcm:Right Type="32" Setting="Allow"/><tcm:Right Type="64" Setting="Implicit Deny"/><tcm:Right Type="128" Setting="Allow"/><tcm:Right Type="256" Setting="Implicit Deny"/><tcm:Right Type="512" Setting="Implicit Deny"/><tcm:Right Type="1024" Setting="Allow"/><tcm:Right Type="2048" Setting="Implicit Deny"/><tcm:Right Type="4096" Setting="Implicit Deny"/><tcm:Right Type="8192" Setting="Implicit Deny"/><tcm:Right Type="16384" Setting="Implicit Deny"/><tcm:Right Type="32768" Setting="Allow"/><tcm:Right Type="65536" Setting="Implicit Deny"/><tcm:Right Type="33554432" Setting="Implicit Deny"/><tcm:Right Type="67108864" Setting="Implicit Deny"/><tcm:Right Type="134217728" Setting="Implicit Deny"/><tcm:Right Type="268435456" Setting="Implicit Deny"/><tcm:Right Type="536870912" Setting="Implicit Deny"/><tcm:Right Type="1073741824" Setting="Implicit Deny"/><tcm:Right Type="2147483648" Setting="Implicit Deny"/></tcm:Trustee>'
     + '<tcm:Trustee xmlns:tcm="http://www.tridion.com/ContentManager/5.0" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:title="Chief Editor" xlink:href="tcm:0-8-65568" ItemType="65568"><tcm:Right Type="2" Setting="Implicit Deny"/><tcm:Right Type="4" Setting="Allow"/><tcm:Right Type="8" Setting="Allow"/><tcm:Right Type="16" Setting="Implicit Deny"/><tcm:Right Type="32" Setting="Allow"/><tcm:Right Type="64" Setting="Implicit Deny"/><tcm:Right Type="128" Setting="Allow"/><tcm:Right Type="256" Setting="Implicit Deny"/><tcm:Right Type="512" Setting="Implicit Deny"/><tcm:Right Type="1024" Setting="Allow"/><tcm:Right Type="2048" Setting="Implicit Deny"/><tcm:Right Type="4096" Setting="Allow"/><tcm:Right Type="8192" Setting="Allow"/><tcm:Right Type="16384" Setting="Implicit Deny"/><tcm:Right Type="32768" Setting="Allow"/><tcm:Right Type="65536" Setting="Allow"/><tcm:Right Type="33554432" Setting="Implicit Deny"/><tcm:Right Type="67108864" Setting="Implicit Deny"/><tcm:Right Type="134217728" Setting="Implicit Deny"/><tcm:Right Type="268435456" Setting="Implicit Deny"/><tcm:Right Type="536870912" Setting="Implicit Deny"/><tcm:Right Type="1073741824" Setting="Implicit Deny"/><tcm:Right Type="2147483648" Setting="Implicit Deny"/></tcm:Trustee>'
     + '<tcm:Trustee xmlns:tcm="http://www.tridion.com/ContentManager/5.0" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:title="Publication Manager" xlink:href="tcm:0-9-65568" ItemType="65568"><tcm:Right Type="2" Setting="Allow"/><tcm:Right Type="4" Setting="Allow"/><tcm:Right Type="8" Setting="Allow"/><tcm:Right Type="16" Setting="Implicit Deny"/><tcm:Right Type="32" Setting="Implicit Deny"/><tcm:Right Type="64" Setting="Implicit Deny"/><tcm:Right Type="128" Setting="Allow"/><tcm:Right Type="256" Setting="Implicit Deny"/><tcm:Right Type="512" Setting="Implicit Deny"/><tcm:Right Type="1024" Setting="Implicit Deny"/><tcm:Right Type="2048" Setting="Allow"/><tcm:Right Type="4096" Setting="Allow"/><tcm:Right Type="8192" Setting="Implicit Deny"/><tcm:Right Type="16384" Setting="Implicit Deny"/><tcm:Right Type="32768" Setting="Allow"/><tcm:Right Type="65536" Setting="Allow"/><tcm:Right Type="33554432" Setting="Implicit Deny"/><tcm:Right Type="67108864" Setting="Implicit Deny"/><tcm:Right Type="134217728" Setting="Implicit Deny"/><tcm:Right Type="268435456" Setting="Implicit Deny"/><tcm:Right Type="536870912" Setting="Implicit Deny"/><tcm:Right Type="1073741824" Setting="Implicit Deny"/><tcm:Right Type="2147483648" Setting="Implicit Deny"/></tcm:Trustee>'
     + '<tcm:Trustee xmlns:tcm="http://www.tridion.com/ContentManager/5.0" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:title="Interaction Manager" xlink:href="tcm:0-10-65568" ItemType="65568"><tcm:Right Type="2" Setting="Implicit Deny"/><tcm:Right Type="4" Setting="Implicit Deny"/><tcm:Right Type="8" Setting="Implicit Deny"/><tcm:Right Type="16" Setting="Implicit Deny"/><tcm:Right Type="32" Setting="Implicit Deny"/><tcm:Right Type="64" Setting="Implicit Deny"/><tcm:Right Type="128" Setting="Allow"/><tcm:Right Type="256" Setting="Implicit Deny"/><tcm:Right Type="512" Setting="Allow"/><tcm:Right Type="1024" Setting="Implicit Deny"/><tcm:Right Type="2048" Setting="Implicit Deny"/><tcm:Right Type="4096" Setting="Implicit Deny"/><tcm:Right Type="8192" Setting="Allow"/><tcm:Right Type="16384" Setting="Implicit Deny"/><tcm:Right Type="32768" Setting="Implicit Deny"/><tcm:Right Type="65536" Setting="Implicit Deny"/><tcm:Right Type="33554432" Setting="Implicit Deny"/><tcm:Right Type="67108864" Setting="Implicit Deny"/><tcm:Right Type="134217728" Setting="Implicit Deny"/><tcm:Right Type="268435456" Setting="Implicit Deny"/><tcm:Right Type="536870912" Setting="Implicit Deny"/><tcm:Right Type="1073741824" Setting="Implicit Deny"/><tcm:Right Type="2147483648" Setting="Implicit Deny"/></tcm:Trustee>'


    xml = String.format("<tcm:ListTrustees xmlns:tcm=\"{0}\" xmlns:xlink=\"{1}\">{2}</tcm:ListTrustees>",
			$const.Namespaces.tcm, $const.Namespaces.xlink, hardcodedList);

    return xml;
};


Tridion.Extensions.UI.FBI.SchemaFieldBehaviourHelper.prototype._renderList = function SchemaFieldBehaviourHelper$_renderList(bodyXml) {
    $assert.isString(bodyXml);

    var p = this.properties;
    var c = p.controls;
    var control = c.UsersAndGroupsList;
    var xmlDoc = $xml.getNewXmlDocument(bodyXml);

    //control.setLoading(true);
    //control.clearSelection();
    //this._updateSecuritySettings(settingsType);

    var self = this;

    function FieldBehaviour$_drawControl(definitionDocument) {
        control.draw(xmlDoc, definitionDocument);
        control.setLoading(false);
        control.clearSelection();

        /*self.addFailableTcmEventHandlerOnce(control, "draw", function () {
            control.selectItem(control.getItemByIndex(0));
        });*/
    }


    if (!p.listHeadDoc) {
        function FieldBehaviour$_headDocumentLoaded(headDoc) {
            p.listHeadDoc = headDoc;
            FieldBehaviour$_drawControl(headDoc);
        }

        function FieldBehaviour$_headDocumentLoadFailed() {
            $log.error("Unable to load head xml file for list.");
        }

        var xmlPath = $config.expandEditorPath("Xml/ListDefinitions/TrusteesList-head.xml", $const.CMEEditorName);
        $xml.loadXmlDocument(xmlPath + "?forView=" + Tridion.Core.Configuration.CurrentView + "&forControl=" + control.getId(), FieldBehaviour$_headDocumentLoaded, FieldBehaviour$_headDocumentLoadFailed);
        return;
    }

    FieldBehaviour$_drawControl(p.listHeadDoc);

};

Tridion.Extensions.UI.FBI.SchemaFieldBehaviourHelper.prototype._getSelectedGroups = function SchemaFieldBehaviourHelper$_getSelectedGroups() {
    var p = this.properties;
    var c = p.controls;
    var list = c.UsersAndGroupsList;
    var selection = list.getSelection();

    return selection.getItems();
};

Tridion.Extensions.UI.FBI.SchemaFieldBehaviourHelper.prototype.removeConfigurationValue = function SchemaFieldBehaviourHelper$removeConfigurationValue(groupId, behaviourName) {
    var p = this.properties;
    var c = p.controls;
    var fieldXml = c.fieldDesigner.getFieldXml();

    if (fieldXml) {
        var extensionXmlElement = $xml.selectSingleNode(fieldXml, "tcm:ExtensionXml");
        if (extensionXmlElement) {
            $fieldXml = fieldXml;
            var configurationNode = $xml.selectSingleNode(extensionXmlElement, "fbi:configuration");
            //[@xlink:href='tcm:0-4-65568']
            console.debug(configurationNode);
            var groupNode = $xml.selectSingleNode(configurationNode, "fbi:group[@xlink:href='" + groupId + "']");
            console.debug("Deleting Group Config for Group: " + groupId);
            console.debug(groupNode);
            if (configurationNode && groupNode) {
                console.debug("Getting value node");
                var valueNode = $xml.selectSingleNode(groupNode, "fbi:" + behaviourName)
                console.debug(valueNode);
                if (valueNode) {
                    groupNode.removeChild(valueNode);
                    if (!groupNode.hasChildNodes()) {
                        configurationNode.removeChild(groupNode);
                    }
                    c.fieldDesigner.setFieldXml(fieldXml);
                }

            }
        }
    }

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
        var appendConfig = false;
        if (!configurationNode) {
            configurationNode = $xml.createElementNS(fieldDocument, p.ns, "configuration");
            extensionXmlElement.appendChild(configurationNode);
        }

        groupNode = $xml.selectSingleNode(extensionXmlElement, "fbi:configuration/fbi:group[@xlink:href='" + groupId + "']");
        console.debug("Group Node: " + groupNode);

        if (!groupNode) {
            console.debug("Group Doesn't Exist: " + groupId);
            groupNode = $xml.createElementNS(fieldDocument, p.ns, "group");
            var attIdNode = $xml.createAttributeNS(fieldDocument, $const.Namespaces.xlink, "xlink:href");
            attIdNode.value = groupId;
            var attTypeNode = $xml.createAttributeNS(fieldDocument, $const.Namespaces.xlink, "xlink:type");
            attTypeNode.value = "simple";
            $xml.setAttributeNodeNS(groupNode, attIdNode, "");
            $xml.setAttributeNodeNS(groupNode, attTypeNode, "");
            $xml.setInnerXml(groupNode, "<{0} xmlns=\"{1}\">{2}</{0}>".format(behaviourName, p.ns, value));
            console.debug(groupNode);
            configurationNode.appendChild(groupNode);
            console.debug(configurationNode);
            console.debug(fieldXml);
            c.fieldDesigner.setFieldXml(fieldXml);
        }

    }
};


//#END.....................













/* Old Initialize 

    var ns = Tridion.Constants.Namespaces;
    ns["fbi"] = p.ns;

    

    switch (deckPage) {
        case "SchemaDesignTab":            
            c.fieldReadOnlyCheckbox = $("#SchemaDesignTab_SchemaDesignFieldDesigner_SchemaFieldBehaviour_ReadOnlyCheckbox");
            c.fieldVisibleCheckbox = $("#SchemaDesignTab_SchemaDesignFieldDesigner_SchemaFieldBehaviour_VisibleCheckbox");
            c.fieldDesigner = $controls.getControl($("#SchemaDesignFieldDesigner"), "Tridion.Controls.FieldDesigner");
            break;
        case "MetadataDesignTab":
            c.fieldReadOnlyCheckbox = $("#MetadataDesignTab_MetadataDesignFieldDesigner_metadata_SchemaFieldBehaviour_ReadOnlyCheckbox");
            c.fieldVisibleCheckbox = $("#SchemaDesignTab_SchemaDesignFieldDesigner_SchemaFieldBehaviour_VisibleCheckbox");
            c.fieldDesigner = $controls.getControl($("#MetadataDesignFieldDesigner"), "Tridion.Controls.FieldDesigner");
            break;
    }   
    c.fieldReadOnlyCheckbox.checked = "false";
    c.fieldVisibleCheckbox.checked = "false";
    
    
    $evt.addEventHandler($display.getItem(), "change", Function.getDelegate(this, this.onSchemaChanged));
    $evt.addEventHandler(c.fieldReadOnlyCheckbox, "click", Function.getDelegate(this, this.onReadOnlyCheckboxClick));
    $evt.addEventHandler(c.UsersAndGroupsList, "click", Function.getDelegate(this, this._updateBehaviours));
    //$evt.addEventHandler(c.fieldVisibleCheckbox, "click", Function.getDelegate(this, this.onVisibleCheckboxClick));
    $evt.addEventHandler(c.fieldDesigner, "updateview", Function.getDelegate(this, this.onUpdateView));
    
    
    this.onSchemaChanged();
    

*/



//TO CLEAN UP
Tridion.Extensions.UI.FBI.SchemaFieldBehaviour.prototype._updateBehaviours = function SchemaFieldBehaviour$_updateBehaviours()
{
    var p = this.properties;
    var c = p.controls;
    var groups = this._getSelectedGroups();
    for (var i = 0; i < groups.length; i++) {
        var groupId = groups[i];
        for (var j = 0; j < p.checkBoxesFields; j++) {
            groupNode = $xml.selectSingleNode(extensionXmlElement, "fbi:configuration/fbi:group[@id='" + groupId + "']/" + p.checkBoxesFields[j]);
            if (groupNode) {
            }
        }
        
    }
    
    c.fieldReadOnlyCheckbox.checked = this.isGroupChecked(groupId);
};




Tridion.Extensions.UI.FBI.SchemaFieldBehaviour.prototype.onSchemaChanged = function SchemaFieldBehaviour$onSchemaChanged() {
    var c = this.properties.controls;
    var schema = $display.getItem();
    
    if (schema && (schema.getSubType() == $const.SchemaPurpose.TEMPLATE_PARAMETERS || schema.getSubType() == $const.SchemaPurpose.BUNDLE)) {
        $css.undisplay(c.fieldReadOnlyCheckbox.parentNode);
    }
    else {
        $css.display(c.fieldReadOnlyCheckbox.parentNode);
    }
};

Tridion.Extensions.UI.FBI.SchemaFieldBehaviour.prototype.onUpdateView = function SchemaFieldBehaviour$onUpdateView() {
    var p = this.properties;
    var c = p.controls;
    var schema = $display.getItem();
    var fieldNode = c.fieldDesigner.getFieldXml();

    if (fieldNode)
    {
        var readonly = $xml.getInnerText(fieldNode, "/tcm:*/tcm:ExtensionXml/fbi:configuration/fbi:field/fbi:readonly");        
        c.UsersAndGroupsList.clearSelection();
        c.fieldReadOnlyCheckbox.checked = "false";
        c.fieldVisibleCheckbox.checked = "false";
        c.fieldReadOnlyCheckbox.disabled = (schema && (schema.isReadOnly() || schema.isLocalized())) || false;
        c.fieldVisibleCheckbox.disabled = (schema && (schema.isReadOnly() || schema.isLocalized())) || false;
    }
};




Tridion.Controls.Deck.registerInitializeExtender("SchemaDesignTab", Tridion.Extensions.UI.FBI.SchemaFieldBehaviour);
Tridion.Controls.Deck.registerInitializeExtender("MetadataDesignTab", Tridion.Extensions.UI.FBI.SchemaFieldBehaviour);
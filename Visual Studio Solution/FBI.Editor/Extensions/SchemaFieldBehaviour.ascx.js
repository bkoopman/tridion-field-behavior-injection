﻿Type.registerNamespace("Tridion.Extensions.UI.FBI");

Tridion.Extensions.UI.FBI.SchemaFieldBehaviour = function SchemaFieldBehaviour()
{
    Tridion.OO.enableInterface(this, "Tridion.Extensions.UI.FBI.SchemaFieldBehaviour");
	this.addInterface("Tridion.DisposableObject");
	var p = this.properties;
    
    var c = p.controls = {};

    c.fieldReadOnlyCheckbox;
    c.fieldVisisbleCheckbox;
    c.fieldDesigner;
    c.fieldSecurityPanel
    
    p.ns = "http://www.sdltridion.com/2013/FieldBehaviorInjector";
};

Tridion.Extensions.UI.FBI.SchemaFieldBehaviour.prototype.initialize = function SchemaFieldBehaviour$initialize(deckPage) {
    var p = this.properties;
    var c = p.controls;
   
    c.fieldsSecurityPanel = $controls.getControl($("#SchemaDesignFieldSecurity"), "Tridion.Controls.Panel");

    var element = $("#FBISettings");
    c.UpperShowAll = $("#UpperShowAll", element);
    //c.LowerShowAll = $("#LowerShowAll", element);
    //c.ShowExceptions = $("#ShowExceptions", element);
    c.UpperList = $controls.getControl($("#UpperList"), "Tridion.Controls.List");
    //c.LowerList = $controls.getControl($("#LowerList"), "Tridion.Controls.List");
    //c.UpperSecurityInfo = $("#UpperSecurityInfo", element);
    //c.LowerSecurityInfo = $("#LowerSecurityInfo", element);

    


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
    
    $evt.addEventHandler($display.getItem(), "change", Function.getDelegate(this, this.onSchemaChanged));
    $evt.addEventHandler(c.fieldReadOnlyCheckbox, "click", Function.getDelegate(this, this.onReadOnlyCheckboxClick));
    $evt.addEventHandler(c.fieldVisibleCheckbox, "click", Function.getDelegate(this, this.onVisibleCheckboxClick));
    $evt.addEventHandler(c.fieldDesigner, "updateview", Function.getDelegate(this, this.onUpdateView));

    this.initializeGroups();
    this.onSchemaChanged();
};

Tridion.Extensions.UI.FBI.SchemaFieldBehaviour.prototype.initializeGroups = function SchemaFieldBehaviour$initializeGroups() {
    var p = this.properties;
    var c = p.controls;
    var self = this;

    
    var listControl = c.UpperList;
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

Tridion.Extensions.UI.FBI.SchemaFieldBehaviour.prototype._getStaticTrusteesXml = function SchemaFieldBehaviour$_getStaticTrusteesXml(settingsType, parentItem) {
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
    console.debug("Jaime: ");
    console.debug(xml);
    return xml;
};

Tridion.Extensions.UI.FBI.SchemaFieldBehaviour.prototype._renderList = function SchemaFieldBehaviour$_renderList(bodyXml) {
    console.debug(bodyXml);
    $assert.isString(bodyXml);

    var p = this.properties;
    var c = p.controls;

    var control = c.UpperList;
    console.debug("2");
    var xmlDoc = $xml.getNewXmlDocument(bodyXml);
    console.debug("3");
    //control.setLoading(true);
    //control.clearSelection();
    //this._updateSecuritySettings(settingsType);

    var self = this;

    function FieldBehaviour$_drawControl(definitionDocument) {        
        console.debug("4.5");
        console.debug(definitionDocument);
        control.draw(xmlDoc, definitionDocument);
        console.debug("5");
        control.setLoading(false);
        console.debug("6");
        control.clearSelection();

        /*self.addFailableTcmEventHandlerOnce(control, "draw", function () {
            control.selectItem(control.getItemByIndex(0));
        });*/
    }

    
    if (!p.listHeadDoc) {
        function FieldBehaviour$_headDocumentLoaded(headDoc) {
            p.listHeadDoc = headDoc;
            console.debug(p.listHeadDoc);
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
        
        c.fieldReadOnlyCheckbox.checked = (readonly != "false");
        c.fieldReadOnlyCheckbox.disabled = (schema && (schema.isReadOnly() || schema.isLocalized())) || false;
    }
};

Tridion.Extensions.UI.FBI.SchemaFieldBehaviour.prototype.onReadOnlyCheckboxClick = function SchemaFieldBehaviour$onReadOnlyCheckboxClick() {
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
        
        $xml.setInnerXml(configurationNode, "<field xmlns=\"{0}\"><readonly>{1}</readonly></field>".format(p.ns, c.fieldReadOnlyCheckbox.checked ? "true" : "false"));        
        c.fieldDesigner.setFieldXml(fieldXml);
    }
};

Tridion.Extensions.UI.FBI.SchemaFieldBehaviour.prototype.onVisibleCheckboxClick = function SchemaFieldBehaviour$onVisibleCheckboxClick() {
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

        $xml.setInnerXml(configurationNode, "<field xmlns=\"{0}\"><visible>{1}</visible></field>".format(p.ns, c.fieldReadOnlyCheckbox.checked ? "true" : "false"));
        c.fieldDesigner.setFieldXml(fieldXml);
    }
};

Tridion.Controls.Deck.registerInitializeExtender("SchemaDesignTab", Tridion.Extensions.UI.FBI.SchemaFieldBehaviour);
Tridion.Controls.Deck.registerInitializeExtender("MetadataDesignTab", Tridion.Extensions.UI.FBI.SchemaFieldBehaviour);
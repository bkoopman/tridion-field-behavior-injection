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
    console.debug("Tridion.Extensions.UI.FBI.SchemaFieldBehaviour.prototype.initialize");
    //Extension Initialization    
    $fbiConfig = new Tridion.Extensions.UI.FBI.SchemaFieldBehaviourConfig();
    $fbiConfig.init(deckPage);
    var ns = Tridion.Constants.Namespaces;
    ns["fbi"] = $fbiConfig.Namespace;
    
};
//###########################################################################################################
//Schema Field Behaviour Configuration
//###########################################################################################################
Tridion.Extensions.UI.FBI.SchemaFieldBehaviourConfig = function SchemaFieldBehaviourConfig() {
    Tridion.OO.enableInterface(this, "Tridion.Extensions.UI.FBI.SchemaFieldBehaviourConfig");
    this.addInterface("Tridion.DisposableObject");
    var p = this.properties;
    p.helper = new Tridion.Extensions.UI.FBI.SchemaFieldBehaviourHelper();
    this.Namespace = p.ns = "http://www.sdltridion.com/2013/FieldBehaviourInjection";
    this.Helper = p.helper;
    var p = this.properties;
    var c = p.controls = {};

};

Tridion.Extensions.UI.FBI.SchemaFieldBehaviourConfig.prototype.init = function SchemaFieldBehaviourConfig$init(deckPage) {
    var p = this.properties;
    var c = p.controls;
    
    c.fieldsSecurityPanel = $controls.getControl($("#SchemaDesignFieldSecurity"), "Tridion.Controls.Panel");

    switch (deckPage) {
        case "SchemaDesignTab":            
            c.fieldDesigner = $controls.getControl($("#SchemaDesignFieldDesigner"), "Tridion.Controls.FieldDesigner");
            c.UsersAndGroupsList = $controls.getControl($("#SchemaDesignTab_SchemaDesignFieldDesigner_SchemaFieldBehaviour_UsersAndGroupsList"), "Tridion.Controls.List");
            break;
        case "MetadataDesignTab":
            c.UsersAndGroupsList = $controls.getControl($("#MetadataDesignTab_MetadataDesignFieldDesigner_metadata_SchemaFieldBehaviour_UsersAndGroupsList"), "Tridion.Controls.List");
            c.fieldDesigner = $controls.getControl($("#MetadataDesignFieldDesigner"), "Tridion.Controls.FieldDesigner");
            break;
    }
    p.helper.setFieldDesigner(c.fieldDesigner);
    //TODO: close panel by default 
    //c.fieldsSecurityPanel.close();
    
    this.initializeGroups();
};

Tridion.Extensions.UI.FBI.SchemaFieldBehaviourConfig.prototype.initializeGroups = function SchemaFieldBehaviourConfig$initializeGroups() {
    var p = this.properties;
    var c = p.controls;
    var listControl = c.UsersAndGroupsList;
    var self = this;
    
    listControl.setLoading(true);
    listControl.clearSelection();
    $listControl = listControl;

    function FieldBehaviour$listLoaded() {
        $evt.removeEventHandler(listControl, "load", FieldBehaviour$listLoaded);
        console.debug("0");
        self._renderList(listControl.getXml());
    };

    //TODO: Try to keep the list when loaded, so far didn't have time
    var xml = this._getStaticTrusteesXml();
    this._renderList(xml);

    //TODO: Something like this
    /*if (!listControl.isLoaded(true)) {
        var xml = this._getStaticTrusteesXml();
        this._renderList(xml);

    }
    else {
        $evt.addEventHandler(listControl, "load", FieldBehaviour$listLoaded);
        console.debug(listControl);
        console.debug("hello");
        listControl.load(true);
    }*/
};

Tridion.Extensions.UI.FBI.SchemaFieldBehaviourConfig.prototype._getStaticTrusteesXml = function SchemaFieldBehaviourConfig$_getStaticTrusteesXml(/*settingsType, parentItem*/) {
    var xml;
    //var schema = $display.getItem();
    //var parentItem = schema.getOrganizationalItem();

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
        + '<tcm:Trustee xmlns:tcm="http://www.tridion.com/ContentManager/5.0" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:title="Interaction Manager" xlink:href="tcm:0-10-65568" ItemType="65568"><tcm:Right Type="2" Setting="Implicit Deny"/><tcm:Right Type="4" Setting="Implicit Deny"/><tcm:Right Type="8" Setting="Implicit Deny"/><tcm:Right Type="16" Setting="Implicit Deny"/><tcm:Right Type="32" Setting="Implicit Deny"/><tcm:Right Type="64" Setting="Implicit Deny"/><tcm:Right Type="128" Setting="Allow"/><tcm:Right Type="256" Setting="Implicit Deny"/><tcm:Right Type="512" Setting="Allow"/><tcm:Right Type="1024" Setting="Implicit Deny"/><tcm:Right Type="2048" Setting="Implicit Deny"/><tcm:Right Type="4096" Setting="Implicit Deny"/><tcm:Right Type="8192" Setting="Allow"/><tcm:Right Type="16384" Setting="Implicit Deny"/><tcm:Right Type="32768" Setting="Implicit Deny"/><tcm:Right Type="65536" Setting="Implicit Deny"/><tcm:Right Type="33554432" Setting="Implicit Deny"/><tcm:Right Type="67108864" Setting="Implicit Deny"/><tcm:Right Type="134217728" Setting="Implicit Deny"/><tcm:Right Type="268435456" Setting="Implicit Deny"/><tcm:Right Type="536870912" Setting="Implicit Deny"/><tcm:Right Type="1073741824" Setting="Implicit Deny"/><tcm:Right Type="2147483648" Setting="Implicit Deny"/></tcm:Trustee>';


    xml = String.format("<tcm:ListTrustees xmlns:tcm=\"{0}\" xmlns:xlink=\"{1}\">{2}</tcm:ListTrustees>",
			$const.Namespaces.tcm, $const.Namespaces.xlink, hardcodedList);

    return xml;
};


Tridion.Extensions.UI.FBI.SchemaFieldBehaviourConfig.prototype._renderList = function SchemaFieldBehaviourConfig$_renderList(bodyXml) {
    $assert.isString(bodyXml);
    console.debug("3");
    var p = this.properties;
    var c = p.controls;
    var control = c.UsersAndGroupsList;
    var xmlDoc = $xml.getNewXmlDocument(bodyXml);

    //control.setLoading(true);
    //control.clearSelection();
    //this._updateSecuritySettings(settingsType);

    //var self = this;

    function FieldBehaviour$_drawControl(definitionDocument) {
        console.debug("Drawing list...");
        $xmlDoc = xmlDoc;
        $xmlDef = definitionDocument;
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

Tridion.Extensions.UI.FBI.SchemaFieldBehaviourConfig.prototype._getSelectedGroups = function SchemaFieldBehaviourConfig$_getSelectedGroups() {
    var p = this.properties;
    var c = p.controls;
    var list = c.UsersAndGroupsList;
    var selection = list.getSelection();
    return selection.getItems();
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
/*
Tridion.Extensions.UI.FBI.SchemaFieldBehaviour.prototype._updateBehaviours = function SchemaFieldBehaviour$_updateBehaviours()
{
    var p = this.properties;
    var c = p.controls;
    var groups = this._getSelectedGroups();
    for (var i = 0; i < groups.length; i++) {
        var groupId = groups[i];
        for (var j = 0; j < p.checkBoxesFields; j++) {
            var groupNode = $xml.selectSingleNode(extensionXmlElement, "fbi:configuration/fbi:group[@id='" + groupId + "']/" + p.checkBoxesFields[j]);
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
*/

/*
Tridion.Extensions.UI.FBI.SchemaFieldBehaviour.prototype.onUpdateView = function SchemaFieldBehaviour$onUpdateView() {
    var p = this.properties;
    var c = p.controls;
    var schema = $display.getItem();
    var fieldNode = c.fieldDesigner.getFieldXml();

    if (fieldNode)
    {
        var readonly = $xml.getInnerText(fieldNode, "/tcm:#1#tcm:ExtensionXml/fbi:configuration/fbi:field/fbi:readonly");        
        c.UsersAndGroupsList.clearSelection();
        c.fieldReadOnlyCheckbox.checked = "false";
        c.fieldVisibleCheckbox.checked = "false";
        c.fieldReadOnlyCheckbox.disabled = (schema && (schema.isReadOnly() || schema.isLocalized())) || false;
        c.fieldVisibleCheckbox.disabled = (schema && (schema.isReadOnly() || schema.isLocalized())) || false;
    }
};
*/




Tridion.Controls.Deck.registerInitializeExtender("SchemaDesignTab", Tridion.Extensions.UI.FBI.SchemaFieldBehaviour);
Tridion.Controls.Deck.registerInitializeExtender("MetadataDesignTab", Tridion.Extensions.UI.FBI.SchemaFieldBehaviour);
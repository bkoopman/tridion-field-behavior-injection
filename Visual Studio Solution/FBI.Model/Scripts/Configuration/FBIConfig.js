/// <reference path="../Costants/FBIConstants.js" />
/// <reference path="../Helper/FBIHelper.js" />
Type.registerNamespace("Tridion.Extensions.UI.FBI");

Tridion.Extensions.UI.FBI.SchemaFieldBehaviourConfig = function SchemaFieldBehaviourConfig(masterTabControl) {
    /// <summary>
    /// Helper class to deal with the controls on the Schema View, such as <see cref="Tridion.Controls.List">Users and groups list</see>
    /// <see cref="Tridion.Controls.FieldDesigner">Field Deisginer</see> and <see cref="Tridion.Controls.Panel">behaviours panel</see>
    /// It also exposes other relevant information such as the <see cref="Tridion.ContentManager.Schema">Schema</see>
    /// Moreover, it exposes a Helper class based on <see cref="Tridion.Extensions.UI.FBI.SchemaFieldBehaviourHelper"/>
    /// </summary>
    Tridion.OO.enableInterface(this, "Tridion.Extensions.UI.FBI.SchemaFieldBehaviourConfig");
    this.addInterface("Tridion.DisposableObject");
    var p = this.properties;
    this.MasterTabControl = masterTabControl;
    this.Namespace = p.ns = $fbiConst.NAMESPACE_URL;
    this.properties.data = {};
    this.properties.metadata = {};
    this.enabled = true;

    p.helper = new Tridion.Extensions.UI.FBI.SchemaFieldBehaviourHelper(masterTabControl);
    p.schema = $display.getItem();
    this.initializeGroups();
};

Tridion.Extensions.UI.FBI.SchemaFieldBehaviourConfig.prototype.getTab = function SchemaFieldBehaviourConfig$getTab() {
    /// <summary>Gets the Master Tab Control on the view.</summary>
    /// <returns type="string">The <see cref="Tridion.Controls.Tab"> Control</see></returns>
    return this.MasterTabControl.getSelectedItem().getId();
};

Tridion.Extensions.UI.FBI.SchemaFieldBehaviourConfig.prototype.getConfigurationHelper = function SchemaFieldBehaviourConfig$getConfigurartionHelper() {
    /// <summary>Gets the Helper object.</summary>
    /// <returns type="string">The <see cref="Tridion.Extensions.UI.FBI.SchemaFieldBehaviourHelper"> object</see></returns>
    var p = this.properties;
    p.helper.setFieldDesigner(this.getFieldDeisgner());
    return p.helper;
};

Tridion.Extensions.UI.FBI.SchemaFieldBehaviourConfig.prototype.getControls = function SchemaFieldBehaviourConfig$getControls() {
    /// <summary>Gets the controls depending on the context.</summary>
    /// <returns type="string">The controls</returns>
    var p = this.properties;
    var controls = {};
    switch (this.getTab()) {
        case "SchemaDesignTab":
            controls = p.data.controls;
            break;
        case "MetadataDesignTab":
            controls = p.metadata.controls;
            break;
    }
    if (typeof controls === "undefined") {
        controls = {};
    }
    return controls;
};

Tridion.Extensions.UI.FBI.SchemaFieldBehaviourConfig.prototype.getFieldDeisgner = function SchemaFieldBehaviourConfig$getFieldDeisgner() {
    /// <summary>Gets the Field Designer control.</summary>
    /// <returns type="string">The <see cref="Tridion.Controls.FieldDesigner">control</see></returns>
    var c = this.getControls();
    if (typeof c.fieldDesigner === "undefined") {
        switch (this.getTab()) {
            case "SchemaDesignTab":
                c.fieldDesigner = $controls.getControl($("#SchemaDesignFieldDesigner"), "Tridion.Controls.FieldDesigner");
                break;
            case "MetadataDesignTab":
                c.fieldDesigner = $controls.getControl($("#MetadataDesignFieldDesigner"), "Tridion.Controls.FieldDesigner");
                break;
        }
    }
    return c.fieldDesigner;
};

Tridion.Extensions.UI.FBI.SchemaFieldBehaviourConfig.prototype.getUsersAndGroupsList = function SchemaFieldBehaviourConfig$getUsersAndGroupsList() {
    /// <summary>Gets the Users and Groups List control.</summary>
    /// <returns type="string">The <see cref="Tridion.Controls.List">control</see></returns>
    var c = this.getControls();
    if (typeof c.usersAndGroupsList === "undefined") {
        switch (this.getTab()) {
            case "SchemaDesignTab":
                c.usersAndGroupsList = $controls.getControl($("#SchemaDesignTab_SchemaDesignFieldDesigner_SchemaFieldBehaviour_UsersAndGroupsList"), "Tridion.Controls.List");
                break;
            case "MetadataDesignTab":
                c.usersAndGroupsList = $controls.getControl($("#MetadataDesignTab_MetadataDesignFieldDesigner_MDSchemaFieldBehaviour_UsersAndGroupsList"), "Tridion.Controls.List");
                break;
        }
    }
    return c.usersAndGroupsList;
};

Tridion.Extensions.UI.FBI.SchemaFieldBehaviourConfig.prototype.getBehavioursPanel = function SchemaFieldBehaviourConfig$getBehavioursPanel() {
    /// <summary>Gets the Behaviours Panel control.</summary>
    /// <returns type="string">The <see cref="Tridion.Controls.Panel">control</see></returns>
    var c = this.getControls();
    if (typeof c.fieldsSecurityPanel === "undefined") {
        switch (this.getTab()) {
            case "SchemaDesignTab":
                c.fieldsSecurityPanel = $controls.getControl($("#SchemaDesignTab_SchemaDesignFieldDesigner_SchemaFieldBehaviour_SchemaDesignFieldSecurity"), "Tridion.Controls.Panel");
                break;
            case "MetadataDesignTab":
                c.fieldsSecurityPanel = $controls.getControl($("#MetadataDesignTab_MetadataDesignFieldDesigner_MDSchemaFieldBehaviour_SchemaDesignFieldSecurity"), "Tridion.Controls.Panel");
                break;
        }
    }
    return c.fieldsSecurityPanel;
};

Tridion.Extensions.UI.FBI.SchemaFieldBehaviourConfig.prototype.getSchema = function SchemaFieldBehaviourConfig$getSchema() {
    /// <summary>Gets the Schema object.</summary>
    /// <returns type="string">The <see cref="Tridion.CotntentManager.Schema">object</see></returns>
    var p = this.properties;
    return p.schema;
};

Tridion.Extensions.UI.FBI.SchemaFieldBehaviourConfig.prototype.onSchemaChanged = function SchemaFieldBehaviourConfig$onSchemaChanged() {
    /// <summary>
    /// This method gets called everytime the schema changes.
    ///</summary>
    var p = this.properties;
    if (p.schema && (p.schema.getSubType() == $const.SchemaPurpose.TEMPLATE_PARAMETERS || p.schema.getSubType() == $const.SchemaPurpose.BUNDLE)) {
        this.hidePanel();
    } else {
        this.showPanel();
    }

};

Tridion.Extensions.UI.FBI.SchemaFieldBehaviourConfig.prototype.showPanel = function SchemaFieldBehaviourConfig$showPanel() {
    /// <summary>
    /// Shows the <see cref="Tridion.Controls.Panel">behaviours panel</see>
    ///</summary>
    $css.display(this.getBehavioursPanel().getElement().parentNode);
};

Tridion.Extensions.UI.FBI.SchemaFieldBehaviourConfig.prototype.hidePanel = function SchemaFieldBehaviourConfig$hidePanel() {
    /// <summary>
    /// Hides the <see cref="Tridion.Controls.Panel"> behaviours panel</see>
    ///</summary>
    $css.undisplay(this.getBehavioursPanel().getElement().parentNode);
};

Tridion.Extensions.UI.FBI.SchemaFieldBehaviourConfig.prototype.initializeGroups = function SchemaFieldBehaviourConfig$initializeGroups() {
    /// <summary>
    /// Initializes the <see cref="Tridion.Controls.List">users and groups list</see>
    ///</summary>
    var self = this;
    var listControl = this.getUsersAndGroupsList();
    listControl.setLoading(true);
    listControl.clearSelection();

    function FieldBehaviour$listLoaded() {
        $evt.removeEventHandler(listControl, "load", FieldBehaviour$listLoaded);
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
    /// <summary>
    /// Gets the list of trustees, including both, groups and users.
    /// <returns type="string">The xml containing the list</returns>
    ///</summary>
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
        + '<tcm:Trustee xmlns:tcm="http://www.tridion.com/ContentManager/5.0" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:title="Interaction Manager" xlink:href="tcm:0-10-65568" ItemType="65568"><tcm:Right Type="2" Setting="Implicit Deny"/><tcm:Right Type="4" Setting="Implicit Deny"/><tcm:Right Type="8" Setting="Implicit Deny"/><tcm:Right Type="16" Setting="Implicit Deny"/><tcm:Right Type="32" Setting="Implicit Deny"/><tcm:Right Type="64" Setting="Implicit Deny"/><tcm:Right Type="128" Setting="Allow"/><tcm:Right Type="256" Setting="Implicit Deny"/><tcm:Right Type="512" Setting="Allow"/><tcm:Right Type="1024" Setting="Implicit Deny"/><tcm:Right Type="2048" Setting="Implicit Deny"/><tcm:Right Type="4096" Setting="Implicit Deny"/><tcm:Right Type="8192" Setting="Allow"/><tcm:Right Type="16384" Setting="Implicit Deny"/><tcm:Right Type="32768" Setting="Implicit Deny"/><tcm:Right Type="65536" Setting="Implicit Deny"/><tcm:Right Type="33554432" Setting="Implicit Deny"/><tcm:Right Type="67108864" Setting="Implicit Deny"/><tcm:Right Type="134217728" Setting="Implicit Deny"/><tcm:Right Type="268435456" Setting="Implicit Deny"/><tcm:Right Type="536870912" Setting="Implicit Deny"/><tcm:Right Type="1073741824" Setting="Implicit Deny"/><tcm:Right Type="2147483648" Setting="Implicit Deny"/></tcm:Trustee>'
        + '<tcm:Item ID="tcm:0-11-65552" Title="SDLTRIDION2013\SDL Tridion 2013" Icon="T65552L0P0S1" Description="Tridion Content Management Administrator" IsPredefined="false" Enabled="1" Type="65552"/>';

    xml = String.format("<tcm:ListTrustees xmlns:tcm=\"{0}\" xmlns:xlink=\"{1}\">{2}</tcm:ListTrustees>",
			$const.Namespaces.tcm, $const.Namespaces.xlink, hardcodedList);

    return xml;
};

Tridion.Extensions.UI.FBI.SchemaFieldBehaviourConfig.prototype._renderList = function SchemaFieldBehaviourConfig$_renderList(bodyXml) {
    /// <summary>
    /// Renders the users and groups list
    ///</summary>
    $assert.isString(bodyXml);

    var p = this.properties;
    var c = p.controls;
    var control = this.getUsersAndGroupsList();
    var xmlDoc = $xml.getNewXmlDocument(bodyXml);

    //control.setLoading(true);
    //control.clearSelection();
    //this._updateSecuritySettings(settingsType);

    //var self = this;

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

Tridion.Extensions.UI.FBI.SchemaFieldBehaviourConfig.prototype.getSelectedGroups = function SchemaFieldBehaviourConfig$getSelectedGroups() {
    /// <summary>
    /// Gets the currently selected group or user in the list
    /// <returns type="TcmURI">The TcmUri of the user or group</returns>
    ///</summary>
    var selection = this.getUsersAndGroupsList().getSelection();
    return selection.getItems();
};

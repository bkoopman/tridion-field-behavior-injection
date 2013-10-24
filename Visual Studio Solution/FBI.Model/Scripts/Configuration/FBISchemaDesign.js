/// <reference path="../Costants/FBIConstants.js" />
/// <reference path="../Helper/FBIHelper.js" />
Type.registerNamespace("Tridion.Extensions.UI.FBI");

Tridion.Extensions.UI.FBI.SchemaFieldBehaviourConfig = function SchemaFieldBehaviourConfig() {
    /// <summary>
    /// Helper class to deal with the controls on the Schema View, such as <see cref="Tridion.Controls.List">Users and groups list</see>
    /// <see cref="Tridion.Controls.FieldDesigner">Field Deisginer</see> and <see cref="Tridion.Controls.Panel">behaviours panel</see>
    /// It also exposes other relevant information such as the <see cref="Tridion.ContentManager.Schema">Schema</see>
    /// Moreover, it exposes a Helper class based on <see cref="Tridion.Extensions.UI.FBI.SchemaFieldBehaviourHelper"/>
    /// </summary>
    Tridion.OO.enableInterface(this, "Tridion.Extensions.UI.FBI.SchemaFieldBehaviourConfig");
    this.addInterface("Tridion.DisposableObject");
    var p = this.properties;
    this.Namespace = p.ns = $fbiConst.NAMESPACE_URL;
    this.properties.data = {};
    this.properties.metadata = {};
    
    p.usersXml = "";
    p.groupsXml = "";
    p.helper = new Tridion.Extensions.UI.FBI.SchemaFieldBehaviourHelper();
    var ns = Tridion.Constants.Namespaces;
    ns[$fbiConst.NAMESPACE_PREFIX] = $fbiConst.NAMESPACE_URL;
    
    p.disabled = false;
    var editor = $config.Editors[$fbiConst.EDITOR_NAME].configuration;
    if (editor) {
        var confXml = $xml.getNewXmlDocument(editor);
        var confObj = $xml.toJson(confXml);

        if (!confObj.length) {
            confObj = [].concat(confObj);
        }
        for (var i = 0; i < confObj.length; i++) {
            if (confObj[i][$fbiConst.FBI_NODE_NAME]) {
                p.disabled = confObj[i][$fbiConst.FBI_NODE_NAME]["@enabled"] == "false";
                return;
            }
        }
    }
};

Tridion.Extensions.UI.FBI.SchemaFieldBehaviourConfig.prototype.initialize = function SchemaFieldBehaviourConfig$intialize() {
    var checkbox = this.getShowAllCheckBox();
    $evt.addEventHandler(checkbox, "click", this.getDelegate(this.loadUsers));
    this.initializeGroups();
};

Tridion.Extensions.UI.FBI.SchemaFieldBehaviourConfig.prototype.getTab = function SchemaFieldBehaviourConfig$getTab() {
    /// <summary>Gets the Master Tab Control on the view.</summary>
    /// <returns type="string">The <see cref="Tridion.Controls.Tab"> Control</see></returns>
    var tabControl = $controls.getControl($("#MasterTabControl"), "Tridion.Controls.TabControl");
    return tabControl.getSelectedItem().getId();
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

Tridion.Extensions.UI.FBI.SchemaFieldBehaviourConfig.prototype.getFieldList = function SchemaFieldBehaviourConfig$getFieldList() {
    /// <summary>Gets the Field Designer control.</summary>
    /// <returns type="string">The <see cref="Tridion.Controls.FieldDesigner">control</see></returns>
    var c = this.getControls();
    if (typeof c.fieldDesigner === "undefined") {
        switch (this.getTab()) {
            case "SchemaDesignTab":
                c.fieldList = $controls.getControl($("#SchemaDesignFieldsList"), "Tridion.Controls.List");
                break;
            case "MetadataDesignTab":
                c.fieldList = $controls.getControl($("#MetadataDesignFieldsList"), "Tridion.Controls.List");
                break;
        }
    }
    return c.fieldList;
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

Tridion.Extensions.UI.FBI.SchemaFieldBehaviourConfig.prototype.getShowAllCheckBox = function SchemaFieldBehaviourConfig$getShowAllCheckBox() {
    /// <summary>Gets the Field Designer control.</summary>
    /// <returns type="string">The <see cref="Tridion.Controls.FieldDesigner">control</see></returns>
    var c = this.getControls();
    if (typeof c.showAllCheckbox === "undefined") {
        switch (this.getTab()) {
            case "SchemaDesignTab":
                c.showAllCheckbox = $("#SchemaDesignTab_SchemaDesignFieldDesigner_SchemaFieldBehaviour_ShowAllCheckBox");
                break;
            case "MetadataDesignTab":
                c.showAllCheckbox = $("#MetadataDesignTab_MetadataDesignFieldDesigner_MDSchemaFieldBehaviour_ShowAllCheckBox");
                break;
        }
    }
    return c.showAllCheckbox;
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
    if (typeof p.schema === "undefined") {
        p.schema = $display.getItem();
    }
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

Tridion.Extensions.UI.FBI.SchemaFieldBehaviourConfig.prototype.onGroupsLoaded = function SchemaFieldBehaviourConfig$onGroupsLoaded() {
    var p = this.properties;
    p.groupsXml = $xml.getInnerXml($xml.getNewXmlDocument(p.groupsList.getXml()).firstChild);
    this._renderList();
};

Tridion.Extensions.UI.FBI.SchemaFieldBehaviourConfig.prototype.onUsersLoaded = function SchemaFieldBehaviourConfig$onUsersLoaded() {
    var p = this.properties;
    p.usersXml = $xml.getInnerXml($xml.getNewXmlDocument(p.usersList.getXml()).firstChild);
    this._renderList();
};

Tridion.Extensions.UI.FBI.SchemaFieldBehaviourConfig.prototype.loadUsers = function SchemaFieldBehaviourConfig$loadUsers() {
    /// <summary>
    /// Initializes the <see cref="Tridion.Controls.List">users list</see>
    ///</summary>
    var p = this.properties;
    
    var checkControl = this.getShowAllCheckBox();
    if (!checkControl.checked) {
        p.usersXml = "";
        this._renderList();
        this.getFieldDeisgner().fireEvent("updateview");
        return;
    }
    
    
    var listControl = this.getUsersAndGroupsList();
    listControl.setLoading(true);
    listControl.clearSelection();

    var usrMng = $models.getItem($const.ItemType.USER_MANAGEMENT);
    p.usersList = usrMng.getList();
    if (p.usersList.isLoaded()) {
        this.onUsersLoaded();
    } else {
        $evt.addEventHandler(p.usersList, "load", Function.getDelegate(this, this.onUsersLoaded));
        p.usersList.load();
    }
};

Tridion.Extensions.UI.FBI.SchemaFieldBehaviourConfig.prototype.initializeGroups = function SchemaFieldBehaviourConfig$initializeGroups() {
    /// <summary>
    /// Initializes the <see cref="Tridion.Controls.List">users and groups list</see>
    ///</summary>
    var p = this.properties;
    var listControl = this.getUsersAndGroupsList();
    listControl.setLoading(true);
    listControl.clearSelection();
    
    var groupMng = $models.getItem($const.ItemType.GROUP_MANAGEMENT);
    p.groupsList = groupMng.getList();
    if (p.groupsList.isLoaded()) {
        this.onGroupsLoaded();
    } else {
        $evt.addEventHandler(p.groupsList, "load", this.onGroupsLoaded);
        p.groupsList.load();
    }
};

Tridion.Extensions.UI.FBI.SchemaFieldBehaviourConfig.prototype._getStaticTrusteesXml = function SchemaFieldBehaviourConfig$_getStaticTrusteesXml() {
    /// <summary>
    /// Gets the list of trustees, including both, groups and users.
    /// <returns type="string">The xml containing the list</returns>
    ///</summary>
    var p = this.properties;
    var xml = p.groupsXml;
    if (p.usersXml != "") {
        xml += p.usersXml;
    }
  
    var resultXml = String.format("<tcm:ListTrustees xmlns:tcm=\"{0}\" xmlns:xlink=\"{1}\">{2}</tcm:ListTrustees>",
			$const.Namespaces.tcm, $const.Namespaces.xlink, xml);

    return resultXml;
};

Tridion.Extensions.UI.FBI.SchemaFieldBehaviourConfig.prototype._renderList = function SchemaFieldBehaviourConfig$_renderList() {
    /// <summary>
    /// Renders the users and groups list
    ///</summary>
    var bodyXml = this._getStaticTrusteesXml();
    $assert.isString(bodyXml);
    
    var p = this.properties;
    var control = this.getUsersAndGroupsList();
    var xmlDoc = $xml.getNewXmlDocument(bodyXml);

    // add behavior flag to XML
    var schema = this.getSchema();
    var enabledBehaviours = $fbiEditorConfig.getEnabledBehaviourKeys();
    var entries = xmlDoc.documentElement.children;
    for (var i = 0; i < entries.length; i++) {
        var entry = entries[i];
        var id = entry.attributes["ID"].value;

        // ToDo: determine if id has behaviors configured
        var value = "";
        entry.setAttribute("BehaviorsEnabled", value);
    }


    function FieldBehaviour$_drawControl(definitionDocument) {
        control.draw(xmlDoc, definitionDocument);
        control.setLoading(false);
    }
    

    if (!p.listHeadDoc) {
        function FieldBehaviour$_headDocumentLoaded(headDoc) {
            p.listHeadDoc = headDoc;
            FieldBehaviour$_drawControl(headDoc);
        }

        function FieldBehaviour$_headDocumentLoadFailed() {
            $log.error("Unable to load head xml file for list.");
        }
        
        //var xmlPath = $config.expandEditorPath($fbiConst.LISTTRUSTEES_HEAD_PATH, $const.CMEEditorName);
        var xmlPath = $config.expandEditorPath($fbiConst.LISTTRUSTEES_HEAD_PATH, $fbiConst.EDITOR_NAME);
        $xml.loadXmlDocument(xmlPath + "?forView=" + Tridion.Core.Configuration.CurrentView + "&forControl=" + control.getId(), FieldBehaviour$_headDocumentLoaded, FieldBehaviour$_headDocumentLoadFailed);
        
    } else {
        FieldBehaviour$_drawControl(p.listHeadDoc);
    }
};

Tridion.Extensions.UI.FBI.SchemaFieldBehaviourConfig.prototype.getSelectedGroups = function SchemaFieldBehaviourConfig$getSelectedGroups() {
    /// <summary>
    /// Gets the currently selected group or user in the list
    /// <returns type="TcmURI">The TcmUri of the user or group</returns>
    ///</summary>
    var selection = this.getUsersAndGroupsList().getSelection();
    return selection.getItems();
};

Tridion.Extensions.UI.FBI.SchemaFieldBehaviourConfig.prototype.getLabel = function SchemaFieldBehaviourConfig$getLabel(key, params) {
    if (typeof params == "undefined") {
        return $localization.getResource($fbiConst.RESOURCES_NAMESPACE, key);
    } else {
        return $localization.getResource($fbiConst.RESOURCES_NAMESPACE, key, params);
    }
};

Tridion.Extensions.UI.FBI.SchemaFieldBehaviourConfig.prototype.isEnabled = function SchemaFieldBehaviourConfig$isEnabled(key, params) {
    var p = this.properties;
    return !p.disabled;
};

$fbiConfig = new Tridion.Extensions.UI.FBI.SchemaFieldBehaviourConfig();
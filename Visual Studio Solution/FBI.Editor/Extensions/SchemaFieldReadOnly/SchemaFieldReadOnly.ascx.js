Type.registerNamespace("Tridion.Extensions.UI.FBI");

Tridion.Extensions.UI.FBI.SchemaFieldReadOnly = function SchemaFieldReadOnly()
{
    Tridion.OO.enableInterface(this, "Tridion.Extensions.UI.FBI.SchemaFieldReadOnly");
    this.addInterface("Tridion.Extensions.UI.FBI.BehaviourConfigurationBase");
    this.addInterface("Tridion.DisposableObject");
    
    this.key = "readonly";
    this.areaId = "SchemaFieldReadonly";
	var p = this.properties;
    p.controls = {};
    
};

Tridion.Extensions.UI.FBI.SchemaFieldReadOnly.prototype.initialize = function SchemaFieldReadOnly$initialize(deckPage) {
    this.callBase("Tridion.Extensions.UI.FBI.BehaviourConfigurationBase", "setKey", [this.key]);
    this.callBase("Tridion.Extensions.UI.FBI.BehaviourConfigurationBase", "setAreaId", [this.areaId]);
    var p = this.properties;
    var c = p.controls;
    
    switch (deckPage) {
        case "SchemaDesignTab":
            c.fieldReadOnlyCheckbox = $("#SchemaDesignTab_SchemaDesignFieldDesigner_SchemaFieldBehaviour_SchemaFieldReadOnly_checkbox");
            break;
        case "MetadataDesignTab":
            c.fieldReadOnlyCheckbox = $("#MetadataDesignTab_MetadataDesignFieldDesigner_MDSchemaFieldBehaviour_MDSchemaFieldReadOnly_checkbox");
                                          
            break;
    }
    
    $evt.addEventHandler($fbiConfig.getUsersAndGroupsList(), "selectionchange", Function.getDelegate(this, this.onSelectionChange));
    $evt.addEventHandler($fbiConfig.getFieldDeisgner(), "updateview", Function.getDelegate(this, this.onUpdateView));
    $evt.addEventHandler(c.fieldReadOnlyCheckbox, "click", Function.getDelegate(this, this.onReadOnlyCheckboxClick));
    this.callBase("Tridion.Extensions.UI.FBI.BehaviourConfigurationBase", "onSchemaChanged");
};

Tridion.Extensions.UI.FBI.SchemaFieldReadOnly.prototype.onReadOnlyCheckboxClick = function SchemaFieldReadOnly$onReadOnlyCheckboxClick() {
    var p = this.properties;
    var c = p.controls;
    var checked = c.fieldReadOnlyCheckbox.checked ? "true" : "false";
    this.setConfigurationValue(checked);
};

Tridion.Extensions.UI.FBI.SchemaFieldReadOnly.prototype.onSelectionChange = function SchemaFieldReadOnly$onSelectionChange() {
    var p = this.properties;
    var c = p.controls;
    c.fieldReadOnlyCheckbox.disabled = false;
    var selectedGroups = $fbiConfig.getSelectedGroups();

    if (selectedGroups) {
        p.selectedGroup = selectedGroups[0];
    } 
    var configValue = this.getConfigurationValue();
    c.fieldReadOnlyCheckbox.checked = configValue == "true";
    
    
};

Tridion.Extensions.UI.FBI.SchemaFieldReadOnly.prototype.onUpdateView = function SchemaFieldReadOnly$onUpdateView() {
    var p = this.properties;
    var c = p.controls;
    var schema = $fbiConfig.getSchema();
    c.fieldReadOnlyCheckbox.disabled = (schema && (schema.isReadOnly() || schema.isLocalized())) || false || !p.selectedGroup;

    if (p.selectedGroup) {
        var readonly = this.getConfigurationValue();
        c.fieldReadOnlyCheckbox.checked = readonly == "true";
    } else {
        c.fieldReadOnlyCheckbox.checked = false;
    }

};

if ($fbiConfig.isEnabled()) {
    Tridion.Controls.Deck.registerInitializeExtender($fbiConst.SCHEMA_DESIGN_TAB, Tridion.Extensions.UI.FBI.SchemaFieldReadOnly);
    Tridion.Controls.Deck.registerInitializeExtender($fbiConst.METADATA_SCHEMA_DESIGN_TAB, Tridion.Extensions.UI.FBI.SchemaFieldReadOnly);
}


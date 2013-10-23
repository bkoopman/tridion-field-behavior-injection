Type.registerNamespace("Tridion.Extensions.UI.FBI");

Tridion.Extensions.UI.FBI.SchemaFieldVisibility = function SchemaFieldVisibility()
{
    Tridion.OO.enableInterface(this, "Tridion.Extensions.UI.FBI.SchemaFieldVisibility");
    this.addInterface("Tridion.Extensions.UI.FBI.BehaviourConfigurationBase");
    this.addInterface("Tridion.DisposableObject");
    
    this.key = "hidden";
    this.areaId = "SchemaFieldVisibility";
    
    var p = this.properties;
    p.controls = {};
};

Tridion.Extensions.UI.FBI.SchemaFieldVisibility.prototype.initialize = function SchemaFieldVisibility$initialize(deckPage) {
    this.callBase("Tridion.Extensions.UI.FBI.BehaviourConfigurationBase", "setKey", [this.key]);
    this.callBase("Tridion.Extensions.UI.FBI.BehaviourConfigurationBase", "setAreaId", [this.areaId]);
    var p = this.properties;
    var c = p.controls;

    switch (deckPage) {
        case "SchemaDesignTab":
            c.fieldHiddenCheckbox = $("#SchemaDesignTab_SchemaDesignFieldDesigner_SchemaFieldBehaviour_SchemaFieldVisibility_checkbox");
            break;
        case "MetadataDesignTab":
            c.fieldHiddenCheckbox = $("#MetadataDesignTab_MetadataDesignFieldDesigner_MDSchemaFieldBehaviour_MDSchemaFieldVisibility_checkbox");
            break;
    }

    $evt.addEventHandler($fbiConfig.getUsersAndGroupsList(), "selectionchange", Function.getDelegate(this, this.onSelectionChange));
    $evt.addEventHandler($fbiConfig.getFieldDeisgner(), "updateview", Function.getDelegate(this, this.onUpdateView));
    $evt.addEventHandler(c.fieldHiddenCheckbox, "click", Function.getDelegate(this, this.onVisibilityCheckboxClick));
    this.callBase("Tridion.Extensions.UI.FBI.BehaviourConfigurationBase", "onSchemaChanged");
};

Tridion.Extensions.UI.FBI.SchemaFieldVisibility.prototype.onVisibilityCheckboxClick = function SchemaFieldVisibility$onVisibilityCheckboxClick() {
    var p = this.properties;
    var c = p.controls;
    var checked = c.fieldHiddenCheckbox.checked ? "true" : "false";
    this.setConfigurationValue(checked);
};

Tridion.Extensions.UI.FBI.SchemaFieldVisibility.prototype.onSelectionChange = function SchemaFieldVisibility$onSelectionChange() {
    var p = this.properties;
    var c = p.controls;

    c.fieldHiddenCheckbox.disabled = false;
    var selectedGroups = $fbiConfig.getSelectedGroups();
    if (selectedGroups) {
        p.selectedGroup = selectedGroups[0];
    }
    var configValue = this.getConfigurationValue();
    c.fieldHiddenCheckbox.checked = configValue == "true";

};

Tridion.Extensions.UI.FBI.SchemaFieldVisibility.prototype.onUpdateView = function SchemaFieldVisibility$onUpdateView() {
    var p = this.properties;
    var c = p.controls;
    var schema = $fbiConfig.getSchema();
    c.fieldHiddenCheckbox.disabled = (schema && (schema.isReadOnly() || schema.isLocalized())) || false || !p.selectedGroup;

    if (p.selectedGroup) {
        var Visibility = this.getConfigurationValue();
        c.fieldHiddenCheckbox.checked = Visibility == "true";
    } else {
        c.fieldHiddenCheckbox.checked = false;
    }

};


Tridion.Controls.Deck.registerInitializeExtender("SchemaDesignTab", Tridion.Extensions.UI.FBI.SchemaFieldVisibility);
Tridion.Controls.Deck.registerInitializeExtender("MetadataDesignTab", Tridion.Extensions.UI.FBI.SchemaFieldVisibility);

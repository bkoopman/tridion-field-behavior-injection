Type.registerNamespace("Tridion.Extensions.UI.FBI");

Tridion.Extensions.UI.FBI.SchemaFieldVisibility = function SchemaFieldVisibility() {
    console.debug("Tridion.Extensions.UI.FBI.SchemaFieldVisibility");
    Tridion.OO.enableInterface(this, "Tridion.Extensions.UI.FBI.SchemaFieldVisibility");
    this.key = "hidden";
    this.addInterface("Tridion.DisposableObject");

    var p = this.properties;
    p.controls = {};
    p.ns = "http://www.sdltridion.com/2011/FieldValidation";
};

Tridion.Extensions.UI.FBI.SchemaFieldVisibility.prototype.initialize = function SchemaFieldVisibility$initialize(deckPage) {
    console.debug("Tridion.Extensions.UI.FBI.SchemaFieldVisibility.initialize");
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
    this.onSchemaChanged();
};

Tridion.Extensions.UI.FBI.SchemaFieldVisibility.prototype.onVisibilityCheckboxClick = function SchemaFieldVisibility$onVisibilityCheckboxClick() {
    console.debug("Tridion.Extensions.UI.FBI.SchemaFieldVisibility.prototype.onVisibilityCheckboxClick");
    var p = this.properties;
    var c = p.controls;
    var checked = c.fieldHiddenCheckbox.checked ? "true" : "false";
    this.setConfigurationValue(checked);
};


Tridion.Extensions.UI.FBI.SchemaFieldVisibility.prototype.onSelectionChange = function SchemaFieldVisibility$onSelectionChange() {
    console.debug("Tridion.Extensions.UI.FBI.SchemaFieldVisibility.prototype.onSelectionChange");
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

Tridion.Extensions.UI.FBI.SchemaFieldVisibility.prototype.onSchemaChanged = function SchemaFieldVisibility$onSchemaChanged() {
    console.debug("Tridion.Extensions.UI.FBI.SchemaFieldVisibility.prototype.onSchemaChanged");
    var c = this.properties.controls;
    var schema = $display.getItem();

    if (schema && (schema.getSubType() == $const.SchemaPurpose.TEMPLATE_PARAMETERS || schema.getSubType() == $const.SchemaPurpose.BUNDLE)) {
        $css.undisplay(c.fieldHiddenCheckbox.parentNode);
    }
    else {
        $css.display(c.fieldHiddenCheckbox.parentNode);
    }
};

Tridion.Extensions.UI.FBI.SchemaFieldVisibility.prototype.onUpdateView = function SchemaFieldVisibility$onUpdateView() {
    console.debug("Tridion.Extensions.UI.FBI.SchemaFieldVisibility.prototype.onUpdateView");
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

Tridion.Extensions.UI.FBI.SchemaFieldVisibility.prototype.getConfigurationValue = function SchemaFieldVisibility$getConfigurationValue() {
    var p = this.properties;
    var value = $fbiConfig.getConfigurationHelper().getConfigurationValue(p.selectedGroup, this.key);
    return value;

};

Tridion.Extensions.UI.FBI.SchemaFieldVisibility.prototype.setConfigurationValue = function SchemaFieldVisibility$setConfigurationValue(value) {
    var p = this.properties;
    $fbiConfig.getConfigurationHelper().setConfigurationValue(p.selectedGroup, this.key, value);

};

Tridion.Controls.Deck.registerInitializeExtender("SchemaDesignTab", Tridion.Extensions.UI.FBI.SchemaFieldVisibility);
Tridion.Controls.Deck.registerInitializeExtender("MetadataDesignTab", Tridion.Extensions.UI.FBI.SchemaFieldVisibility);

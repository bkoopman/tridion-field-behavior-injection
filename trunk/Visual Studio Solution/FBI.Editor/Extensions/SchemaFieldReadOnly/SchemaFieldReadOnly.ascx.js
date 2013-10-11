﻿Type.registerNamespace("Tridion.Extensions.UI.FBI");

Tridion.Extensions.UI.FBI.SchemaFieldReadOnly = function SchemaFieldReadOnly()
{
    console.debug("Tridion.Extensions.UI.FBI.SchemaFieldReadOnly");
    Tridion.OO.enableInterface(this, "Tridion.Extensions.UI.FBI.SchemaFieldReadOnly");
    this.key = "readonly";
	this.addInterface("Tridion.DisposableObject");

	var p = this.properties;
    p.controls = {};
    p.ns = "http://www.sdltridion.com/2011/FieldValidation";
};

Tridion.Extensions.UI.FBI.SchemaFieldReadOnly.prototype.initialize = function SchemaFieldReadOnly$initialize(deckPage) {
    console.debug("Tridion.Extensions.UI.FBI.SchemaFieldReadOnly.initialize");
    var p = this.properties;
    var c = p.controls;
    
    switch (deckPage) {
        case "SchemaDesignTab":
            c.fieldReadOnlyCheckbox = $("#SchemaDesignTab_SchemaDesignFieldDesigner_SchemaFieldBehaviour_SchemaFieldReadOnly_checkbox");
            break;
        case "MetadataDesignTab":
            c.fieldReadOnlyCheckbox = $("#MetadataDesignTab_MetadataDesignFieldDesigner_metadata_SchemaFieldBehaviour_SchemaFieldReadOnly_checkbox");
            break;
    }

    $evt.addEventHanlder($fbiConfig.getUsersAndGroupsList(), "change", Function.getDelegate(this, this.onSelectionChange));
    $evt.addEventHandler($fbiConfig.getFieldDeisgner(), "updateview", Function.getDelegate(this, this.onUpdateView));
    $evt.addEventHandler(c.fieldReadOnlyCheckbox, "click", Function.getDelegate(this, this.onReadOnlyCheckboxClick));
    this.onSchemaChanged();
};

Tridion.Extensions.UI.FBI.SchemaFieldReadOnly.prototype.onReadOnlyCheckboxClick = function SchemaFieldReadOnly$onReadOnlyCheckboxClick() {
    console.debug("Tridion.Extensions.UI.FBI.SchemaFieldReadOnly.prototype.onReadOnlyCheckboxClick");
    var p = this.properties;
    var c = p.controls;
    var checked = c.fieldReadOnlyCheckbox.checked ? "true" : "false";
    this.setConfigurationValue();
};


Tridion.Extensions.UI.FBI.SchemaFieldReadOnly.prototype.onSelectionChange = function SchemaFieldReadOnly$onSelectionChange() {
    console.debug("Tridion.Extensions.UI.FBI.SchemaFieldReadOnly.prototype.onSelectionChange");
    var p = this.properties;
    var selectedGroups = $fbiConfig.getSelectedGroups();
    if (selectedGroups) {
        p.selectedGroup = selectedGroups[0];
    }
    this.onUpdateView();
};

Tridion.Extensions.UI.FBI.SchemaFieldReadOnly.prototype.onSchemaChanged = function SchemaFieldReadOnly$onSchemaChanged() {
    console.debug("Tridion.Extensions.UI.FBI.SchemaFieldReadOnly.prototype.onSchemaChanged");
    var c = this.properties.controls;
    var schema = $display.getItem();
    
    if (schema && (schema.getSubType() == $const.SchemaPurpose.TEMPLATE_PARAMETERS || schema.getSubType() == $const.SchemaPurpose.BUNDLE)) {
        $css.undisplay(c.fieldReadOnlyCheckbox.parentNode);
    }
    else {
        $css.display(c.fieldReadOnlyCheckbox.parentNode);
    }
};

Tridion.Extensions.UI.FBI.SchemaFieldReadOnly.prototype.onUpdateView = function SchemaFieldReadOnly$onUpdateView() {
    console.debug("Tridion.Extensions.UI.FBI.SchemaFieldReadOnly.prototype.onUpdateView");
    var p = this.properties;
    var c = p.controls;
    if (p.selectedGroup) {
        
        var readonly = this.getConfigurationValue();
        c.fieldReadOnlyCheckbox.checked = (readonly != "false");
        
    } else {
        c.fieldReadOnlyCheckbox.checked = false;
    }
    var schema = $fbiConfig.getSchema();
    c.fieldReadOnlyCheckbox.disabled = (schema && (schema.isReadOnly() || schema.isLocalized())) || false;
    
    
};

Tridion.Extensions.UI.FBI.SchemaFieldReadOnly.prototype.getConfigurationValue = function SchemaFieldReadOnly$getConfigurationValue() {
    var p = this.properties;
    return $fbiConfig.Helper.getConfigurationValue(p.groupId, this.key);

};

Tridion.Extensions.UI.FBI.SchemaFieldReadOnly.prototype.setConfigurationValue = function SchemaFieldReadOnly$setConfigurationValue(value) {
    var p = this.properties;
    $fbiConfig.Helper.setConfigurationValue(p.selectedGroup, this.key, value);

};



Tridion.Controls.Deck.registerInitializeExtender("SchemaDesignTab", Tridion.Extensions.UI.FBI.SchemaFieldReadOnly);
Tridion.Controls.Deck.registerInitializeExtender("MetadataDesignTab", Tridion.Extensions.UI.FBI.SchemaFieldReadOnly);
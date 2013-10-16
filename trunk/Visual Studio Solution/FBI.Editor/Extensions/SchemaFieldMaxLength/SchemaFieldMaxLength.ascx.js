Type.registerNamespace("Tridion.Extensions.UI.FBI");

Tridion.Extensions.UI.FBI.SchemaFieldMaxLength = function SchemaFieldMaxLength() {
    Tridion.OO.enableInterface(this, "Tridion.Extensions.UI.FBI.SchemaFieldMaxLength");
    this.addInterface("Tridion.Extensions.UI.FBI.BehaviourConfigurationBase");
    this.addInterface("Tridion.DisposableObject");

    this.key = "maxlength";
    var p = this.properties;
    p.controls = {};

};

Tridion.Extensions.UI.FBI.SchemaFieldMaxLength.prototype.initialize = function SchemaFieldMaxLength$initialize(deckPage) {
    this.callBase("Tridion.Extensions.UI.FBI.BehaviourConfigurationBase", "setKey", [this.key]);
    var p = this.properties;
    var c = p.controls;

    switch (deckPage) {
        case "SchemaDesignTab":
            c.fieldMaxLengthInput = $("#SchemaDesignTab_SchemaDesignFieldDesigner_SchemaFieldBehaviour_SchemaFieldMaxLength_text");
            break;
        case "MetadataDesignTab":
            c.fieldMaxLengthInput = $("#MetadataDesignTab_MetadataDesignFieldDesigner_MDSchemaFieldBehaviour_MDSchemaFieldMaxLength_text");

            break;
    }

    $evt.addEventHandler($fbiConfig.getUsersAndGroupsList(), "selectionchange", Function.getDelegate(this, this.onSelectionChange));
    $evt.addEventHandler($fbiConfig.getFieldDeisgner(), "updateview", Function.getDelegate(this, this.onUpdateView));
    $evt.addEventHandler(c.fieldMaxLengthInput, "blur", Function.getDelegate(this, this.onMaxLengthInputBlur));
    $evt.addEventHandler(c.fieldMaxLengthInput, "change", Function.getDelegate(this, this.onMaxLengthInputChange));
    this.callBase("Tridion.Extensions.UI.FBI.BehaviourConfigurationBase", "onSchemaChanged");
};

Tridion.Extensions.UI.FBI.SchemaFieldMaxLength.prototype.onMaxLengthInputChange = function SchemaFieldMaxLength$onMaxLengthInputChange(e) {
    console.debug("Tridion.Extensions.UI.FBI.SchemaFieldMaxLength.prototype.onMaxLengthCheckboxBlur");
    var p = this.properties;
    var c = p.controls;
    var value = c.fieldMaxLengthInput.value;
    if (value != "" && isNaN(value)) {
        c.fieldMaxLengthInput.value = "";
    }
};

Tridion.Extensions.UI.FBI.SchemaFieldMaxLength.prototype.onMaxLengthInputBlur = function SchemaFieldMaxLength$onMaxLengthInputBlur() {
    console.debug("Tridion.Extensions.UI.FBI.SchemaFieldMaxLength.prototype.onMaxLengthCheckboxBlur");
    var p = this.properties;
    var c = p.controls;
    var value = c.fieldMaxLengthInput.value;
    if (value == "" || !isNaN(value)) {
        this.setConfigurationValue(value);
    } 
};

Tridion.Extensions.UI.FBI.SchemaFieldMaxLength.prototype.onSelectionChange = function SchemaFieldMaxLength$onSelectionChange() {
    console.debug("Tridion.Extensions.UI.FBI.SchemaFieldMaxLength.prototype.onSelectionChange");
    var p = this.properties;
    var c = p.controls;
    c.fieldMaxLengthInput.disabled = false;
    var selectedGroups = $fbiConfig.getSelectedGroups();

    if (selectedGroups) {
        p.selectedGroup = selectedGroups[0];
    }

    var configValue = this.getConfigurationValue();
    if (typeof configValue === "undefined") {
        configValue = "";
    }
    c.fieldMaxLengthInput.value = configValue;


};

Tridion.Extensions.UI.FBI.SchemaFieldMaxLength.prototype.onUpdateView = function SchemaFieldMaxLength$onUpdateView() {
    console.debug("Tridion.Extensions.UI.FBI.SchemaFieldMaxLength.prototype.onUpdateView");
    var p = this.properties;
    var c = p.controls;
    var schema = $fbiConfig.getSchema();
    c.fieldMaxLengthInput.disabled = (schema && (schema.isReadOnly() || schema.isLocalized())) || false || !p.selectedGroup;
    if (p.selectedGroup) {
        var maxLength = this.getConfigurationValue();
        if (typeof maxLength === "undefined") {
            maxLength = "";
        }
        c.fieldMaxLengthInput.value = maxLength;
    }

};

if ($fbiConfig.isEnabled()) {
    Tridion.Controls.Deck.registerInitializeExtender("SchemaDesignTab", Tridion.Extensions.UI.FBI.SchemaFieldMaxLength);
    Tridion.Controls.Deck.registerInitializeExtender("MetadataDesignTab", Tridion.Extensions.UI.FBI.SchemaFieldMaxLength);
}


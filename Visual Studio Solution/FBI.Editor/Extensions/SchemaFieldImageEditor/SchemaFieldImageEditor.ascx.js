Type.registerNamespace("Tridion.Extensions.UI.FBI");

Tridion.Extensions.UI.FBI.SchemaFieldImageEditor = function SchemaFieldImageEditor()
{
    Tridion.OO.enableInterface(this, "Tridion.Extensions.UI.FBI.SchemaFieldImageEditor");
    this.addInterface("Tridion.Extensions.UI.FBI.BehaviourConfigurationBase");
    this.addInterface("Tridion.DisposableObject");
    
    this.key = $fbiConst.IMAGE_EDIT;
    this.areaId = "SchemaFieldImageEditor";
    
    var p = this.properties;
    p.controls = {};
};

Tridion.Extensions.UI.FBI.SchemaFieldImageEditor.prototype.initialize = function SchemaFieldImageEditor$initialize(deckPage) {
    this.callBase("Tridion.Extensions.UI.FBI.BehaviourConfigurationBase", "initialize", [deckPage, this.key, this.areaId]);
    
    var p = this.properties;
    var c = p.controls;

    switch (deckPage) {
        case $fbiConst.SCHEMA_DESIGN_TAB:
            c.fieldImageEditorCheckbox = $("#SchemaDesignTab_SchemaDesignFieldDesigner_SchemaFieldBehaviour_SchemaFieldImageEditor_checkbox");
            break;
        case $fbiConst.METADATA_DESIGN_TAB:
            c.fieldImageEditorCheckbox = $("#MetadataDesignTab_MetadataDesignFieldDesigner_MDSchemaFieldBehaviour_MDSchemaFieldImageEditor_checkbox");
            break;
    }

    $evt.addEventHandler($fbiConfig.getUsersAndGroupsList(), "selectionchange", Function.getDelegate(this, this.onSelectionChange));
    $evt.addEventHandler($fbiConfig.getFieldDeisgner(), "updateview", Function.getDelegate(this, this.onUpdateView));
    $evt.addEventHandler(c.fieldImageEditorCheckbox, "click", Function.getDelegate(this, this.onImageEditorCheckboxClick));
    this.callBase("Tridion.Extensions.UI.FBI.BehaviourConfigurationBase", "onSchemaChanged");
};

Tridion.Extensions.UI.FBI.SchemaFieldImageEditor.prototype.onImageEditorCheckboxClick = function SchemaFieldImageEditor$onImageEditorCheckboxClick() {
    var p = this.properties;
    var c = p.controls;
    var checked = c.fieldImageEditorCheckbox.checked ? "true" : "false";
    this.setConfigurationValue(checked);
};

Tridion.Extensions.UI.FBI.SchemaFieldImageEditor.prototype.onSelectionChange = function SchemaFieldImageEditor$onSelectionChange() {
    var p = this.properties;
    var c = p.controls;

    c.fieldImageEditorCheckbox.disabled = false;
    var selectedGroups = $fbiConfig.getSelectedGroups();
    if (selectedGroups) {
        p.selectedGroup = selectedGroups[0];
    }
    var configValue = this.getConfigurationValue();
    c.fieldImageEditorCheckbox.checked = configValue == "true";

};

Tridion.Extensions.UI.FBI.SchemaFieldImageEditor.prototype.onUpdateView = function SchemaFieldImageEditor$onUpdateView() {
    if (!this.checkAndApplyVisiblity()) {
        return;
    }
    var p = this.properties;
    var c = p.controls;
    var schema = $fbiConfig.getSchema();
    c.fieldImageEditorCheckbox.disabled = (schema && (schema.isReadOnly() || schema.isLocalized())) || false || !p.selectedGroup;

    if (p.selectedGroup) {
        var imageEditor = this.getConfigurationValue();
        c.fieldImageEditorCheckbox.checked = imageEditor == "true";
    } else {
        c.fieldImageEditorCheckbox.checked = false;
    }
};

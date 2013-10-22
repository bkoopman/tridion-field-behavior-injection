Type.registerNamespace("Tridion.Extensions.UI.FBI");

Tridion.Extensions.UI.FBI.SchemaFieldSyntaxHighlight = function SchemaFieldSyntaxHighlight()
{
    Tridion.OO.enableInterface(this, "Tridion.Extensions.UI.FBI.SchemaFieldSyntaxHighlight");
    this.addInterface("Tridion.Extensions.UI.FBI.BehaviourConfigurationBase");
    this.addInterface("Tridion.DisposableObject");
    
    this.key = "SyntaxHighlight";
	var p = this.properties;
    p.controls = {};

    p.languagesReady = false;
    
};

Tridion.Extensions.UI.FBI.SchemaFieldSyntaxHighlight.prototype.initialize = function SchemaFieldSyntaxHighlight$initialize(deckPage) {
    this.callBase("Tridion.Extensions.UI.FBI.BehaviourConfigurationBase", "setKey", [this.key]);
    var p = this.properties;
    var c = p.controls;

    switch (deckPage) {
        case "SchemaDesignTab":
            c.fieldLanguageList = $("#SchemaDesignTab_SchemaDesignFieldDesigner_SchemaFieldBehaviour_SchemaFieldSyntaxHighlight_SyntaxList");
            break;
        case "MetadataDesignTab":
            c.fieldLanguageList = $("#MetadataDesignTab_MetadataDesignFieldDesigner_MDSchemaFieldBehaviour_MDSchemaFieldSyntaxHighlight_SyntaxList");
            break;
    }
    if (c.fieldLanguageList) {
        c.fieldLanguageList.disabled = true;
    }

    console.log("here");
    var languages = $fbiSyntaxHighlightConfig.getLanguages();

    console.log("here2");

    for (var i = 0; i < languages.length; i++) {
        var opt = c.fieldLanguageList.options;
        console.log("here 3");
        var lang = languages[i];
        opt[opt.length] = new Option(languages[lang].Name, languages[lang].Type);
    }
    p.languagesReady = true;
    var schema = $display.getItem();
    c.fieldLanguageList.disabled = (schema && (schema.isReadOnly() || schema.isLocalized())) || false || !p.languagesReady || !p.selectedGroup;

    $evt.addEventHandler($fbiConfig.getUsersAndGroupsList(), "selectionchange", Function.getDelegate(this, this.onSelectionChange));
    $evt.addEventHandler($fbiConfig.getFieldDeisgner(), "updateview", Function.getDelegate(this, this.onUpdateView));
    $evt.addEventHandler(c.fieldValidatorList, "change", Function.getDelegate(this, this.onLanguageChange));
    this.callBase("Tridion.Extensions.UI.FBI.BehaviourConfigurationBase", "onSchemaChanged");


};

Tridion.Extensions.UI.FBI.SchemaFieldSyntaxHighlight.prototype.onLanguageChange = function SchemaFieldSyntaxHighlight$onLanguageChange() {
    var p = this.properties;
    var c = p.controls;
    var language = c.fieldLanguageList.value;
    this.setLanguageValue(language);
};

Tridion.Extensions.UI.FBI.SchemaFieldSyntaxHighlight.prototype.onSelectionChange = function SchemaFieldSyntaxHighlight$onSelectionChange() {
    var p = this.properties;
    var c = p.controls;

    c.fieldValidatorList.disabled = false;
    var selectedGroups = $fbiConfig.getSelectedGroups();
    if (selectedGroups) {
        p.selectedGroup = selectedGroups[0];
    }
    var language = this.getConfigurationValue();
    language = (language != 'undefined') ? language : 'none';
    this.setLanguageValue(language);

};

Tridion.Extensions.UI.FBI.SchemaFieldSyntaxHighlight.prototype.onUpdateView = function SchemaFieldSyntaxHighlight$onUpdateView() {
    var p = this.properties;
    var c = p.controls;
    var schema = $fbiConfig.getSchema();
    c.fieldLanguageList.disabled = (schema && (schema.isReadOnly() || schema.isLocalized())) || false || !p.selectedGroup || !p.validationReady;

    if (p.selectedGroup) {
        var language = this.getSelection();
        validation = (validation != 'undefined') ? validation : 'none';
        this.setLanguageValue(validation);
    }
};

Tridion.Extensions.UI.FBI.SchemaFieldValidation.prototype.setLanguageValue = function SchemaFieldValidation$setLanguageValue(textToFind) {
    var c = this.properties.controls;
    var dd = c.fieldValidatorList;
    dd.selectedIndex = 0;
    for (var i = 0; i < dd.options.length; i++) {
        if (dd.options[i].value === textToFind) {
            dd.selectedIndex = i;
            break;
        }
    }
};

if ($fbiConfig.isEnabled()) {
    Tridion.Controls.Deck.registerInitializeExtender($fbiConst.SCHEMA_DESIGN_TAB, Tridion.Extensions.UI.FBI.SchemaFieldSyntaxHighlight);
    Tridion.Controls.Deck.registerInitializeExtender($fbiConst.METADATA_SCHEMA_DESIGN_TAB, Tridion.Extensions.UI.FBI.SchemaFieldSyntaxHighlight);
}


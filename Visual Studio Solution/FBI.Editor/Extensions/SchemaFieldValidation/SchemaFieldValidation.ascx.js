Type.registerNamespace("Tridion.Extensions.UI.FBI");

Tridion.Extensions.UI.FBI.SchemaFieldValidation = function SchemaFieldValidation()
{
	Tridion.OO.enableInterface(this, "Tridion.Extensions.UI.FBI.SchemaFieldValidation");
	this.key = "validation";
	this.addInterface("Tridion.DisposableObject");
    var p = this.properties;
    p.validationReady = false;
    p.controls = {};
    
    
};

Tridion.Extensions.UI.FBI.SchemaFieldValidation.prototype.initialize = function SchemaFieldValidation$initialize(deckPage) {
    console.debug("Tridion.Extensions.UI.FBI.SchemaFieldValidation.prototype.initialize");
    var p = this.properties;
    var c = p.controls;

    switch (deckPage) {
        case "SchemaDesignTab":
            c.fieldValidatorList = $("#SchemaDesignTab_SchemaDesignFieldDesigner_SchemaFieldBehaviour_SchemaFieldValidation_ValidationList");
            break;
        case "MetadataDesignTab":
            c.fieldValidatorList = $("#MetadataDesignTab_MetadataDesignFieldDesigner_MDSchemaFieldBehaviour_MDSchemaFieldValidation_ValidationList");
            break;
    }    
    if (c.fieldValidatorList) {
        c.fieldValidatorList.disabled = true;
    }

    Tridion.Extensions.FBI.Services.FBIServices.GetValidations(
        function (validations) {
            for (var i = 0; i < validations.length; i++) {
                var opt = c.fieldValidatorList.options;
                opt[opt.length] = new Option(validations[i].Name, validations[i].Type);
            }
            p.validationReady = true;
            var schema = $display.getItem();
            c.fieldValidatorList.disabled = (schema && (schema.isReadOnly() || schema.isLocalized())) || false || !p.validationReady || !p.selectedGroup;


        },
        function (error) {
            console.debug(error);
        }
    );

    $evt.addEventHandler($fbiConfig.getUsersAndGroupsList(), "selectionchange", Function.getDelegate(this, this.onSelectionChange));
    $evt.addEventHandler($fbiConfig.getFieldDeisgner(), "updateview", Function.getDelegate(this, this.onUpdateView));
    $evt.addEventHandler(c.fieldValidatorList, "change", Function.getDelegate(this, this.onValidationChange));
    this.onSchemaChanged();
};

Tridion.Extensions.UI.FBI.SchemaFieldValidation.prototype.onValidationChange = function SchemaFieldValidation$onValidationChange() {
    var p = this.properties;
    var c = p.controls;
    var validation = c.fieldValidatorList.value;
    this.setConfigurationValue(validation);
};

Tridion.Extensions.UI.FBI.SchemaFieldValidation.prototype.onSelectionChange = function SchemaFieldValidation$onSelectionChange() {
    console.debug("Tridion.Extensions.UI.FBI.SchemaFieldValidation.prototype.onSelectionChange");
    var p = this.properties;
    var c = p.controls;

    c.fieldValidatorList.disabled = false;
    var selectedGroups = $fbiConfig.getSelectedGroups();
    if (selectedGroups) {
        p.selectedGroup = selectedGroups[0];
    }
    var validation = this.getConfigurationValue();
    validation = (validation != 'undefined') ? validation : 'none';
    this.setValidation(validation);

};

Tridion.Extensions.UI.FBI.SchemaFieldValidation.prototype.onSchemaChanged = function SchemaFieldValidation$onSchemaChanged() {
    console.debug("Tridion.Extensions.UI.FBI.SchemaFieldValidation.prototype.onSchemaChanged");
    var c = this.properties.controls;
    var schema = $fbiConfig.getSchema();
    
    if (schema && (schema.getSubType() == $const.SchemaPurpose.TEMPLATE_PARAMETERS || schema.getSubType() == $const.SchemaPurpose.BUNDLE)) {
        $css.undisplay(c.fieldValidatorList.parentNode);
    }
    else {
        $css.display(c.fieldValidatorList.parentNode);
    }
};

Tridion.Extensions.UI.FBI.SchemaFieldValidation.prototype.onUpdateView = function SchemaFieldValidation$onUpdateView() {
    var p = this.properties;
    var c = p.controls;
    var schema = $fbiConfig.getSchema();
    c.fieldValidatorList.disabled = (schema && (schema.isReadOnly() || schema.isLocalized())) || false || !p.selectedGroup || !p.validationReady;
    

    if (p.selectedGroup) {
        var validation = this.getConfigurationValue();
        validation = (validation != 'undefined') ? validation : 'none';
        this.setValidation(validation);
    }
};


Tridion.Extensions.UI.FBI.SchemaFieldValidation.prototype.setValidation = function SchemaFieldValidation$setValidation(textToFind) {
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

Tridion.Extensions.UI.FBI.SchemaFieldValidation.prototype.getConfigurationValue = function SchemaFieldValidation$getConfigurationValue() {
    var p = this.properties;
    var value = $fbiConfig.getConfigurationHelper().getConfigurationValue(p.selectedGroup, this.key);
    return value;

};

Tridion.Extensions.UI.FBI.SchemaFieldValidation.prototype.setConfigurationValue = function SchemaFieldValidation$setConfigurationValue(value) {
    var p = this.properties;
    $fbiConfig.getConfigurationHelper().setConfigurationValue(p.selectedGroup, this.key, value);
    
};

Tridion.Controls.Deck.registerInitializeExtender("SchemaDesignTab", Tridion.Extensions.UI.FBI.SchemaFieldValidation);
Tridion.Controls.Deck.registerInitializeExtender("MetadataDesignTab", Tridion.Extensions.UI.FBI.SchemaFieldValidation);
Type.registerNamespace("Tridion.Extensions.UI.FBI");

Tridion.Extensions.UI.FBI.SchemaFieldValidation = function SchemaFieldValidation()
{
	Tridion.OO.enableInterface(this, "Tridion.Extensions.UI.FBI.SchemaFieldValidation");
	this.addInterface("Tridion.DisposableObject");
	var p = this.properties;
    p.validationReady = false
    var c = p.controls = {};
	c.fieldValidatorList;
	c.fieldDesigner;
    
    p.ns = "http://www.sdltridion.com/2011/FieldValidation";
};

Tridion.Extensions.UI.FBI.SchemaFieldValidation.prototype.initialize = function SchemaFieldValidation$initialize(deckPage) {
    var p = this.properties;
    var c = p.controls;
    var ns = Tridion.Constants.Namespaces;
    ns["fbi"] = p.ns;



    switch (deckPage) {
        case "SchemaDesignTab":
            c.fieldValidatorList = $("#SchemaDesignTab_SchemaDesignFieldDesigner_SchemaFieldValidation_ValidationList");            
            c.fieldDesigner = $controls.getControl($("#SchemaDesignFieldDesigner"), "Tridion.Controls.FieldDesigner");
            break;
        case "MetadataDesignTab":
            c.fieldValidatorList = $("#MetadataDesignTab_MetadataDesignFieldDesigner_metadata_SchemaFieldValidation_ValidationList");
            c.fieldDesigner = $controls.getControl($("#MetadataDesignFieldDesigner"), "Tridion.Controls.FieldDesigner");
            break;
    }    
    if (c.fieldValidatorList) {
        c.fieldValidatorList.disabled = true;
    }
    Tridion.Extensions.FBI.Services.FBIServices.GetValidations(
        function (validations) {
            for (var i = 0; i < validations.length; i++) {
                var opt = c.fieldValidatorList.options;
                opt[opt.length] = new Option(validations[i].Name, validations[i].Type)
            }
            p.validationReady = true;
            var schema = $display.getItem();

            c.fieldValidatorList.disabled = (schema && (schema.isReadOnly() || schema.isLocalized())) || false || !p.validationReady;


        },
        function (error) {
            console.debug(error);
        }
    );

    $evt.addEventHandler($display.getItem(), "change", Function.getDelegate(this, this.onSchemaChanged));
    $evt.addEventHandler(c.fieldValidatorList, "change", Function.getDelegate(this, this.onValidationChange));
    $evt.addEventHandler(c.fieldDesigner, "updateview", Function.getDelegate(this, this.onUpdateView));

    this.onSchemaChanged();
};

Tridion.Extensions.UI.FBI.SchemaFieldValidation.prototype.onSchemaChanged = function SchemaFieldValidation$onSchemaChanged() {
    var c = this.properties.controls;
    var schema = $display.getItem();
    
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
    var schema = $display.getItem();


    var fieldNode = c.fieldDesigner.getFieldXml();

    if (fieldNode) {
               
        var validation = $xml.getInnerText(fieldNode, '/tcm:*/tcm:ExtensionXml/fbi:configuration/fbi:field/fv:validation');
        validation = (validation != 'undefined') ? validation : 'none';
        this.setValidation(validation);
        c.fieldValidatorList.disabled = (schema && (schema.isReadOnly() || schema.isLocalized())) || false || !p.validationReady;

    }
};

Tridion.Extensions.UI.FBI.SchemaFieldValidation.prototype.onValidationChange = function SchemaFieldValidation$onSiteEditFieldCheckBoxToggle() {
    var p = this.properties;
    var c = p.controls;

    var fieldXml = c.fieldDesigner.getFieldXml();
    
    if (fieldXml) {
        var fieldDocument = fieldXml.ownerDocument;
        var extensionXmlElement = $xml.selectSingleNode(fieldXml, "tcm:ExtensionXml");
        if (!extensionXmlElement) {
            //no extension xml point available so we need to add it
            extensionXmlElement = $xml.createElementNS(fieldDocument, $const.Namespaces.tcm, "tcm:ExtensionXml");
            fieldXml.appendChild(extensionXmlElement);
        }
        
        // set the xml value to yes
        var configurationNode = $xml.selectSingleNode(extensionXmlElement, "fv:configuration");        
        if (!configurationNode) {
            configurationNode = $xml.createElementNS(fieldDocument, p.ns, "configuration");
            extensionXmlElement.appendChild(configurationNode);
        }
        $xml.setInnerXml(configurationNode, "<field xmlns=\"{0}\"><validation>{1}</validation></field>".format(p.ns, c.fieldValidatorList.value));        
        c.fieldDesigner.setFieldXml(fieldXml);
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

Tridion.Controls.Deck.registerInitializeExtender("SchemaDesignTab", Tridion.Extensions.UI.FBI.SchemaFieldValidation);
Tridion.Controls.Deck.registerInitializeExtender("MetadataDesignTab", Tridion.Extensions.UI.FBI.SchemaFieldValidation);
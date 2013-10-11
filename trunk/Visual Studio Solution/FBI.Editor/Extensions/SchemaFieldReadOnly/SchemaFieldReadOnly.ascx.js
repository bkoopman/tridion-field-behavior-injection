Type.registerNamespace("Tridion.Extensions.UI.FBI");

Tridion.Extensions.UI.FBI.SchemaFieldReadOnly = function SchemaFieldReadOnly()
{
	Tridion.OO.enableInterface(this, "Tridion.Extensions.UI.FBI.SchemaFieldReadOnly");
	this.addInterface("Tridion.DisposableObject");
	var p = this.properties;
    p.validationReady = false
    var c = p.controls = {};
	c.fieldValidatorList;
	c.fieldDesigner;
    
    p.ns = "http://www.sdltridion.com/2011/FieldValidation";
};

Tridion.Extensions.UI.FBI.SchemaFieldReadOnly.prototype.initialize = function SchemaFieldReadOnly$initialize(deckPage) {
    console.debug("Tridion.Extensions.UI.FBI.SchemaFieldReadOnly.initialize");
    var p = this.properties;
    var c = p.controls;
    
    switch (deckPage) {
        case "SchemaDesignTab":
            c.fieldReadOnlyCheckbox = $("#SchemaDesignTab_SchemaDesignFieldDesigner_SchemaFieldBehaviour_SchemaFieldReadOnly_checkbox");
            c.fieldDesigner = $controls.getControl($("#SchemaDesignFieldDesigner"), "Tridion.Controls.FieldDesigner");
            break;
        case "MetadataDesignTab":
            c.fieldReadOnlyCheckbox = $("#MetadataDesignTab_MetadataDesignFieldDesigner_metadata_SchemaFieldBehaviour_SchemaFieldReadOnly_checkbox");
            c.fieldDesigner = $controls.getControl($("#MetadataDesignFieldDesigner"), "Tridion.Controls.FieldDesigner");
            break;
    }
    /*c.fieldReadOnlyCheckbox.checked = "false";*/



};


Tridion.Controls.Deck.registerInitializeExtender("SchemaDesignTab", Tridion.Extensions.UI.FBI.SchemaFieldReadOnly);
Tridion.Controls.Deck.registerInitializeExtender("MetadataDesignTab", Tridion.Extensions.UI.FBI.SchemaFieldReadOnly);

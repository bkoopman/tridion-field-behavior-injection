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
};


Tridion.Controls.Deck.registerInitializeExtender("SchemaDesignTab", Tridion.Extensions.UI.FBI.SchemaFieldReadOnly);

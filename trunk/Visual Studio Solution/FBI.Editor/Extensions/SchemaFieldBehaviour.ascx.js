Type.registerNamespace("Tridion.Extensions.UI.FBI");

//###########################################################################################################
//Schema Field Behaviour
//###########################################################################################################
Tridion.Extensions.UI.FBI.SchemaFieldBehaviour = function SchemaFieldBehaviour() {
    Tridion.OO.enableInterface(this, "Tridion.Extensions.UI.FBI.SchemaFieldBehaviour");
    this.addInterface("Tridion.DisposableObject");
};

Tridion.Extensions.UI.FBI.SchemaFieldBehaviour.prototype.initialize = function SchemaFieldBehaviour$initialize(deckPage) {
    console.debug("Tridion.Extensions.UI.FBI.SchemaFieldBehaviour.prototype.initialize");
    //Extension Initialization    
    var ns = Tridion.Constants.Namespaces;
    ns[$fbiConst.NAMESPACE_PREFIX] = $fbiConst.NAMESPACE_URL;
    $fbiConfig.initializeGroups();
    $fbiConfig.getBehavioursPanel().close();
};

Tridion.Controls.Deck.registerInitializeExtender("SchemaDesignTab", Tridion.Extensions.UI.FBI.SchemaFieldBehaviour);
Tridion.Controls.Deck.registerInitializeExtender("MetadataDesignTab", Tridion.Extensions.UI.FBI.SchemaFieldBehaviour);
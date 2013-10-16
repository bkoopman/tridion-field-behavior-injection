Type.registerNamespace("Tridion.Extensions.UI.FBI");

//###########################################################################################################
//Schema Field Behaviour
//###########################################################################################################
Tridion.Extensions.UI.FBI.SchemaFieldBehaviour = function SchemaFieldBehaviour() {
    Tridion.OO.enableInterface(this, "Tridion.Extensions.UI.FBI.SchemaFieldBehaviour");
    this.addInterface("Tridion.DisposableObject");
};

Tridion.Extensions.UI.FBI.SchemaFieldBehaviour.prototype.initialize = function SchemaFieldBehaviour$initialize(deckPage) {
    //Extension Initialization    
    if ($fbiConfig.isEnabled()) {
        $fbiConfig.initialize();
        $fbiConfig.getBehavioursPanel().close();
    } else {
        $fbiConfig.hidePanel();
    }
};

Tridion.Controls.Deck.registerInitializeExtender("SchemaDesignTab", Tridion.Extensions.UI.FBI.SchemaFieldBehaviour);
Tridion.Controls.Deck.registerInitializeExtender("MetadataDesignTab", Tridion.Extensions.UI.FBI.SchemaFieldBehaviour);

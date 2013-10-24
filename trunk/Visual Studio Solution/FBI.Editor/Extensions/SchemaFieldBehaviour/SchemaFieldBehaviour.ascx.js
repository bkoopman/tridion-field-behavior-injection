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
    if ($fbiEditorConfig.isEnabled()) {
        $fbiConfig.initialize();
        $fbiConfig.getBehavioursPanel().close();
        var behaviours = $fbiEditorConfig.getAllBehaviours();
        for (var i = 0; i < behaviours.length; i++) {
            var behaviour = behaviours[behaviours[i]];
            if (behaviour.enabled && behaviour.areaHandler) {
                console.info("Registering extended area [{0}]".format(behaviour.name));
                Tridion.Controls.Deck.registerInitializeExtender($fbiConst.SCHEMA_DESIGN_TAB, eval(behaviour.areaHandler));
                Tridion.Controls.Deck.registerInitializeExtender($fbiConst.METADATA_SCHEMA_DESIGN_TAB, eval(behaviour.areaHandler));
            }
        }
    } else {
        $fbiConfig.hidePanel();
    }
};

Tridion.Controls.Deck.registerInitializeExtender($fbiConst.SCHEMA_DESIGN_TAB, Tridion.Extensions.UI.FBI.SchemaFieldBehaviour);
Tridion.Controls.Deck.registerInitializeExtender($fbiConst.METADATA_SCHEMA_DESIGN_TAB, Tridion.Extensions.UI.FBI.SchemaFieldBehaviour);

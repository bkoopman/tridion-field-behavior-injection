Type.registerNamespace("Tridion.Extensions.UI.FBI");

//###########################################################################################################
//Schema Field Behaviour
//###########################################################################################################
Tridion.Extensions.UI.FBI.SchemaFieldBehaviour = function SchemaFieldBehaviour() {
    Tridion.OO.enableInterface(this, "Tridion.Extensions.UI.FBI.SchemaFieldBehaviour");
    this.addInterface("Tridion.DisposableObject");
    var p = this.properties;
    p.counter = 0;
};

Tridion.Extensions.UI.FBI.SchemaFieldBehaviour.prototype.initialize = function SchemaFieldBehaviour$initialize(deckPage) {
    var p = this.properties;
    p.areas = [];
    //Extension Initialization    
    if ($fbiEditorConfig.isEnabled()) {
        $fbiConfig.initialize();
        $fbiConfig.getBehavioursPanel().close();
        var behaviours = $fbiEditorConfig.getEnabledBehaviours();
        for (var i = 0; i < behaviours.length; i++) {
            var behaviour = behaviours[i];
            console.info("Registering extended area [{0}]".format(behaviour.name));
            Tridion.Controls.Deck.registerInitializeExtender($fbiConst.SCHEMA_DESIGN_TAB, eval(behaviour.areaHandler));
            Tridion.Controls.Deck.registerInitializeExtender($fbiConst.METADATA_SCHEMA_DESIGN_TAB, eval(behaviour.areaHandler));
            var areas = Tridion.Controls.Deck._initializeExtenders[$fbiConfig.getTab()];
            
            if (areas) {
                var last = areas.length;
                if (last > 0) {
                    last--;
                    var area = areas[last];
                    var areaName = area.getTypeName();
                    if (areaName != behaviour.areaHandler) {
                        area = this.findExtendedArea(behaviour.areaHandler);
                    }
                    if (!(typeof area === "undefined")) {
                        p.areas[behaviour.areaHandler] = area;
                        p.areas.push(behaviour.areaHandler);
                        $evt.addEventHandler(area, "hide", Function.getDelegate(this, this.checkStatus));
                        $evt.addEventHandler(area, "show", Function.getDelegate(this, this.checkStatus));
                    }
                }
            }
        }
        
        if (behaviours.length == 0) {
            $fbiConfig.hidePanel();
        }
    } else {
        $fbiConfig.hidePanel();
    }
    //TODO: REMOVE WHEN IMPLEMENTATION IS DONE
    $fbiBehavoiursArea = this;
};
Tridion.Extensions.UI.FBI.SchemaFieldBehaviour.prototype.checkStatus = function SchemaFieldBehaviour$checkStatus(e) {
    var p = this.properties;
    var sp = e.source.properties ;
    if (e.name == "show") {
        p.counter++;
    } else {
        p.counter--;
    }
    
    if (p.counter == 0) {
        $fbiConfig.hidePanel();
    } else {
        $fbiConfig.showPanel();
    }
    //console.debug("Visible areas: " + p.counter);
};

Tridion.Extensions.UI.FBI.SchemaFieldBehaviour.prototype.findExtendedArea = function SchemaFieldBehaviour$findExtendedArea(areaHandler) {
    var areas = Tridion.Controls.Deck._initializeExtenders[$fbiConfig.getTab()];
    for (var i = 0; i < areas.length; i++) {
        if (areas[i].getTypeName() == areaHandler) {
            return areas[i];
        }
    }
    return undefined;
};

Tridion.Controls.Deck.registerInitializeExtender($fbiConst.SCHEMA_DESIGN_TAB, Tridion.Extensions.UI.FBI.SchemaFieldBehaviour);
Tridion.Controls.Deck.registerInitializeExtender($fbiConst.METADATA_SCHEMA_DESIGN_TAB, Tridion.Extensions.UI.FBI.SchemaFieldBehaviour);

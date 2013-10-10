Type.registerNamespace("Tridion.Extensions.UI.FBI.Tabs");
Tridion.Extensions.UI.FBI.Tabs.FBITab = function FBITab(element) {
    Tridion.OO.enableInterface(this, "Tridion.Extensions.UI.FBI.Tabs.FBITab");
    this.properties = {};
    this.properties.controls = {};
    this.properties.controls.tabControl = $controls.getControl($("#MasterTabControl"), "Tridion.Controls.TabControl");
    this.initialize();
    //Remove it when done
    $dom.removeNode($("#FBIComponentTab_switch"));
};




Tridion.Extensions.UI.FBI.Tabs.FBITab.prototype.initialize = function FBITab$initialize() {
    var p = this.properties;
    var c = p.controls;
    $fbi = new Tridion.Extensions.UI.FBI.Handler(c.tabControl);
    $fbi.initialize();
    
};


Tridion.Extensions.UI.FBI.Tabs.FBITab.prototype.select = function FBITab$select() {
    //Not needed
};

Tridion.Extensions.UI.FBI.Tabs.FBITab.prototype.updateView = function FBITab$updateView() {
    //Not needed
};

Tridion.Controls.Deck.registerPageType(Tridion.Extensions.UI.FBI.Tabs.FBITab, "FBIComponentTab");



//************************************************************************************************************
// FBI Handler
Type.registerNamespace("Tridion.Extensions.UI.FBI");
Tridion.Extensions.UI.FBI.Handler = function FBIHandler(tabControl) {
    Tridion.OO.enableInterface(this, "Tridion.Extensions.UI.FBI.Handler");
    this.properties = {};
    this.properties.controls =
    {
        tabControl: tabControl
    };

};

Tridion.Extensions.UI.FBI.Handler.prototype.initialize = function FBIHandler$initialize() {
    var p = this.properties;
    var c = p.controls;
    p.behaviourHandlers = [];
    
    //Load handlers from configuration
    var editor = $config.Editors[$fbiConst.EDITOR_NAME].configuration;
    
    if (editor) {
        var confXml = $xml.getNewXmlDocument(editor);
        var confObj = $xml.toJson(confXml);
        for (var i = 0; i < confObj.length; i++) {
            var handler = {};
            handler.name = confObj[i]["@name"];
            handler.handler = confObj[i]["@handler"];
            p.behaviourHandlers.push(handler);
        }
    }
    
    //Add Event Handlers
    var self = this;
    
    function FBIHandler$onFieldBuilderLoad(e) {
        var builder = e.source;
        self.applyBehaviours(builder.getId(),builder);
    }


    function FBIHandler$onDisplayReady() {
        $evt.removeEventHandler($display,"start", FBIHandler$onDisplayReady);
        var viewId = $display.getView().getId();
        switch (viewId) {
            //Component View
            case "ComponentView":
                //Schema
                self.properties.controls.schemaControl = $controls.getControl($("#Schema"), "Tridion.Controls.Dropdown");
                
                //Content Fields
                var fb = $display.getView().properties.controls.fieldBuilder;
                if (fb) {
                    $evt.addEventHandler(fb, "load", FBIHandler$onFieldBuilderLoad);
                }

                //Metadata Fieds
                if (c.tabControl.getPage("MetadataTab")) {
                    var tab = c.tabControl.getPage("MetadataTab");
                    var fbmd = tab.properties.controls.fieldBuilder;
                    $evt.addEventHandler(fbmd, "load", FBIHandler$onFieldBuilderLoad);
                }
            break;    
            default:
               
        }

        
        
    }

    //We have to wait until the display is ready
    $evt.addEventHandler($display, "start", FBIHandler$onDisplayReady);
    
    
};

Tridion.Extensions.UI.FBI.Handler.prototype.applyBehaviours = function FBIHandler$applyBehaviours(id, fieldBuilder) {    
    var p = this.properties;
    var c = p.controls;
    var schemaId = c.schemaControl.getValue();
    
    //2. Group Membership
    //3. User Name & Id
    //4. Fields Configuration
    var user = $models.getItem(Tridion.UI.UserSettings.getJsonUserSettings()["User"]["@ID"]);
    var fbiConfig = this.getFieldsConfiguration(schemaId);
        
    var arguments = {
        id : id,
        schemaId : schemaId,
        fieldBuilder: fieldBuilder,
        groups: user.getGroupMemberships(),
        user: user.getId(),
        config: fbiConfig
    };

    for (var i = 0; i < p.behaviourHandlers.length; i++) {
        var handlerDefinition = p.behaviourHandlers[i];
        try {
            var handlerImpl = new (Type.resolveNamespace(handlerDefinition.handler));
            handlerImpl.apply(arguments);
        } catch(e) {
            console.warn("Invalid Handler Implementation ["+handlerDefinition.name+"]: " + handlerDefinition.handler);
        }

    }
};

Tridion.Extensions.UI.FBI.Handler.prototype.getFieldsConfiguration = function FBIHandler$getFieldsConfiguration(schemaId) {
    
};




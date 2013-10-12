Type.registerNamespace("Tridion.Extensions.UI.FBI.Tabs");

Tridion.Extensions.UI.FBI.Tabs.FBITab = function FBITab(element) {
    Tridion.OO.enableInterface(this, "Tridion.Extensions.UI.FBI.Tabs.FBITab");
    this.properties = {};
    this.properties.controls = {};
    this.properties.controls.tabControl = $controls.getControl($("#MasterTabControl"), "Tridion.Controls.TabControl");
    this.initialize();
    //TODO: Remove it when done
    //$dom.removeNode($("#FBIComponentTab_switch"));
};


Tridion.Extensions.UI.FBI.Tabs.FBITab.prototype.initialize = function FBITab$initialize() {
    var p = this.properties;
    var c = p.controls;
    var tabControl = c.tabControl;
    $fbi = new Tridion.Extensions.UI.FBI.Handler(tabControl);
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
// Generic Handler
//************************************************************************************************************
Type.registerNamespace("Tridion.Extensions.UI.FBI");
Tridion.Extensions.UI.FBI.Handler = function FBIHandler(tabControl) {
    Tridion.OO.enableInterface(this, "Tridion.Extensions.UI.FBI.Handler");
    this.properties = {};
    this.properties.controls =
    {
        tabControl: tabControl
    };
    var p = this.properties;
    p.helper = new Tridion.Extensions.UI.FBI.SchemaFieldBehaviourHelper();

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
        var handler = {};
        if (confObj.length) { //IsArray
            for (var i = 0; i < confObj.length; i++) {
                handler = {};
                handler.name = confObj[i]["@name"];
                handler.handler = confObj[i]["@handler"];
                p.behaviourHandlers[handler.name] = handler;
                p.behaviourHandlers.push(handler.name);
            }
        } else {
            handler.name = confObj["behaviour"]["@name"];
            handler.handler = confObj["behaviour"]["@handler"];
            p.behaviourHandlers[handler.name] = handler;
            p.behaviourHandlers.push(handler.name);
        }
        
    }
    
    //Add Event Handlers
    var self = this;
    
    function FBIHandler$onFieldBuilderLoad(e) {
        var builder = e.source;
        $evt.removeEventHandler(builder, "load", FBIHandler$onFieldBuilderLoad);
        self.applyBehaviours(builder.getId(),builder);
    }
    
    function FBIHandler$onDisplayReady() {
        $evt.removeEventHandler($display, "start", FBIHandler$onDisplayReady);
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
                    //TODO: ADD THIS ONCE DATA FIELDS ARE DONE
                    //$evt.addEventHandler(fbmd, "load", FBIHandler$onFieldBuilderLoad);
                }
            break;    
            default:
               
        }
    }
    //We have to wait until the display is ready
    $evt.addEventHandler($display, "start", FBIHandler$onDisplayReady);
    
    
};

Tridion.Extensions.UI.FBI.Handler.prototype.getConfigurationHelper = function FBIHandler$getConfigurationHelper() {
    var p = this.properties;
    return p.helper;
};

Tridion.Extensions.UI.FBI.Handler.prototype.applyBehaviours = function FBIHandler$applyBehaviours(id, fieldBuilder) {
    var p = this.properties;
    var c = p.controls;
    var schemaId = c.schemaControl.getValue();
    
    var user = $models.getItem(Tridion.UI.UserSettings.getJsonUserSettings()["User"]["@ID"]);
    var self = this;
    var schema = $models.getItem(schemaId);
    
    function FBIHandler$onSchemaReady() {
        $evt.removeEventHandler(schema, "load", FBIHandler$onSchemaReady);
        var fbiConfig = self.getFieldsConfiguration(id, schema, user);
        
        //TODO: Consider Caching the configuration
        var parameters = {
            id: id,
            user: user,
            fieldBuilder: fieldBuilder,
            fieldName: "",
            fieldType: "",
            groupValues: []
        };
        


        if (fbiConfig.length && fbiConfig.length > 0) {

            //Iterate over relevant configured behaviours
            for (var i = 0; i < fbiConfig.length; i++) {
                var config = fbiConfig[i];
                //Iterate per field (You already are in the right context, i.e. Content vs. Metadata
                parameters.fieldName = config.fieldName;
                parameters.fieldType = config.fieldType;
                for (var j = 0; j < config.behavioursConfig.length; j++) {
                    var behaviourConfig = config.behavioursConfig[j];
                    var handlerDefinition = p.behaviourHandlers[behaviourConfig.behaviourName];
                    var handlerImpl = new (Type.resolveNamespace(handlerDefinition.handler));
                    parameters.groupValues = behaviourConfig.groupValues;
                    handlerImpl.apply(parameters);
                }
            }
        }
        
    }
    if (schema.isLoaded()) {
        $evt.removeEventHandler(schema, "load", FBIHandler$onSchemaReady);
        FBIHandler$onSchemaReady();
    } else {
        $evt.addEventHandler(schema, "start", FBIHandler$onSchemaReady);
        schema.load(true);
    }

};

Tridion.Extensions.UI.FBI.Handler.prototype.getFieldsConfiguration = function FBIHandler$getFieldsConfiguration(id, schema, user) {
    var p = this.properties;
    var fieldsDoc;
    
    switch (id) {
        case "SchemaBasedFields":
            fieldsDoc = $xml.getNewXmlDocument(schema.getFields());
            break;
        case "ItemMetadata":
            fieldsDoc = $xml.getNewXmlDocument(schema.getMetadataFields());
            break;
        default:
            return [];
            
    }

    
    var fields = $xml.selectNodes(fieldsDoc, "*/*");
    
    var fieldConfigurations = [];
    for (var j = 0; j < fields.length; j++) {
        var fieldConfig = {
            fieldType: fields[j].nodeName,
            fieldName: $xml.selectStringValue(fields[j], "tcm:Name"),
            behavioursConfig: []
        };
        $node = fields[j];
        for (var i = 0; i < p.behaviourHandlers.length; i++) {
            var handlerName = p.behaviourHandlers[i];
            var handler = p.behaviourHandlers[handlerName];
            var configValue = $fbi.getConfigurationHelper().hasConfigurationValueFromFieldXml(fields[j], handler.name, user);
            if (configValue && configValue.groupValues.length > 0) {
                fieldConfig.behavioursConfig.push(configValue);
            }
        }
        fieldConfigurations.push(fieldConfig);
    }
    
    return fieldConfigurations;
};


Tridion.Extensions.UI.FBI.Handler.prototype.getFieldElement = function FBIHandler$getFieldElement(fieldName, builder) {
    
};

Tridion.Extensions.UI.FBI.Handler.prototype._getPathTo = function FBIHandler$_getPathTo(element) {
    if (element.id !== ''){
        return "";
        //return 'id("' + element.id + '")';
    }
    if (element === document.body)
        return element.tagName;

    var ix = 0;
    var siblings = element.parentNode.childNodes;
    for (var i = 0; i < siblings.length; i++) {
        var sibling = siblings[i];
        if (sibling === element)
            return this._getPathTo(element.parentNode) + '/' + element.tagName + '[' + (ix + 1) + ']';
        if (sibling.nodeType === 1 && sibling.tagName === element.tagName)
            ix++;
    }
    return "";
};

Tridion.Extensions.UI.FBI.Handler.prototype.getFieldElement = function FBIHandler$getFieldElement(fieldType, fieldName, builder) {
    switch ((fieldType)) {
        case "tcm:SingleLineTextField":
            return builder.getField(fieldName).getElement().firstChild;        
        default:
            return null;
    }
};

Tridion.Extensions.UI.FBI.Handler.prototype.getFieldContainer = function FBIHandler$getFieldContainer(fieldType, fieldName, builder) {
    switch ((fieldType)) {
        case "tcm:SingleLineTextField":
            var element = builder.getField(fieldName).getElement();
            return element.parentElement;
        default:
            return null;
    }
};




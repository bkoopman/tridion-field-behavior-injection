/// <reference path="../Costants/FBIConstants.js" />
/// <reference path="../Helper/FBIHelper.js" />
Type.registerNamespace("Tridion.Extensions.UI.FBI");

Tridion.Extensions.UI.FBI.Handler = function FBIHandler(tabControl) {
    /// <summary>
    /// Handler class to deal with the behaviours configuration, and triggers them.
    /// Moreover, it exposes a Helper class based on <see cref="Tridion.Extensions.UI.FBI.SchemaFieldBehaviourHelper"/>
    /// </summary>
    Tridion.OO.enableInterface(this, "Tridion.Extensions.UI.FBI.Handler");
    this.properties = {};
    this.properties.controls =
    {
        tabControl: $controls.getControl($("#MasterTabControl"), "Tridion.Controls.TabControl")
    };
    var p = this.properties;
    p.helper = new Tridion.Extensions.UI.FBI.SchemaFieldBehaviourHelper();
    p.activeHandlers = [];
    p.deactivatedHandlers = [];
};

Tridion.Extensions.UI.FBI.Handler.prototype.initialize = function FBIHandler$initialize() {
    /// <summary>
    /// Initializes the handler by loading the configuration (i.e: configured handlers in the editor.config file)
    /// Moreover, it exposes a Helper class based on <see cref="Tridion.Extensions.UI.FBI.SchemaFieldBehaviourHelper"/>
    /// </summary>
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
                handler.enabled = confObj[i]["@enabled"];
                handler.fields = [];
                p.behaviourHandlers[handler.name] = handler;
                p.behaviourHandlers.push(handler.name);
            }
        } else {
            handler.name = confObj["behaviour"]["@name"];
            handler.handler = confObj["behaviour"]["@handler"];
            handler.handler = confObj["behaviour"]["@enabled"];
            handler.fields = [];
            p.behaviourHandlers[handler.name] = handler;
            p.behaviourHandlers.push(handler.name);
        }

    }

    //Add Event Handlers
    var self = this;

    function FBIHandler$onFieldBuilderLoad(e) {
        var builder = e.source;
        self.properties.currentBuilder = builder;
        self.applyBehaviours(builder.getId(), builder);
    }

    function FBIHandler$onDisplayReady() {
        $evt.removeEventHandler($display, "start", FBIHandler$onDisplayReady);
        var viewId = $display.getView().getId();
        switch (viewId) {
            //Component View
            case $fbiConst.COMPONENT_VIEW:
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
    /// <summary>Gets the Helper object.</summary>
    /// <returns type="string">The <see cref="Tridion.Extensions.UI.FBI.SchemaFieldBehaviourHelper"> object</see></returns>
    var p = this.properties;
    return p.helper;
};

Tridion.Extensions.UI.FBI.Handler.prototype.applyBehaviours = function FBIHandler$applyBehaviours(id, fieldBuilder) {
    /// <summary>Apply the behaviours.</summary>
    /// <param name="id">The behaviour id (unique key) [optional]</param>
    /// <param name="fieldBuilder">The field builder object <see cref="Tridion.Controls.FieldBuilder"/> [optional]</param>
    var p = this.properties;
    var c = p.controls;
    var schemaId = c.schemaControl.getValue();

    var user = $models.getItem(Tridion.UI.UserSettings.getJsonUserSettings()["User"]["@ID"]);
    var self = this;
    var schema = $models.getItem(schemaId);

    
    if (typeof id == "undefined") {
        id = this.getCurrentId();
    }

    if (typeof fieldBuilder === "undefined") {
        fieldBuilder = this.getCurrentFieldBuilder();
    }


    function FBIHandler$onUserReady() {
        $evt.removeEventHandler(user, "load", FBIHandler$onUserReady);
        
        self.loadFieldsConfiguration(id, schema, user);
        //TODO: Consider Caching the configuration

        var time = Date.getTimer();
        
        for (var i = 0; i < p.behaviourHandlers.length; i++) {
            var handlerId = p.behaviourHandlers[i];
            if (self._isHandlerActive(handlerId)) {
                var handlerDefinition = p.behaviourHandlers[handlerId];
                if (handlerDefinition.enabled == "true") {
                    var handlerImpl = handlerDefinition.instance;
                    if (typeof handlerImpl === "undefined") {
                        handlerImpl = new (Type.resolveNamespace(handlerDefinition.handler));
                        handlerDefinition.instance = handlerImpl;
                    }
                    if (p.activeHandlers.indexOf(handlerDefinition.name) < 0) {
                        p.activeHandlers.push[handlerDefinition.name];
                    }
                    self._activateHandler(handlerId);
                    handlerImpl.apply(handlerDefinition.fields);
                }
            }
        }
        
        $log.info("Tridion.Extensions.UI.FBI.Handler: Time taken to apply behaviours was {0}ms".format((Date.getTimer() - time)));
    }
    

    function FBIHandler$onSchemaReady() {
        $evt.removeEventHandler(schema, "load", FBIHandler$onSchemaReady);
        if (user.isLoaded()) {
            FBIHandler$onUserReady();
        } else {
            $evt.addEventHandler(user, "load", FBIHandler$onUserReady);
            user.load();
        }
    }

    if (schema.isLoaded()) {
        $evt.removeEventHandler(schema, "load", FBIHandler$onSchemaReady);
        FBIHandler$onSchemaReady();
    } else {
        $evt.addEventHandler(schema, "start", FBIHandler$onSchemaReady);
        schema.load(false);
    }

};

Tridion.Extensions.UI.FBI.Handler.prototype.ceaseBehaviours = function FBIHandler$ceaseBehaviours() {
    /// <summary>
    /// Ceases the behaviours.
    ///</summary>
    
    var p = this.properties;
    var c = p.controls;
    var builders = [];
    
    var viewId = $display.getView().getId();
    switch (viewId) {
        //Component View
        case "ComponentView":
            //Schema
            var fb = $display.getView().properties.controls.fieldBuilder;
            builders.push(fb);
            //Metadata Fieds
            if (c.tabControl.getPage("MetadataTab")) {
                var tab = c.tabControl.getPage("MetadataTab");
                var fbmd = tab.properties.controls.fieldBuilder;
                builders.push(fbmd);
            }
            break;
        default:
    }

    for (var j = 0; j < p.behaviourHandlers.length; j++) {
        var name = p.behaviourHandlers[j];
        var handlerDefinition = p.behaviourHandlers[name];
        var isDefined = !(typeof handlerDefinition.instance === "undefined");
        if (isDefined && handlerDefinition.enabled == "true") {
            handlerDefinition.instance.cease();
        }
    }
    

};

Tridion.Extensions.UI.FBI.Handler.prototype.loadFieldsConfiguration = function FBIHandler$loadFieldsConfiguration(id, schema, user) {
    /// <summary>Gets the relevant configuration based on the parameters.</summary>
    /// <param name="id">The behaviour id (unique key)</param>
    /// <param name="schema">The <see cref="Tridion.ContentManager.Schema"/> object </param>
    /// <param name="schema">The <see cref="Tridion.ContentManager.User"/> object </param>
    /// <returns type="custom"> 
    ///</returns>
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
            break;

    }


    var fields = $xml.selectNodes(fieldsDoc, "*/*");
    for (var j = 0; j < fields.length; j++) {
        
        var fieldType = $dom.getLocalName(fields[j]);
        var fieldName = $xml.selectStringValue(fields[j], "tcm:Name");
        var isMultivalue = ($xml.selectStringValue(fields[j], "tcm:MaxOccurs") != "1");
        
        for (var i = 0; i < p.behaviourHandlers.length; i++) {
            var handlerName = p.behaviourHandlers[i];
            var handler = p.behaviourHandlers[handlerName];
            
            if (handler.enabled == "true") {
                var configValue = $fbi.getConfigurationHelper().hasConfigurationValueFromFieldXml(fields[j], handler.name, user);
                if (configValue && configValue.length > 0) {
                    if (typeof handler.fields[fieldName]  === "undefined") {
                        handler.fields[fieldName] = [];
                    }
                    handler.fields.push(fieldName);
                    handler.fields[fieldName].fieldName = fieldName;
                    handler.fields[fieldName].fieldType = fieldType;
                    handler.fields[fieldName].isMultivalue = isMultivalue;
                    handler.fields[fieldName].values = configValue;
                }
            }
            
        }
        
    }
};

Tridion.Extensions.UI.FBI.Handler.prototype.reApplyBehaviours = function FBIHandler$reApplyBehaviours() {
    var p = this.properties;
    var fbProperties = p.currentBuilder.properties;
    fbProperties.toLoad = true;
    fbProperties.readOnly = false;
    p.currentBuilder.doLoad();
};

Tridion.Extensions.UI.FBI.Handler.prototype.getHandlers = function FBIHandler$getHandlers() {
    return this.properties.behaviourHandlers;
};

Tridion.Extensions.UI.FBI.Handler.prototype.getHandler = function FBIHandler$getHandler(name) {
    return this.properties.behaviourHandlers[name];
};

Tridion.Extensions.UI.FBI.Handler.prototype.getCurrentId = function FBIHandler$getCurrentId() {
    return this.getCurrentFieldBuilder().getId();
};

Tridion.Extensions.UI.FBI.Handler.prototype.getField = function FBIHandler$getField(name) {
    return this.getCurrentFieldBuilder().getField(name);
};

Tridion.Extensions.UI.FBI.Handler.prototype.getCurrentFieldBuilder = function FBIHandler$getCurrentFieldBuilder() {
    var p = this.properties;
    return p.currentBuilder;
};

Tridion.Extensions.UI.FBI.Handler.prototype._activateHandler = function FBIHandler$_activateHandler(key) {
    var p = this.properties;
    var index = p.activeHandlers.indexOf(key);
    if (index < 0) {
        p.activeHandlers.push(key);
    }
};

Tridion.Extensions.UI.FBI.Handler.prototype._isHandlerActive = function FBIHandler$_isHandlerActive(key) {
    var p = this.properties;
    if (p.deactivatedHandlers.length == 0) {
        return true;
    } else {
        return (p.deactivatedHandlers.indexOf(key) < 0);
    }
    
};

Tridion.Extensions.UI.FBI.Handler.prototype.disableActiveHandlers = function FBIHandler$disableActiveHandlers() {
    var p = this.properties;
    p.deactivatedHandlers = [].concat(p.activeHandlers);
    $log.info("Tridion.Extensions.UI.FBI.Handler: Behaviours successfully disabled.");
};

Tridion.Extensions.UI.FBI.Handler.prototype.enableActiveHandlers = function FBIHandler$enableActiveHandlers() {
    var p = this.properties;
    p.deactivatedHandlers = [];
    $log.info("Tridion.Extensions.UI.FBI.Handler: Behaviours successfully enabled.");
};

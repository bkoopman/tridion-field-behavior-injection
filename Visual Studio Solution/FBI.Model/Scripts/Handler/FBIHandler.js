/// <reference path="../Costants/FBIConstants.js" />
/// <reference path="../Helper/FBIHelper.js" />
Type.registerNamespace("Tridion.Extensions.UI.FBI");

Tridion.Extensions.UI.FBI.Handler = function FBIHandler() {
    /// <summary>
    /// Handler class to deal with the behaviours configuration, and triggers them.
    /// Moreover, it exposes a Helper class based on <see cref="Tridion.Extensions.UI.FBI.SchemaFieldBehaviourHelper"/>
    /// </summary>
    Tridion.OO.enableInterface(this, "Tridion.Extensions.UI.FBI.Handler");
    this.addInterface("Tridion.DisposableObject");
    
    this.properties = {};
    var p = this.properties;
    p.helper = new Tridion.Extensions.UI.FBI.SchemaFieldBehaviourHelper();
    p.builders = {};
    p.activeHandlers = [];
    p.deactivatedHandlers = [];
    p.behaviourHandlers = [];
    p.controls = {};
};

Tridion.Extensions.UI.FBI.Handler.prototype.initialize = function FBIHandler$initialize() {
    /// <summary>
    /// Initializes the handler by loading the configuration (i.e: configured handlers in the editor.config file)
    /// Moreover, it exposes a Helper class based on <see cref="Tridion.Extensions.UI.FBI.SchemaFieldBehaviourHelper"/>
    /// </summary>
    var p = this.properties;
    var c = p.controls;
    
    c.tabControl = $controls.getControl($("#MasterTabControl"), "Tridion.Controls.TabControl");
    
    //Load handlers from configuration
    var editor = $config.Editors[$fbiConst.EDITOR_NAME].configuration;
    if (editor) {
        var confXml = $xml.getNewXmlDocument(editor);
        var confObj = $xml.toJson(confXml);
        var handler = {};
        if (!confObj.length) { 
            confObj = [].concat(confObj);
        }
        for (var i = 0; i < confObj.length; i++) {
            if (confObj[i][$fbiConst.BEHAVIOUR_NODE_NAME]) {
                var behaviourConf = confObj[i][$fbiConst.BEHAVIOUR_NODE_NAME];
                if (!behaviourConf.length) {
                    behaviourConf = [].concat(behaviourConf);
                }
                for (var j = 0; j < behaviourConf.length; j++) {
                    handler = {};
                    handler.name = behaviourConf[j]["@name"];
                    handler.handler = behaviourConf[j]["@handler"];
                    handler.enabled = (behaviourConf[j]["@enabled"] == "true"); 
                    handler[$fbiConst.CONTENT] = {};
                    handler[$fbiConst.CONTENT].fields = [];
                    handler[$fbiConst.METADATA] = {};
                    handler[$fbiConst.METADATA].fields = [];
                    p.behaviourHandlers[handler.name] = handler;
                    p.behaviourHandlers.push(handler.name);
                }
            }
            
            break;
        }
    }

    //Add Event Handlers
    var self = this;

    function FBIHandler$onFieldBuilderLoad(e) {
        var builder = e.source;
        var id = builder.getId()
        var context = self.getContext(id);
        self.properties.currentBuilder = builder;
        self.applyBehaviours(id, builder, context);
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
                    self.properties.builders[$fbiConst.CONTENT] = fb;
                    $evt.addEventHandler(fb, "load", FBIHandler$onFieldBuilderLoad);
                }
                //Metadata Fieds
                if (c.tabControl.getPage("MetadataTab")) {
                    var tab = c.tabControl.getPage("MetadataTab");
                    var fbmd = tab.properties.controls.fieldBuilder;
                    if (fbmd) {
                        self.properties.builders[$fbiConst.METADATA] = fbmd;
                        //$evt.addEventHandler(fbmd, "load", FBIHandler$onFieldBuilderLoad);
                    }
                }
                break;
            default:
        }
    }
    //We have to wait until the display is ready
    $evt.addEventHandler($display, "start", FBIHandler$onDisplayReady);
};

Tridion.Extensions.UI.FBI.Handler.prototype.registerHandler = function FBIHandler$resgisterHandler(name, type, enabled) {
    var p = this.properties;
    var handler = {};
    handler.name = name;
    handler.handler = type;
    handler.enabled = enabled;
    handler[$fbiConst.CONTENT] = {};
    handler[$fbiConst.CONTENT].fields = [];
    handler[$fbiConst.METADATA] = {};
    handler[$fbiConst.METADATA].fields = [];
    p.behaviourHandlers[handler.name] = handler;
    p.behaviourHandlers.push(handler.name);
    $log.message("Handler: {0} [{1}] [{2}] registered.".format(name, type, enabled));
};

Tridion.Extensions.UI.FBI.Handler.prototype.getConfigurationHelper = function FBIHandler$getConfigurationHelper() {
    /// <summary>Gets the Helper object.</summary>
    /// <returns type="string">The <see cref="Tridion.Extensions.UI.FBI.SchemaFieldBehaviourHelper"> object</see></returns>
    var p = this.properties;
    return p.helper;
};

Tridion.Extensions.UI.FBI.Handler.prototype.applyBehaviours = function FBIHandler$applyBehaviours(id) {
    /// <summary>Apply the behaviours.</summary>
    /// <param name="id">The behaviour id (unique key) [optional]</param>
    /// <param name="fieldBuilder">The field builder object <see cref="Tridion.Controls.FieldBuilder"/> [optional]</param>
    var p = this.properties;
    var c = p.controls;
    var schemaId = c.schemaControl.getValue();

    var user = $models.getItem(Tridion.UI.UserSettings.getJsonUserSettings()["User"]["@ID"]);
    var self = this;
    var schema = $models.getItem(schemaId);
    var context = self.getContext(id);
    
    function FBIHandler$onUserReady() {
        $evt.removeEventHandler(user, "load", FBIHandler$onUserReady);
        self.loadFieldsConfiguration(id, schema, user);

        var time = Date.getTimer();
        for (var i = 0; i < p.behaviourHandlers.length; i++) {
            var handlerId = p.behaviourHandlers[i];
            if (self._isHandlerActive(handlerId)) {
                var handlerDefinition = p.behaviourHandlers[handlerId];
                if (handlerDefinition.enabled) {
                    var handlerImpl = handlerDefinition.instance;
                    if (typeof handlerImpl === "undefined") {
                        handlerImpl = new (Type.resolveNamespace(handlerDefinition.handler));
                        handlerDefinition.instance = handlerImpl;
                    }
                    if (p.activeHandlers.indexOf(handlerDefinition.name) < 0) {
                        p.activeHandlers.push[handlerDefinition.name];
                    }
                    self._activateHandler(handlerId);
                    /*console.debug("Context: " + context);
                    console.debug("Applying handler [{0}] in context [{1}] with fields:".format(handlerDefinition.name, context));
                    console.debug(handlerDefinition[context].fields);*/
                    handlerImpl.apply(context, handlerDefinition[context].fields);
                }
            }
        }
        
        $log.info("Tridion.Extensions.UI.FBI.Handler: Time taken to apply behaviours on [{0}] was {1}ms".format(context, (Date.getTimer() - time)));
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
        FBIHandler$onSchemaReady();
    } else {
        $evt.addEventHandler(schema, "load", FBIHandler$onSchemaReady);
        schema.load(false, $const.OpenMode.VIEW, true);
    }

};

Tridion.Extensions.UI.FBI.Handler.prototype.getContext = function FBIHandler$getContext(id) {
    switch (id) {
        case $fbiConst.CONTENT_FIELD_DESIGNER_ID:
            return $fbiConst.CONTENT;
        case $fbiConst.METADATA_FIELD_DESIGNER_ID:
            return $fbiConst.METADATA;
        default:
            return $fbiConst.CONTENT;
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
        case $fbiConst.COMPONENT_VIEW:
            //Schema
            var fb = $display.getView().properties.controls.fieldBuilder;
            builders.push(fb);
            //Metadata Fieds
            if (c.tabControl.getPage($fbiConst.METADATA_TAB_ID)) {
                var tab = c.tabControl.getPage($fbiConst.METADATA_TAB_ID);
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
        if (isDefined && handlerDefinition.enabled) {
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
    var context = "";
    switch (id) {
        case $fbiConst.CONTENT_FIELD_DESIGNER_ID:
            context = $fbiConst.CONTENT;
            fieldsDoc = $xml.getNewXmlDocument(schema.getFields());
            break;
        case $fbiConst.METADATA_FIELD_DESIGNER_ID:
            context = $fbiConst.METADATA;
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
            
            if (handler.enabled) {
                var configValue = $fbi.getConfigurationHelper().hasConfigurationValueFromFieldXml(fields[j], handler.name, user);
                
                if (configValue && configValue.length > 0) {
                    if (typeof handler[context] === "undefined") {
                        handler[context] = [];
                    }
                    var target = handler[context];
                    if (typeof target.fields[fieldName] === "undefined") {
                        target.fields[fieldName] = [];
                    }
                    target.fields.push(fieldName);
                    target.fields[fieldName].fieldName = fieldName;
                    target.fields[fieldName].fieldType = fieldType;
                    target.fields[fieldName].isMultivalue = isMultivalue;
                    target.fields[fieldName].values = configValue;
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
    //TODO: APPLY TO EVERY BUILDER
    //p.currentBuilder.doLoad();
};

Tridion.Extensions.UI.FBI.Handler.prototype.getHandlers = function FBIHandler$getHandlers() {
    return this.properties.behaviourHandlers;
};

Tridion.Extensions.UI.FBI.Handler.prototype.getHandler = function FBIHandler$getHandler(name) {
    return this.properties.behaviourHandlers[name];
};

Tridion.Extensions.UI.FBI.Handler.prototype.getField = function FBIHandler$getField(context, name) {
    return this.getFieldBuilderByContext(context).getField(name);
};

Tridion.Extensions.UI.FBI.Handler.prototype.getFieldBuilderByContext = function FBIHandler$getFieldBuilderByContext(context) {
    var p = this.properties;
    return p.builders[context];

};

Tridion.Extensions.UI.FBI.Handler.prototype.getFieldBuilderByTabId = function FBIHandler$getFieldBuilderByTabId(tabId) {
    var context = this.getContext(tabId);
    return this.getFieldBuilderByContext(context);


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

$fbi = new Tridion.Extensions.UI.FBI.Handler();
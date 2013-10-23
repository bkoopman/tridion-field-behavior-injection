/// <reference path="../Costants/FBIConstants.js" />
Type.registerNamespace("Tridion.Extensions.UI.FBI");

Tridion.Extensions.UI.FBI.BehaviourConfigurationBase = function BehaviourConfigurationBase() {
    /// <summary>
    /// Behaviour Base to be used as the base class for all extended areas behaviours (ascx code behind). It contains useful methods for the behaviour manipulation
    /// </summary>
    Tridion.OO.enableInterface(this, "Tridion.Extensions.UI.FBI.BehaviourConfigurationBase");
    this.addInterface("Tridion.DisposableObject");
    this.key = "";
};

Tridion.Extensions.UI.FBI.BehaviourConfigurationBase.prototype.initialize = function BehaviourConfigurationBase$initialize(deckPage) {
};

Tridion.Extensions.UI.FBI.BehaviourConfigurationBase.prototype.setKey = function BehaviourConfigurationBase$setKey(key) {
    console.info("Registering extended area [{0}]".format(key));
    /// <summary>
    /// Sets the behaviour key
    /// </summary>
    this.key = key;
};

Tridion.Extensions.UI.FBI.BehaviourConfigurationBase.prototype.setAreaId = function BehaviourConfigurationBase$setAreaId(areaId) {
    /// <summary>
    /// Sets the behaviour areaId
    /// </summary>
    this.areaId = areaId;
};

Tridion.Extensions.UI.FBI.BehaviourConfigurationBase.prototype.getConfigurationValue = function BehaviourConfigurationBase$getConfigurationValue() {
    /// <summary>
    /// Gets the configuration value
    /// <returns type="string">The value</returns>
    /// </summary>
    var p = this.properties;
    var value = $fbiConfig.getConfigurationHelper().getConfigurationValue(p.selectedGroup, this.key);
    return value;

};

Tridion.Extensions.UI.FBI.BehaviourConfigurationBase.prototype.setConfigurationValue = function BehaviourConfigurationBase$setConfigurationValue(value) {
    /// <summary>
    /// Sets the configuration value
    /// <param name="value">The value</param>
    /// </summary>
    var p = this.properties;
    var groupSelected = !(typeof p.selectedGroup === "undefined");
    if(groupSelected){
        $fbiConfig.getConfigurationHelper().setConfigurationValue(p.selectedGroup, this.key, value);
    }
};

Tridion.Extensions.UI.FBI.BehaviourConfigurationBase.prototype.onSchemaChanged = function BehaviourConfigurationBase$onSchemaChanged() {
    var schema = $fbiConfig.getSchema();
    if (schema && (schema.getSubType() == $const.SchemaPurpose.TEMPLATE_PARAMETERS || schema.getSubType() == $const.SchemaPurpose.BUNDLE)) {
        $css.undisplay($fbiConfig.getBehavioursPanel().getElement());
    }
    else {
        $css.display($fbiConfig.getBehavioursPanel().getElement());
    }
};

Tridion.Extensions.UI.FBI.BehaviourConfigurationBase.prototype.initTimer = function BehaviourConfigurationBase$iniTimer() {
    var p = this.properties;
    p.timer = Date.getTimer();
};

Tridion.Extensions.UI.FBI.BehaviourConfigurationBase.prototype.isAllowedField = function BehaviourConfigurationBase$isAllowedField() {
    
    var fieldType = $dom.getLocalName($fbiConfig.getFieldDeisgner().getFieldXml());
    console.debug(fieldType);
    var fieldValue = $fbiEditorConfig[fieldType];
    var behaviourConfig = $fbiEditorConfig.getBehaviourConfig(this.key);
    //Binary AND
    var allowed = fieldValue & behaviourConfig.allowedTypes;
    if (!allowed) {
        this.hide();
    }
    return allowed;
   
};

Tridion.Extensions.UI.FBI.BehaviourConfigurationBase.prototype.hide = function BehaviourConfigurationBase$hide() {
    var prefix = "";
    
    
    if($fbiConfig.getTab() == $fbiConst.METADATA_SCHEMA_DESIGN_TAB) {
        prefix = $fbiConfig.METADATA_PREFIX;
    };
    
    var selector = "#" + prefix + this.areaId;
    $css.undisplay($(selector));
};

Tridion.Extensions.UI.FBI.BehaviourConfigurationBase.prototype.logElapsedTime = function BehaviourConfigurationBase$logElapsedTime() {
    var p = this.properties;
    $log.info("{0}::: Time taken to initialize was {1}ms".format(this.getTypeName(), (Date.getTimer() - p.timer)));
};
/// <reference path="../Costants/FBIConstants.js" />
Type.registerNamespace("Tridion.Extensions.UI.FBI");

Tridion.Extensions.UI.FBI.BehaviourConfigurationBase = function BehaviourConfigurationBase() {
    /// <summary>
    /// Behaviour Base to be used as the base class for all extended areas behaviours (ascx code behind). It contains useful methods for the behaviour manipulation
    /// </summary>
    Tridion.OO.enableInterface(this, "Tridion.Extensions.UI.FBI.BehaviourConfigurationBase");
    this.addInterface("Tridion.DisposableObject");
    

};

Tridion.Extensions.UI.FBI.BehaviourConfigurationBase.prototype.initialize = function BehaviourConfigurationBase$initialize(deckPage, key, areaId) {
    this.setKey(key);
    this.setAreaId(areaId);
    var p = this.properties;
    var prefix = "";
    if ($fbiConfig.getTab() == $fbiConst.METADATA_SCHEMA_DESIGN_TAB) {
        prefix = $fbiConfig.METADATA_PREFIX;
    };
    p.element = $("#{0}{1}".format(prefix, areaId));
    p.fbiWrapperElement = $("div.fbi_feature_wrapper", p.element);

};

Tridion.Extensions.UI.FBI.BehaviourConfigurationBase.prototype.setKey = function BehaviourConfigurationBase$setKey(key) {
    /// <summary>
    /// Sets the behaviour key
    /// </summary>
    this.key = key;
};

Tridion.Extensions.UI.FBI.BehaviourConfigurationBase.prototype.setAreaId = function BehaviourConfigurationBase$setAreaId(areaId) {
    console.info("Registering extended area [{0}] - [{1}]".format(this.key, areaId));
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

    return true;
};

Tridion.Extensions.UI.FBI.BehaviourConfigurationBase.prototype.getElement = function BehaviourConfigurationBase$getElement() {
    var p = this.properties;
    return p.element;
};

Tridion.Extensions.UI.FBI.BehaviourConfigurationBase.prototype.getWrapperElement = function BehaviourConfigurationBase$getWrapperElement() {
    var p = this.properties;
    return p.element.firstChild;
};

Tridion.Extensions.UI.FBI.BehaviourConfigurationBase.prototype.display = function BehaviourConfigurationBase$display(display) {
    var p = this.properties;
    
    
    
    var fieldType = $fbiConfig.getConfigurationHelper().getFieldType();

    if (fieldType == $fbiConst.SINGLE_LINE_TEXT_FIELD) {
        var fieldName = $xml.selectStringValue($fbiConfig.getFieldDeisgner().getFieldXml(), "tcm:Name");
        var schemaXml = $xml.getNewXmlDocument($fbiConfig.getSchema().getXml());
        var xpath = "//xsd:element[@name='{0}']//xsd:element[@name='{1}']";
        

    }


    



    console.debug($xml.selectSingleNode(schemaXml, "//xsd:element[@name='" + fieldName + "']"));
    $ifc = $fbiConfig.getFieldDeisgner().properties.controls.inputFieldControl;
    console.debug("[{0}] [{1}] Display: {2} [{3}]".format(this.key, fieldName, display, fieldType));
    var ns = $const.Namespaces;
    
    if (display) {
        $css.display(p.element);
        $css.display(p.fbiWrapperElement);
    } else {
        $css.undisplay(p.element);
        $css.undisplay(p.fbiWrapperElement);
    }
};

Tridion.Extensions.UI.FBI.BehaviourConfigurationBase.prototype.logElapsedTime = function BehaviourConfigurationBase$logElapsedTime() {
    var p = this.properties;
    $log.info("{0}::: Time taken to initialize was {1}ms".format(this.getTypeName(), (Date.getTimer() - p.timer)));
};
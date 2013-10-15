/// <reference path="../../../FBI.Model/Scripts/Costants/FBIConstants.js" />
Type.registerNamespace("Tridion.Extensions.UI.FBI.Behaviours");
Tridion.Extensions.UI.FBI.Behaviours.ValidationBehaviour = function ValidationBehaviour() {
    Tridion.OO.enableInterface(this, "Tridion.Extensions.UI.FBI.Behaviours.ValidationBehaviour");
    this.addInterface("Tridion.DisposableObject");
    this.addInterface("Tridion.Extensions.UI.FBI.BehaviourBase");
    this.callBase("Tridion.Extensions.UI.FBI.BehaviourBase", "setKey", [$fbiConst.VALIDATION]);
};

Tridion.Extensions.UI.FBI.Behaviours.ValidationBehaviour.prototype.apply = function ValidationBehaviour$apply(fields) {
    for (var i = 0; i < fields.length; i++) {
        var field = fields[fields[i]];
        var fieldName = field.fieldName;
        var fieldType = field.fieldType;
        
        switch (fieldType) {
            case $fbiConst.SINGLE_LINE_TEXT_FIELD:
                var validationRule = this.getValidationRule(field.values);
                console.debug(validationRule);
                this.setValidationRule(field, validationRule);
                break;
            case $fbiConst.MULTILINE_TEXT_FIELD:
            case $fbiConst.XHTML_FIELD:
            case $fbiConst.KEYWORD_FIELD:
            case $fbiConst.NUMBER_FIELD:
            case $fbiConst.DATE_FIELD:
            case $fbiConst.EXTERNAL_LINK_FIELD:
            case $fbiConst.COMPONENT_LINK_FIELD:
            case $fbiConst.MULTIMEDIA_LINK_FIELD:
            case $fbiConst.EMBEDDED_FIELD:
                console.warn("Field [" + fieldName + "] Behaviour [" + this.getTypeName() + "] not implemented for field type: [" + fieldType + "]");
                break;
                
            default:
                console.warn("Field [" + fieldName + "] Behaviour [" + this.getTypeName() + "] not implemented for field type: [" + fieldType +"]");
        }
        
    }
};

Tridion.Extensions.UI.FBI.Behaviours.ValidationBehaviour.prototype.getValidationRule = function ValidationBehaviour$getValidationRule(values) {
    return values[0];
};

Tridion.Extensions.UI.FBI.Behaviours.ValidationBehaviour.prototype.setValidationRule = function ValidationBehaviour$setValidationRule(field, validationRule) {
    var f = this.getField(field.fieldName);
    $evt.addEventHandler(f, "blur", Function.getDelegate(this, this.validateRule, [f, validationRule]));
    //change
    
};
Tridion.Extensions.UI.FBI.Behaviours.ValidationBehaviour.prototype.validateRule = function ValidationBehaviour$validateRule(field, validationRule) {
    var values = field.getValues();
    for (var i = 0; i < values.length; i++) {
        var value = values[i];
        console.debug("Validate {0} with {1}".format(value, validationRule));
    }
};
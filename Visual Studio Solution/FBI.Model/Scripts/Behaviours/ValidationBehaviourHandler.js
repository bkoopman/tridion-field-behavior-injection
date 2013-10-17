/// <reference path="../../../FBI.Model/Scripts/Costants/FBIConstants.js" />
Type.registerNamespace("Tridion.Extensions.UI.FBI.Behaviours");
Tridion.Extensions.UI.FBI.Behaviours.ValidationBehaviour = function ValidationBehaviour() {
    Tridion.OO.enableInterface(this, "Tridion.Extensions.UI.FBI.Behaviours.ValidationBehaviour");
    this.addInterface("Tridion.Extensions.UI.FBI.BehaviourBase");
    this.callBase("Tridion.Extensions.UI.FBI.BehaviourBase", "setKey", [$fbiConst.VALIDATION]);
};

Tridion.Extensions.UI.FBI.Behaviours.ValidationBehaviour.prototype.apply = function ValidationBehaviour$apply(context, fields) {
    for (var i = 0; i < fields.length; i++) {
        var field = fields[fields[i]];
        var fieldName = field.fieldName;
        var fieldType = field.fieldType;
        
        switch (fieldType) {
            case $fbiConst.SINGLE_LINE_TEXT_FIELD:
                var typeOfValidation = this.getValidationType(field.values);
                this.setValidationType(context, field, typeOfValidation);
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

Tridion.Extensions.UI.FBI.Behaviours.ValidationBehaviour.prototype.getValidationType = function ValidationBehaviour$getValidationType(values) {
    return values[0].value;
};

Tridion.Extensions.UI.FBI.Behaviours.ValidationBehaviour.prototype.setValidationType = function ValidationBehaviour$setValidationType(context, field, type) {
    var f = this.getField(context, field.fieldName);
    $evt.addEventHandler(f, "blur", Function.getDelegate(this, this.validateRule, [f, type]));
};
Tridion.Extensions.UI.FBI.Behaviours.ValidationBehaviour.prototype.validateRule = function ValidationBehaviour$validateRule(field, type) {
    var values = field.getValues();
    if (typeof values === "undefined" || values == null) {
        return;
    }
    for (var i = 0; i < values.length; i++) {
        var value = values[i];
        var result = $fbiValidationConfig.checkRule(type, value);
        if (!result.Success) {
            $messages.registerWarning(result.Message.format(field.getFieldName(), result.ValidationName));
            field.getElement().style["background-color"] = "#FBE3E4";
            field.focus(i);
            return;
        }
    }
};
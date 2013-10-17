/// <reference path="../../../FBI.Model/Scripts/Costants/FBIConstants.js" />
Type.registerNamespace("Tridion.Extensions.UI.FBI.Behaviours");
Tridion.Extensions.UI.FBI.Behaviours.MaxLengthBehaviour = function MaxLengthBehaviour() {
    Tridion.OO.enableInterface(this, "Tridion.Extensions.UI.FBI.Behaviours.MaxLengthBehaviour");
    this.addInterface("Tridion.Extensions.UI.FBI.BehaviourBase");
    this.callBase("Tridion.Extensions.UI.FBI.BehaviourBase", "setKey", [$fbiConst.MAXLENGTH]);
};

Tridion.Extensions.UI.FBI.Behaviours.MaxLengthBehaviour.prototype.apply = function MaxLengthBehaviour$apply(context, fields) {
    for (var i = 0; i < fields.length; i++) {
        var field = fields[fields[i]];
        var fieldName = field.fieldName;
        var fieldType = field.fieldType;
        
        switch (fieldType) {
            case $fbiConst.SINGLE_LINE_TEXT_FIELD:
                var length = this.getMaxLength(field.values);
                this.setMaxLengthValidation(context, field, length);
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

Tridion.Extensions.UI.FBI.Behaviours.MaxLengthBehaviour.prototype.getMaxLength = function MaxLengthBehaviour$getMaxLength(values) {
    return values[0].value;
};

Tridion.Extensions.UI.FBI.Behaviours.MaxLengthBehaviour.prototype.setMaxLengthValidation = function MaxLengthBehaviour$setMaxLengthValidation(context, field, length) {
    var f = this.getField(context, field.fieldName);
    $evt.addEventHandler(f, "change", Function.getDelegate(this, this.validateRule, [f, length]));
    $evt.addEventHandler(f, "blur", Function.getDelegate(this, this.validateRule, [f, length]));
};

Tridion.Extensions.UI.FBI.Behaviours.MaxLengthBehaviour.prototype.validateRule = function MaxLengthBehaviour$validateRule(field, length) {
    var values = field.getValues();
    if (typeof values === "undefined" || values == null) {
        return;
    }
    for (var i = 0; i < values.length; i++) {
        var value = values[i];
        if (typeof value === "undefined" || value == null) {
            continue;
        }
        if (value.length > length) {
            $messages.registerWarning($fbiConfig.getLabel("MaximumLengthError").format(field.getFieldName(), $fbiConfig.getLabel("MaxLengthLabel") + "[" + length + "]"));
            field.focus(i);
            return;
        }
    }
};
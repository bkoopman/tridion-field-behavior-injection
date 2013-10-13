/// <reference path="../../../FBI.Model/Scripts/Costants/FBIConstants.js" />
Type.registerNamespace("Tridion.Extensions.UI.FBI.Behaviours");
Tridion.Extensions.UI.FBI.Behaviours.ReadOnlyBehaviour = function ReadOnlyBehaviour() {
    Tridion.OO.enableInterface(this, "Tridion.Extensions.UI.FBI.Behaviours.ReadOnlyBehaviour");
    this.addInterface("Tridion.DisposableObject");
    this.addInterface("Tridion.Extensions.UI.FBI.BehaviourBase");
};

Tridion.Extensions.UI.FBI.Behaviours.ReadOnlyBehaviour.prototype.apply = function ReadOnlyBehaviour$apply(fields) {    
    for (var i = 0; i < fields.length; i++) {
        var fieldName = fields[i];
        var field = fields[fieldName];
        var fieldType = field.fieldType;
        switch (fieldType) {
            case $fbiConst.SINGLE_LINE_TEXT_FIELD:
                this.disableElement(fieldName, fieldType);
                this.addField(fieldName, Function.getDelegate(this, this.enableElement, [fieldName, fieldType]));
                break;
            case $fbiConst.MULTILINE_TEXT_FIELD:
                this.disableMutliLineField(fieldName, fieldType);
                this.addField(fieldName, Function.getDelegate(this, this.enableMutliLineField, [fieldName, fieldType]));
                
                
                break;
            case $fbiConst.KEYWORD_FIELD:
            case $fbiConfig.XHTML_FIELD:
                console.warn("TODO: Field [" + fieldName + "] Behaviour [" + this.getTypeName() + "] type: " + fieldType);
                break;
            default:
                console.warn("Field [" + fieldName + "] Behaviour [" + this.getTypeName() + "] not implemented for field type: " + fieldType);
        }
        
    }
};

Tridion.Extensions.UI.FBI.Behaviours.ReadOnlyBehaviour.prototype.isReadOnly = function ReadOnlyBehaviour$isReadOnly(values) {
    for (var i = 0; i < values.length; i++) {
        if (values[i].value == "true") {
            return true;
        }
    }
    return false;
};



Tridion.Extensions.UI.FBI.Behaviours.ReadOnlyBehaviour.prototype.disableElement = function ReadOnlyBehaviour$disableElement(fieldName, fieldType) {
    var element = this.getFieldElement(fieldType, fieldName);
    element.disabled = true;
};
Tridion.Extensions.UI.FBI.Behaviours.ReadOnlyBehaviour.prototype.enableElement = function ReadOnlyBehaviour$enableElement(fieldName, fieldType) {
    var element = this.getFieldElement(fieldType, fieldName);
    element.disabled = false;
};

Tridion.Extensions.UI.FBI.Behaviours.ReadOnlyBehaviour.prototype.disableMutliLineField = function ReadOnlyBehaviour$disableMutliLineField(fieldName, fieldType) {
    var container = this.getFieldContainer(fieldType, fieldName);
    var textarea = this.getField(fieldName);
    $css.addClass(container, "readonly");
    textarea.properties.bar.disabled = true;
};
Tridion.Extensions.UI.FBI.Behaviours.ReadOnlyBehaviour.prototype.enableMutliLineField = function ReadOnlyBehaviour$enableMutliLineField(fieldName, fieldType) {
    var container = this.getFieldContainer(fieldType, fieldName);
    var textarea = this.getField(fieldName);
    $css.removeClass(container, "readonly");
    textarea.properties.bar.disabled = false;
};


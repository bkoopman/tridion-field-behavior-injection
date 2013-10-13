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
        var element = false;
        console.debug("Name: " + field.fieldName);
        console.debug("Type: " + field.fieldType);
        switch (field.fieldType) {
            case $fbiConst.SINGLE_LINE_TEXT_FIELD:
                this.disableElement(field.fieldName);
                this.addField(field.fieldName, Function.getDelegate(this, this.enableElement, [field.fieldName]));
                break;
            case $fbiConst.MULTILINE_TEXT_FIELD:
                this.disableMutliLineField(field.fieldName);
                this.addField(field.fieldName, Function.getDelegate(this, this.enableMutliLineField, [field.fieldName]));
                
                
                break;
            case $fbiConst.KEYWORD_FIELD:
            case $fbiConfig.XHTML_FIELD:
                console.warn("TODO: Field [" + field.fieldName + "] Behaviour [" + this.getTypeName() + "] type: " + field.fieldType);
                break;
            default:
                console.warn("Field [" + field.fieldName + "] Behaviour [" + this.getTypeName() + "] not implemented for field type: " + field.fieldType);
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



Tridion.Extensions.UI.FBI.Behaviours.ReadOnlyBehaviour.prototype.disableElement = function ReadOnlyBehaviour$disableElement(fieldName) {
    var element = this.getFieldElement(field.fieldType, field.fieldName);
    element.disabled = true;
};
Tridion.Extensions.UI.FBI.Behaviours.ReadOnlyBehaviour.prototype.enableElement = function ReadOnlyBehaviour$enableElement(fieldName) {
    var element = this.getFieldElement(field.fieldType, field.fieldName);
    element.disabled = false;
};

Tridion.Extensions.UI.FBI.Behaviours.ReadOnlyBehaviour.prototype.disableMutliLineField = function ReadOnlyBehaviour$disableMutliLineField(fieldName) {
    var container = this.getFieldContainer(field.fieldType, field.fieldName);
    var textarea = this.getField(field.fieldName);
    $css.addClass(container, "readonly");
    textarea.properties.bar.disabled = true;
};
Tridion.Extensions.UI.FBI.Behaviours.ReadOnlyBehaviour.prototype.enableMutliLineField = function ReadOnlyBehaviour$enableMutliLineField(fieldName) {
    var container = this.getFieldContainer(field.fieldType, field.fieldName);
    var textarea = this.getField(field.fieldName);
    $css.removeClass(container, "readonly");
    textarea.properties.bar.disabled = false;
};


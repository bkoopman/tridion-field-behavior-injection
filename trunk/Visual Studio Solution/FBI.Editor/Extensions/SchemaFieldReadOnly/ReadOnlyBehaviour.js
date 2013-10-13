/// <reference path="../../../FBI.Model/Scripts/Costants/FBIConstants.js" />
Type.registerNamespace("Tridion.Extensions.UI.FBI.Behaviours");
Tridion.Extensions.UI.FBI.Behaviours.ReadOnlyBehaviour = function ReadOnlyBehaviour() {
    Tridion.OO.enableInterface(this, "Tridion.Extensions.UI.FBI.Behaviours.ReadOnlyBehaviour");
    this.addInterface("Tridion.DisposableObject");
    this.addInterface("Tridion.Extensions.UI.FBI.BehaviourBase");
};

Tridion.Extensions.UI.FBI.Behaviours.ReadOnlyBehaviour.prototype.apply = function ReadOnlyBehaviour$apply(fields) {
    for (var i = 0; i < fields.length; i++) {
        var field = fields[fields[i]];
        var fieldName = field.fieldName;
        var fieldType = field.fieldType;
        
        switch (fieldType) {
            case $fbiConst.SINGLE_LINE_TEXT_FIELD:
            case $fbiConst.MULTILINE_TEXT_FIELD:
            case $fbiConst.XHTML_FIELD:
            case $fbiConst.KEYWORD_FIELD:
                this.disableElement(field);
                this.addField(fieldName, Function.getDelegate(this, this.enableElement, [field]));
                break;
                
            default:
                console.warn("Field [" + fieldName + "] Behaviour [" + this.getTypeName() + "] not implemented for field type: [" + fieldType +"]");
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



Tridion.Extensions.UI.FBI.Behaviours.ReadOnlyBehaviour.prototype.disableElement = function ReadOnlyBehaviour$disableElement(field) {
    var f = this.getField(field.fieldName);
    f.getElement().control.applyReadOnly(true);
    if (f.isMultivalued()) {
        var f2 = f.getElement().control.getNextFieldSibling();
        while (f2) {
            f2.applyReadOnly(true);
            f2 = f2.getNextFieldSibling();
        }

    }
};
Tridion.Extensions.UI.FBI.Behaviours.ReadOnlyBehaviour.prototype.enableElement = function ReadOnlyBehaviour$enableElement(field) {
    var f = this.getField(field.fieldName);
    f.getElement().control.applyReadOnly(false);
    if (f.isMultivalued()) {
        var f2 = f.getElement().control.getNextFieldSibling();
        while (f2) {
            f2.applyReadOnly(false);
            f2 = f2.getNextFieldSibling();
        }

    }
};

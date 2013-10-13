/// <reference path="../../../FBI.Model/Scripts/Costants/FBIConstants.js" />
Type.registerNamespace("Tridion.Extensions.UI.FBI.Behaviours");
Tridion.Extensions.UI.FBI.Behaviours.VisibilityBehaviour = function VisibilityBehaviour() {
    Tridion.OO.enableInterface(this, "Tridion.Extensions.UI.FBI.Behaviours.VisibilityBehaviour");
    this.addInterface("Tridion.DisposableObject");
    this.addInterface("Tridion.Extensions.UI.FBI.BehaviourBase");
};

Tridion.Extensions.UI.FBI.Behaviours.VisibilityBehaviour.prototype.apply = function VisibilityBehaviourapply(params) {
    for (var i = 0; i < fields.length; i++) {
        var fieldName = fields[i];
        var field = fields[fieldName];

        switch (field.fieldType) {
            case $fbiConst.SINGLE_LINE_TEXT_FIELD:
                if (this.isHidden(field.values)) {
                    var element = this.getFieldContainer(field.fieldType, field.fieldName);
                    this.hideElement(element);
                    this.addField(element, Function.getDelegate(this, this.showElement, [element]));
                }
                break;
            case $fbiConst.MULTILINE_TEXT_FIELD:
            case $fbiConst.KEYWORD_FIELD:
            case $fbiConfig.XHTML_FIELD:
                console.warn("TODO: Field [" + field.fieldName + "] Behaviour [" + this.getTypeName() + "] type: " + field.fieldType);
                break;
            default:
                console.warn("Field [" + field.fieldName + "] Behaviour [" + this.getTypeName() + "] not implemented for field type: " + field.fieldType);
        }
    }
};

Tridion.Extensions.UI.FBI.Behaviours.VisibilityBehaviour.prototype.isHidden = function VisibilityBehaviour$isHidden(values) {
    for (var i = 0; i < values.length; i++) {
        if (values[i].value == "true") {
            return true;
        }
    }
    return false;
};

Tridion.Extensions.UI.FBI.Behaviours.VisibilityBehaviour.prototype.hideElement = function VisibilityBehaviour$hideElement(element) {
    $css.undisplay(element);
};
Tridion.Extensions.UI.FBI.Behaviours.VisibilityBehaviour.prototype.showElement = function VisibilityBehaviour$showElement(element) {
    $css.display(element);
};



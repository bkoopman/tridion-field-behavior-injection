/// <reference path="../../../FBI.Model/Scripts/Costants/FBIConstants.js" />
Type.registerNamespace("Tridion.Extensions.UI.FBI.Behaviours");
Tridion.Extensions.UI.FBI.Behaviours.VisibilityBehaviour = function VisibilityBehaviour() {
    Tridion.OO.enableInterface(this, "Tridion.Extensions.UI.FBI.Behaviours.VisibilityBehaviour");
    this.addInterface("Tridion.DisposableObject");
    this.addInterface("Tridion.Extensions.UI.FBI.BehaviourBase");
    this.callBase("Tridion.Extensions.UI.FBI.BehaviourBase", "setKey", [$fbiConst.HIDDEN]);
};

Tridion.Extensions.UI.FBI.Behaviours.VisibilityBehaviour.prototype.apply = function VisibilityBehaviourapply(fields) {
    for (var i = 0; i < fields.length; i++) {
        var field = fields[fields[i]];
        var fieldName = field.fieldName;
        var fieldType = field.fieldType;

        switch (fieldType) {
            case $fbiConst.SINGLE_LINE_TEXT_FIELD:
            case $fbiConst.MULTILINE_TEXT_FIELD:
            case $fbiConst.XHTML_FIELD:
            case $fbiConst.KEYWORD_FIELD:
                if (this.isHidden(field.values)) {
                    this.setVisibility(field, true);
                }
                break;

            default:
                console.warn("Field [" + fieldName + "] Behaviour [" + this.getTypeName() + "] not implemented for field type: [" + fieldType + "]");
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

Tridion.Extensions.UI.FBI.Behaviours.VisibilityBehaviour.prototype.setVisibility = function VisibilityBehaviour$setVisibility(field, hidden) {
    var container = this.getField(field.fieldName);
    container = container.getElement().control;
    container = container.getElement().parentElement;
    if (hidden) {
        $css.undisplay(container);
    } else {
        $css.display(container);
    }

};




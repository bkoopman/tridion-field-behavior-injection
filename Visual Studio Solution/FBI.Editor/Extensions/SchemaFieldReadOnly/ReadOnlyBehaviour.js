/// <reference path="../../../FBI.Model/Scripts/Costants/FBIConstants.js" />
Type.registerNamespace("Tridion.Extensions.UI.FBI.Behaviours");
Tridion.Extensions.UI.FBI.Behaviours.ReadOnlyBehaviour = function ReadOnlyBehaviour() {
    Tridion.OO.enableInterface(this, "Tridion.Extensions.UI.FBI.Behaviours.ReadOnlyBehaviour");
    this.addInterface("Tridion.DisposableObject");
    this.addInterface("Tridion.Extensions.UI.FBI.BehaviourBase");
    
};

Tridion.Extensions.UI.FBI.Behaviours.ReadOnlyBehaviour.prototype.apply = function ReadOnlyBehaviour$apply(params) {
    console.debug("Applying ReadOnlyBehaviour");
    //console.debug(params);
    
    switch (params.fieldType) {
        case $fbiConst.SINGLE_LINE_TEXT_FIELD:
            if (this.isReadOnly(params.groupValues)) {
                var element = this.getFieldElement(params.fieldType, params.fieldName, params.fieldBuilder);
                element.disabled = true;
                this.addField(element, Function.getDelegate(this, this.enableElement, [element]));
            }
            break;
        case $fbiConst.MULTILINE_TEXT_FIELD:
        case $fbiConst.KEYWORD_FIELD:
        case $fbiConfig.XHTML_FIELD:
            console.warn("TODO: Field [" + params.fieldName + "] Behaviour [" + this.getTypeName() + "] type: " + params.fieldType);
            break;
        default:            
            console.warn("Field ["+params.fieldName+"] Behaviour [" + this.getTypeName() + "] not implemented for field type: " + params.fieldType);
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

Tridion.Extensions.UI.FBI.Behaviours.ReadOnlyBehaviour.prototype.disableElement = function ReadOnlyBehaviour$disableElement(element) {
    element.disabled = true;
};
Tridion.Extensions.UI.FBI.Behaviours.ReadOnlyBehaviour.prototype.enableElement = function ReadOnlyBehaviour$enableElement(element) {
    element.disabled = false;
};


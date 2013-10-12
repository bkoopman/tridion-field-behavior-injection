﻿Type.registerNamespace("Tridion.Extensions.UI.FBI.Behaviours");
Tridion.Extensions.UI.FBI.Behaviours.ReadOnlyBehaviour = function ReadOnlyBehaviour() {
    Tridion.OO.enableInterface(this, "Tridion.Extensions.UI.FBI.Behaviours.ReadOnlyBehaviour");
    this.addInterface("Tridion.DisposableObject");
};

Tridion.Extensions.UI.FBI.Behaviours.ReadOnlyBehaviour.prototype.apply = function ReadOnlyBehaviour$apply(params) {
    console.debug("Applying ReadOnlyBehaviour");
    console.debug(params);
    
    switch (params.fieldType) {
        case "tcm:SingleLineTextField":
            if (this.isReadOnly(params.groupValues)) {
                var element = $fbi.getFieldElement(params.fieldType, params.fieldName, params.fieldBuilder);
                element.readOnly = true;
            }
        default:            
            console.warn("Behaviour [" + this.getTypeName() + "] not implemented for field type: " + params.fieldType);
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


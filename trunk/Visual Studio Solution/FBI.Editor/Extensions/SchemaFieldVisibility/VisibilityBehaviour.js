Type.registerNamespace("Tridion.Extensions.UI.FBI.Behaviours");
Tridion.Extensions.UI.FBI.Behaviours.VisibilityBehaviour = function VisibilityBehaviour() {
    Tridion.OO.enableInterface(this, "Tridion.Extensions.UI.FBI.Behaviours.VisibilityBehaviour");
    this.addInterface("Tridion.DisposableObject");
};

Tridion.Extensions.UI.FBI.Behaviours.VisibilityBehaviour.prototype.apply = function VisibilityBehaviourapply(params) {
    console.debug("Applying VisibilityBehaviour");
    console.debug(params);
    if (this.isReadOnly(params.groupValues)) {
        var element = $fbi.getFieldElement(params.fieldType, params.fieldName, params.fieldBuilder);
        element.readOnly = true;
    }
};

Tridion.Extensions.UI.FBI.Behaviours.VisibilityBehaviour.prototype.isHidden = function VisibilityBehaviourisHidden(values) {
    for (var i = 0; i < values.length; i++) {
        if (values[i].value == "true") {
            return true;
        }
    }
    return false;
};



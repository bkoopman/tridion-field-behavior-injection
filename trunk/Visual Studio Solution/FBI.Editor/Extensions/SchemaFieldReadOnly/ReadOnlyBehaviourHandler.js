/// <reference path="../../../FBI.Model/Scripts/Costants/FBIConstants.js" />
Type.registerNamespace("Tridion.Extensions.UI.FBI.Behaviours");
Tridion.Extensions.UI.FBI.Behaviours.ReadOnlyBehaviour = function ReadOnlyBehaviour() {
    Tridion.OO.enableInterface(this, "Tridion.Extensions.UI.FBI.Behaviours.ReadOnlyBehaviour");
    this.addInterface("Tridion.DisposableObject");
    this.addInterface("Tridion.Extensions.UI.FBI.BehaviourBase");
    this.callBase
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
                if (this.isReadOnly(field.values)) {
                    this.setReadOnly(field, true);
                }
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

Tridion.Extensions.UI.FBI.Behaviours.ReadOnlyBehaviour.prototype.setReadOnly = function ReadOnlyBehaviour$setReadOnly(field, readonly) {
    var f = this.getField(field.fieldName);
    var fieldState;
    if (readonly) {
        do {
            var control = f.getElement().control;
            control.applyReadOnly(readonly);
            if (typeof field.previousStates === "undefined") {
                field.previousStates = [];
            }
            if (f.isMultivalued()) {
                fieldState = {
                    control: control,
                    canDelete: f.getCanDelete(),
                    canMove: f.getCanMove(),
                    canInsert: f.getCanInsert()
                };
                f.setCanDelete(false);
                f.setCanMove(false);
                f.setCanInsert(false);
                field.previousStates.push(fieldState);
            }
            this.addField(field.fieldName, Function.getDelegate(this, this.setReadOnly, [field, false]));
            f = f.getNextFieldSibling();
            
            
        } while (f); 
        
    } else {
        //Disable Behaviour
        if (field.previousStates && field.previousStates.length > 0) {
            for (var i = 0; i < field.previousStates.length; i++) {
                fieldState = field.previousStates[i];
                if (fieldState.control) {
                    f = this.getField(field.fieldName);
                    f.applyReadOnly(readonly);
                    if (f.isMultivalued()) {
                        fieldState.control.setCanDelete(fieldState.canDelete);
                        fieldState.control.setCanMove(fieldState.canMove);
                        fieldState.control.setCanInsert(fieldState.canInsert);
                    }
                    
                }
            }
        }
        
    }
};

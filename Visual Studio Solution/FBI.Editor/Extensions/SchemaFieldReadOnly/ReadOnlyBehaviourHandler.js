/// <reference path="../../../FBI.Model/Scripts/Costants/FBIConstants.js" />
Type.registerNamespace("Tridion.Extensions.UI.FBI.Behaviours");
Tridion.Extensions.UI.FBI.Behaviours.ReadOnlyBehaviour = function ReadOnlyBehaviour() {
    Tridion.OO.enableInterface(this, "Tridion.Extensions.UI.FBI.Behaviours.ReadOnlyBehaviour");
    this.addInterface("Tridion.DisposableObject");
    this.addInterface("Tridion.Extensions.UI.FBI.BehaviourBase");
    this.callBase("Tridion.Extensions.UI.FBI.BehaviourBase", "setKey", [$fbiConst.READONLY]);
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
            case $fbiConst.NUMBER_FIELD:
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
    var control;
    var button;
    var input;
    var inputs;
    var buttons;
    
    if (readonly) {
        var position = 0;
        do {
            control = f.getElement().control;
            f.applyReadOnly(readonly);
            if (typeof field.previousStates === "undefined") {
                field.previousStates = [];
            }
            
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
            f = f.getNextFieldSibling();
            
            switch (field.fieldType) {
                case $fbiConst.KEYWORD_FIELD:
                    //TODO: CHEK IF THE USER HAS ADD CAPABILITIES FOR KWDS
                    buttons = $("div.buttons", control.getElement());
                    if (buttons) {
                        $css(buttons, "visibility", "hidden");
                    }
                    switch (control.getListSettings().Type) {
                        case $fbiConst.SELECT_ELEMENT:
                            input = $($fbiConst.SELECT_ELEMENT, control.getElement());
                            if (input) {
                                input.disabled = readonly;}
                            
                        case $fbiConst.RADIO_ELEMENT:
                            inputs = $$($fbiConst.INPUT_ELEMENT, control.getElement());
                            if (inputs) {
                                for (var k = 0; k < inputs.length; k++) {
                                    inputs[k].disabled = readonly;
                                }
                            }
                            
                            break;
                        default:
                            break;
                    }

                    //TODO: CHEK IF THE USER HAS ADD CAPABILITIES FOR KWDS
                    button = $("#buttonAdd", control.getElement());
                    if (button) {
                        $css.removeClass(button, "disabled");
                    }
                    if (control.properties.input.properties.controls.buttons) {
                        control.properties.input.properties.controls.buttons.add.disable();
                        $css.addClass(control.properties.input.properties.controls.buttons.add.getElement(), "disabled");
                    }
                    
                    break;

                default:
                    break;
            }
            position++;

        } while (f); 
        
    }
};

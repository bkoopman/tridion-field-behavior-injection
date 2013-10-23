
Type.registerNamespace("Tridion.Extensions.UI.FBI.Behaviours");
Tridion.Extensions.UI.FBI.Behaviours.SyntaxHighlightBehaviour = function SyntaxHighlightBehaviour() {
    Tridion.OO.enableInterface(this, "Tridion.Extensions.UI.FBI.Behaviours.SyntaxHighlightBehaviour");
    this.addInterface("Tridion.Extensions.UI.FBI.BehaviourBase");
    this.callBase("Tridion.Extensions.UI.FBI.BehaviourBase", "setKey", [$fbiConst.READONLY]);
};

Tridion.Extensions.UI.FBI.Behaviours.SyntaxHighlightBehaviour.prototype.apply = function SyntaxHighlightBehaviour$apply(context, fields) {
    for (var i = 0; i < fields.length; i++) {
        var field = fields[fields[i]];
        var fieldName = field.fieldName;
        var fieldType = field.fieldType;
        
        switch (fieldType) {
            case $fbiConst.SINGLE_LINE_TEXT_FIELD:
            case $fbiConst.MULTILINE_TEXT_FIELD:
                if (this.getSyntaxHighlight(field.values)) {
                    this.setSyntaxHighlight(context, field, true);
                }
                break;
            case $fbiConst.XHTML_FIELD:
            case $fbiConst.KEYWORD_FIELD:
            case $fbiConst.NUMBER_FIELD:
            case $fbiConst.DATE_FIELD:
            case $fbiConst.EXTERNAL_LINK_FIELD:
            case $fbiConst.COMPONENT_LINK_FIELD:
            case $fbiConst.MULTIMEDIA_LINK_FIELD:
            case $fbiConst.EMBEDDED_FIELD:
                
            default:
                console.warn("Field [" + fieldName + "] Behaviour [" + this.getTypeName() + "] not implemented for field type: [" + fieldType +"]");
        } 
    }
};


Tridion.Extensions.UI.FBI.Behaviours.SyntaxHighlightBehaviour.prototype.getSyntaxHighlight = function SyntaxHighlightBehaviour$getSyntaxHighlight(values) {
    return values[0].value;
};

Tridion.Extensions.UI.FBI.Behaviours.SyntaxHighlightBehaviour.prototype.setSyntaxHighlight = function SyntaxHighlightBehaviour$getSyntaxHighlight(context, field, readonly) {
    var f = this.getField(context, field.fieldName);
    $evt.addEventHandler(f, "blur", Function.getDelegate(this, this.apply, [f, type]));
};

Tridion.Extensions.UI.FBI.Behaviours.SyntaxHighlightBehaviour.prototype.apply = function SyntaxHighlightBehaviour$aply(field, type) {
    var values = field.getValues();
    if (typeof values === "undefined" || values == null) {
        return;
    }
    for (var i = 0; i < values.length; i++) {
        var value = values[i];

        var result = $fbiValidationConfig.checkRule(type, value);
        if (!result.Success) {
            $messages.registerWarning(result.Message.format(field.getFieldName(), result.ValidationName));
            if (field.properties.input) {
                field.properties.input.style["background-color"] = $fbiConst.ERROR_COLOR;
                field.properties.input.style["border"] = $fbiConst.ERROR_BORDER_COLOR;
            }
            field.focus(i);
            return;
        } else {
            if (field.properties.input) {
                field.properties.input.style["background-color"] = $fbiConst.DEFAULT_INPUT_COLOR;
                field.properties.input.style["border"] = $fbiConst.DEFAULT_INPUT_BORDER_COLOR;
            }
            return;
        }
    }
};
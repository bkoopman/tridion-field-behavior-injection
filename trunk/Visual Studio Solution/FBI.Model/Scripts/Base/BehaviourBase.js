/// <reference path="../Costants/FBIConstants.js" />
Type.registerNamespace("Tridion.Extensions.UI.FBI");

Tridion.Extensions.UI.FBI.BehaviourBase = function BehaviourBase() {
    /// <summary>
    /// Behaviour Base to be used as the base class for all behaviours. It contains useful methods for the behaviour manipulation
    /// </summary>
    Tridion.OO.enableInterface(this, "Tridion.Extensions.UI.FBI.BehaviourBase");
    this.addInterface("Tridion.DisposableObject");
    this.properties.fields = [];
};

Tridion.Extensions.UI.FBI.BehaviourBase.prototype._getPathTo = function BehaviourBase$_getPathTo(element) {
    /// <summary>Gets the path to the element within its owning document.</summary>
    /// <param name="element">The element to retrieve the path to</param>
    /// <returns type="string">The path to the element</returns>
    if (element.id !== '') {
        return "";
        //return 'id("' + element.id + '")';
    }
    if (element === document.body)
        return element.tagName;

    var ix = 0;
    var siblings = element.parentNode.childNodes;
    for (var i = 0; i < siblings.length; i++) {
        var sibling = siblings[i];
        if (sibling === element)
            return this._getPathTo(element.parentNode) + '/' + element.tagName + '[' + (ix + 1) + ']';
        if (sibling.nodeType === 1 && sibling.tagName === element.tagName)
            ix++;
    }
    return "";
};

Tridion.Extensions.UI.FBI.BehaviourBase.prototype.getFieldElement = function BehaviourBase$getFieldElement(fieldType, fieldName) {
    /// <summary>Gets the field html element.</summary>
    /// <param name="fieldType">The field type</param>
    /// <param name="fieldName">The field name</param>
    /// <param name="builder">The <see cref="Tridion.Controls.FieldBuilder"/>control</param>
    /// <returns type="element">The field html element</returns>
    switch ((fieldType)) {
        case $fbiConst.SINGLE_LINE_TEXT_FIELD:
        case $fbiConst.MULTILINE_TEXT_FIELD:
            return $fbi.getCurrentFieldBuilder().getField(fieldName).getElement().firstChild;
        default:
            console.warn("Not element found for [" + fieldType + "]: " + fieldName);
            return null;
    }
};

Tridion.Extensions.UI.FBI.BehaviourBase.prototype.getFieldContainer = function BehaviourBase$getFieldContainer(fieldType, fieldName) {
    /// <summary>Gets the field container html element.</summary>
    /// <param name="fieldType">The field type</param>
    /// <param name="fieldName">The field name</param>
    /// <param name="builder">The <see cref="Tridion.Controls.FieldBuilder"/>control</param>
    /// <returns type="element">The field container html element</returns>
    switch ((fieldType)) {
        case $fbiConst.SINGLE_LINE_TEXT_FIELD:
        case $fbiConst.MULTILINE_TEXT_FIELD:
            return this.getFieldElement(fieldType, fieldName).parentElement;
        default:
            console.warn("Not element found for [" + fieldType + "]: " + fieldName);
            return null;
    }
};

Tridion.Extensions.UI.FBI.BehaviourBase.prototype.getField = function BehaviourBase$getField(fieldName) {
    return $fbi.getCurrentFieldBuilder().getField(fieldName);
};

Tridion.Extensions.UI.FBI.BehaviourBase.prototype.cease = function BehaviourBase$cease() {
    console.debug("Tridion.Extensions.UI.FBI.BehaviourBase.prototype.cease ["+this.key+"]");
    var p = this.properties;
    if (p.fields.length > 0) {
        for (var i = 0; i < p.fields.length; i++) {
            var f = p.fields[p.fields[i]];
            f.restore();
        }
    }
};

Tridion.Extensions.UI.FBI.BehaviourBase.prototype.addField = function BehaviourBase$addField(fieldName, callback) {
    var p = this.properties;
    var f = {
        fieldName: fieldName,
        restore: callback
    };
    //TODO: Make sure the field is not already there
    if (typeof p.fields == "undefined") {
        p.fields = [];
    }

    if (p.fields.indexOf(fieldName) < 0) {
        p.fields[fieldName] = f;
        p.fields.push(fieldName);
    }
    
    
    
};


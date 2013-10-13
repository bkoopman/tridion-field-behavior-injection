/// <reference path="../Costants/FBIConstants.js" />
Type.registerNamespace("Tridion.Extensions.UI.FBI");

Tridion.Extensions.UI.FBI.BehaviourBase = function BehaviourBase() {
    /// <summary>
    /// Behaviour Base to be used as the base class for all behaviours. It contains useful methods for the behaviour manipulation
    /// </summary>
    Tridion.OO.enableInterface(this, "Tridion.Extensions.UI.FBI.BehaviourBase");
    this.addInterface("Tridion.DisposableObject");
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

Tridion.Extensions.UI.FBI.BehaviourBase.prototype.getFieldElement = function BehaviourBase$getFieldElement(fieldType, fieldName, builder) {
    /// <summary>Gets the field html element.</summary>
    /// <param name="fieldType">The field type</param>
    /// <param name="fieldName">The field name</param>
    /// <param name="builder">The <see cref="Tridion.Controls.FieldBuilder"/>control</param>
    /// <returns type="element">The field html element</returns>
    switch ((fieldType)) {
        case "tcm:SingleLineTextField":
            return builder.getField(fieldName).getElement().firstChild;
        default:
            return null;
    }
};

Tridion.Extensions.UI.FBI.BehaviourBase.prototype.getFieldContainer = function BehaviourBase$getFieldContainer(fieldType, fieldName, builder) {
    /// <summary>Gets the field container html element.</summary>
    /// <param name="fieldType">The field type</param>
    /// <param name="fieldName">The field name</param>
    /// <param name="builder">The <see cref="Tridion.Controls.FieldBuilder"/>control</param>
    /// <returns type="element">The field container html element</returns>
    switch ((fieldType)) {
        case "tcm:SingleLineTextField":
            var element = builder.getField(fieldName).getElement();
            return element.parentElement;
        default:
            return null;
    }
};
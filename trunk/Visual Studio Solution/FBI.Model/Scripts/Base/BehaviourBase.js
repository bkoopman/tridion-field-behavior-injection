/// <reference path="../Constants/FBIConstants.js" />
Type.registerNamespace("Tridion.Extensions.UI.FBI");

Tridion.Extensions.UI.FBI.BehaviourBase = function BehaviourBase() {
    /// <summary>
    /// Behaviour Base to be used as the base class for all behaviours. It contains useful methods for the behaviour manipulation
    /// </summary>
    Tridion.OO.enableInterface(this, "Tridion.Extensions.UI.FBI.BehaviourBase");
    this.addInterface("Tridion.DisposableObject");
    this.key = "base";
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

Tridion.Extensions.UI.FBI.BehaviourBase.prototype.getFieldElement = function BehaviourBase$getFieldElement(context, fieldName) {
    /// <summary>Gets the field html element.</summary>
    /// <param name="context">The field context</param>
    /// <param name="fieldName">The field name</param>
    /// <returns type="element">The field html element</returns>
   
   return this.getField(context, fieldName).getElement().firstChild;
   
};

Tridion.Extensions.UI.FBI.BehaviourBase.prototype.getFieldContainer = function BehaviourBase$getFieldContainer(context, fieldName) {
    /// <summary>Gets the field container html element.</summary>
    /// <param name="context">The field cotext</param>
    /// <param name="fieldName">The field name</param>
    /// <returns type="element">The field container html element</returns>
   
   return this.getField(context, fieldName).getElement().control.getElement().parentElement;
   
};

Tridion.Extensions.UI.FBI.BehaviourBase.prototype.getField = function BehaviourBase$getField(context, fieldName) {
    return $fbi.getFieldBuilderByContext(context).getField(fieldName);
};

Tridion.Extensions.UI.FBI.BehaviourBase.prototype.setKey = function BehaviourBase$setKey(key) {
    var p = this.properties;
    p.key = key;
};

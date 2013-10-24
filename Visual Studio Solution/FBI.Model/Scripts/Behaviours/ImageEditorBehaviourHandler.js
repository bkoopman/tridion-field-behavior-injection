/// <reference path="../../../FBI.Model/Scripts/Costants/FBIConstants.js" />
Type.registerNamespace("Tridion.Extensions.UI.FBI.Behaviours");
Tridion.Extensions.UI.FBI.Behaviours.ImageEditBehaviour = function ImageEditBehaviour() {
    Tridion.OO.enableInterface(this, "Tridion.Extensions.UI.FBI.Behaviours.ImageEditBehaviour");
    this.addInterface("Tridion.Extensions.UI.FBI.BehaviourBase");
    this.callBase("Tridion.Extensions.UI.FBI.BehaviourBase", "setKey", [$fbiConst.EDIT_IMAGE]);
};

Tridion.Extensions.UI.FBI.Behaviours.ImageEditBehaviour.prototype.apply = function ImageEdit$Behaviourapply(context, fields) {
    for (var i = 0; i < fields.length; i++) {
        var field = fields[fields[i]];
        var fieldName = field.fieldName;
        var fieldType = field.fieldType;

        switch (fieldType) {
            case $fbiConst.COMPONENT_LINK_FIELD:
            case $fbiConst.MULTIMEDIA_LINK_FIELD:
            
                if (this.isImageEdit(field.values)) {
                    this.enableImageEditor(context, field);
                }
                break;

            default:
                console.warn("Field [" + fieldName + "] Behaviour [" + this.getTypeName() + "] not implemented for field type: [" + fieldType + "]");
        }

    }
};

Tridion.Extensions.UI.FBI.Behaviours.ImageEditBehaviour.prototype.isImageEdit = function ImageEditBehaviour$isImageEdit(values) {
    for (var i = 0; i < values.length; i++) {
        if (values[i].value == "true") {
            return true;
        }
    }
    return false;
};

Tridion.Extensions.UI.FBI.Behaviours.ImageEditBehaviour.prototype.enableImageEditor = function ImageEditBehaviour$enableImageEditor(context, field) {
    console.debug("Enable Image Editor!");
    var f = this.getField(context, field.fieldName);
    var divTitle = $("#MultimediaLinkImageName", f.getElement());
    var fileName = divTitle.innerText;
    $jquery(divTitle).empty();
    $jquery("<a href='#'>{0}</a>".format(fileName)).appendTo(divTitle).click(function () {
        alert('Need to open the popup!');
    });

};




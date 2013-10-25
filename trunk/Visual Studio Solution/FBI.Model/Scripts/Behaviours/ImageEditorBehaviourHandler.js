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
    
    var f = this.getField(context, field.fieldName);
    var divTitle = $("#MultimediaLinkImageName", f.getElement());
    
    var a = document.createElement("a");
    var br = document.createElement("br");
    a.id = "ImageEditorLink";
    a.href = "#";
    a.innerText = "Open Editor";
    divTitle.appendChild(br);
    divTitle.appendChild(a);
    $f = f;
    var itemId = f.getValues()[0];
    var title = $models.getItem(itemId).getStaticTitle();
    
    $evt.addEventHandler($("#ImageEditorLink"), "click", Function.getDelegate(this, this.openEditor, [itemId, title]));
    


};


Tridion.Extensions.UI.FBI.Behaviours.ImageEditBehaviour.prototype.openEditor = function ImageEditBehaviour$openEditor(itemId, title) {
    var p = this.properties;
    var url = "/WebUI/Editors/FBI/Views/Popups/SchemaFieldImageEditor/FBIImageEditor.aspx";
    var features = { width: 500, height: 600 };
    
    var args = { contentTitle: title, itemId: itemId};
    
    p.popup = $popup.create(url, features, args);
    var onPopupClosed = function ImageEditorBehaviour$openEditor$onPopupClosed(e) {
        if (p.popup) {
            $evt.removeAllEventHandlers(p.popup);
            p.popup.dispose();
            p.popup = null;
        }
    };
    
    

    $evt.addEventHandler(p.popup, "cancel", onPopupClosed);
    $evt.addEventHandler(p.popup, "unload", onPopupClosed);
    
    p.popup.open();
};
Type.registerNamespace("Tridion.Extensions.UI.FBI.Views.Views");

Tridion.Extensions.UI.FBI.Views.ImageEditorView = function ImageEditorView()
{
    Tridion.OO.enableInterface(this, "Tridion.Extensions.UI.FBI.Views.ImageEditorView");
    this.addInterface("Tridion.Controls.ModalPopupView");
    this.addInterface("Tridion.Cme.View");
    var p = this.properties;
    p.itemId;
    p.title;
    p.isMetadataChanged = false;
    
};

Tridion.Extensions.UI.FBI.Views.ImageEditorView.prototype.initialize = function ImageEditorView$initialize() {
    this.callBase("Tridion.Cme.View", "initialize");
    
    var p = this.properties;
    var c = p.controls;

    if (window.dialogArguments) {
        var args = window.dialogArguments;
        p.title = args.contentTitle;
        p.itemId = args.itemId;
    }
    
    c.titleElem = $("#DialogTitle");
    $dom.setInnerText(c.titleElem, p.title ? p.title : "");

    $controls.getControl($("#Stack"), "Tridion.Controls.Stack");
    
    c.BtnSaveAndClose = $controls.getControl($("#SaveAndClose"), "Tridion.Controls.Button");
    c.BtnCancel = $controls.getControl($("#Cancel"), "Tridion.Controls.Button");
    c.BtnFilters = $controls.getControl($("#BtnFilters"), "Tridion.Controls.Button");

    c.EditorImage = $("#editor-image");
    c.Filters = $("#Filters");

    $evt.addEventHandler(c.BtnSaveAndClose, "click", this.getDelegate(this._onSaveAndCloseClick));
    $evt.addEventHandler(c.BtnCancel, "click", this.getDelegate(this._close));
    $evt.addEventHandler(c.BtnFilters, "click", this.getDelegate(this._onFiltersClick));

    function onSchemaLoaded(e) {
        if (e) {
            removeSchemaHandlers(e);
        }
        //TODO: MIGHT NEED TO SHOW FIELD BUIDLER FOR METADATA
        var readOnly = item.isReadOnly() || item.isShared() || false;
        c.BtnSaveAndClose.setDisabled(readOnly);  
    };

    function removeSchemaHandlers(e) {
        $evt.removeEventHandler(schema, "staticload", onSchemaLoaded);
        $evt.removeEventHandler(schema, "staticloadfailed", removeSchemaHandlers);
    };

    function onItemLoaded(e) {
        if (e) {
            removeItemHandlers(e);
        }

        if (item.getMetadataSchema) {
            schema = item.getMetadataSchema();
            if (schema) {
                if (schema.isStaticLoaded()) {
                    onSchemaLoaded();
                }
                else {
                    $evt.addEventHandler(schema, "staticload", onSchemaLoaded);
                    $evt.addEventHandler(schema, "staticloadfailed", removeSchemaHandlers);
                    schema.staticLoad();
                }
            }
        }
    };

    function removeItemHandlers(e) {
        $evt.removeEventHandler(item, "load", onItemLoaded);
        $evt.removeEventHandler(item, "loadfailed", removeItemHandlers);
    };

    var schema, item = $models.getItem(p.itemId);
    if (item) {
        if (item.isLoaded()) {
            onItemLoaded();
        }
        else {
            $evt.addEventHandler(item, "load", onItemLoaded);
            $evt.addEventHandler(item, "loadfailed", removeItemHandlers);
            item.load();
        }
    }
    else {
        c.BtnSaveAndClose.disable();
    }
    var url = String.format("{0}", $display.getMultimediaHandlerPath());
    var unique = new Date();
    var imgSrc = "{0}?uri={1}&mofified={2}".format(url, encodeURIComponent(p.itemId), unique.isoString());
    p.caman = Caman(c.EditorImage, imgSrc, function () {
        // manipulate image here
        this.render();
    });
    this._initializeFilters();
};


Tridion.Extensions.UI.FBI.Views.ImageEditorView.prototype._initializeFilters = function ImageEditorView$_initializeFilters() {
    var p = this.properties;
    
    
    function debounce(fn, delay) {
        var timer = null;
        return function () {
            var context = this, args = arguments;
            clearTimeout(timer);
            timer = setTimeout(function () {
                fn.apply(context, args);
            }, delay);
        };
    }
    
    $jquery("div.FilterSetting > input[type=range]").on('change', debounce(function(event) {

        var filter = $jquery(this).attr('data-filter');
        var value = $jquery(this).val();
        var span = $jquery(this).next();
        span.html(value);
        p.caman.revert(false);
        p.caman[filter](value).render();

    }, 250));
    
};

Tridion.Extensions.UI.FBI.Views.ImageEditorView.prototype._onFiltersClick = function ImageEditorView$_onFiltersClick(e) {
    var p = this.properties;
    var c = p.controls;
    var b = c.BtnFilters;
    this._toggleButton(b);
    if (b.isOn()) {
        $css.display(c.Filters);
    } else {
        $css.undisplay(c.Filters);
    }

};
Tridion.Extensions.UI.FBI.Views.ImageEditorView.prototype._toggleButton = function ImageEditorView$_toggleButton(b) {
    if (b.isOn()) {
        b.toggleOff();
    } else {
        b.toggleOn();
    }
};


Tridion.Extensions.UI.FBI.Views.ImageEditorView.prototype._close = function ImageEditorView$_close(e) {
    isCanceled = false;
    if (e && e.source == this.properties.controls.BtnCancel) {
        isCanceled = true;
    }

    this.fireEvent("cancel", { canceled: isCanceled });
};


Tridion.Extensions.UI.FBI.Views.ImageEditorView.prototype._onSaveAndCloseClick = function ImageEditorView$_onSaveAndCloseClick(e) {
    var p = this.properties;
    var item = $models.getItem(p.itemId);
    alert('Closing image!');

    this._close(e);
};


$display.registerView(Tridion.Extensions.UI.FBI.Views.ImageEditorView);
Type.registerNamespace("Tridion.Extensions.UI.FBI.Views.Views");

Tridion.Extensions.UI.FBI.Views.ImageEditorView = function ImageEditorView()
{
    Tridion.OO.enableInterface(this, "Tridion.Extensions.UI.FBI.Views.ImageEditorView");
    this.addInterface("Tridion.Controls.ModalPopupView");
    this.addInterface("Tridion.Cme.View");
    var p = this.properties;
    p.isMetadataChanged = false;
    p.isModified = false;
    p.inputs = [];
    
    $v = this;

};

//View Initialization
Tridion.Extensions.UI.FBI.Views.ImageEditorView.prototype.initialize = function ImageEditorView$initialize() {
    this.callBase("Tridion.Cme.View", "initialize");
    var p = this.properties;
    var c = p.controls;
    p.features = [];

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
    c.BtnCrop = $controls.getControl($("#BtnCrop"), "Tridion.Controls.Button");
    c.BtnRotate = $controls.getControl($("#BtnRotate"), "Tridion.Controls.Button");
    c.BtnResize = $controls.getControl($("#BtnResize"), "Tridion.Controls.Button");

    c.Image = $("#image");
    c.Holder = $("#holder");
    c.Filters = $("#Filters");

    $evt.addEventHandler(c.BtnSaveAndClose, "click", this.getDelegate(this._onSaveAndCloseClick));
    $evt.addEventHandler(c.BtnCancel, "click", this.getDelegate(this._close));
    $evt.addEventHandler(c.BtnFilters, "click", Function.getDelegate(this, this._onFeatureClick, ["Filters"]));
    $evt.addEventHandler(c.BtnCrop, "click", Function.getDelegate(this, this._onFeatureClick, ["Crop"]));
    $evt.addEventHandler(c.BtnRotate, "click", Function.getDelegate(this, this._onFeatureClick, ["Rotate"]));
    $evt.addEventHandler(c.BtnResize, "click", Function.getDelegate(this, this._onFeatureClick, ["Resize"]));
    

    function onSchemaLoaded(e) {
        if (e) {
            removeSchemaHandlers(e);
        }
        //TODO: MIGHT NEED TO SHOW FIELD BUIDLER FOR METADATA
        var readOnly = item.isReadOnly() || item.isShared() || false || !p.isModifified;
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
    p.imgSrc = "{0}?uri={1}&mofified={2}".format(url, encodeURIComponent(p.itemId), unique.isoString());
    c.Image.src = p.imgSrc;
    p.caman = Caman(c.Image, p.imgSrc, function () {
        // manipulate image here
        this.render();
    });
    this._initializeFeatures();
};

//View Actions
Tridion.Extensions.UI.FBI.Views.ImageEditorView.prototype._close = function ImageEditorView$_close(e) {
    var isCanceled = false;
    if (e && e.source == this.properties.controls.BtnCancel) {
        isCanceled = true;
    }

    this.fireEvent("cancel", { canceled: isCanceled });
};

Tridion.Extensions.UI.FBI.Views.ImageEditorView.prototype._onSaveAndCloseClick = function ImageEditorView$_onSaveAndCloseClick(e) {
    var p = this.properties;
    var item = $models.getItem(p.itemId);
    this._close(e);
};

Tridion.Extensions.UI.FBI.Views.ImageEditorView.prototype.enableSave = function ImageEditorView$enableSave() {
    var p = this.properties;
    var c = p.controls;
    c.BtnSaveAndClose.enabled = true;
};

//Layout
Tridion.Extensions.UI.FBI.Views.ImageEditorView.prototype.displayCanvas = function ImageEditorView$displayCanvas(visible) {
    var p = this.properties;
    var c = p.controls;
    if (visible) {
        $jquery(c.Image).show();
    } else {
        $jquery(c.Image).hide();
    }
};


//Features  
Tridion.Extensions.UI.FBI.Views.ImageEditorView.prototype._initializeFeatures = function ImageEditorView$_initializeFeatures() {
    var p = this.properties;
    var c = p.controls;

    
    this._addNewFeature(
        "Crop",
        c.BtnCrop,
        Function.getDelegate(this, this._initializeCrop, []),
        Function.getDelegate(this, this._destroyCrop, []),
        Function.getDelegate(this, this._getCropInput, []),
        false
    );
    

    this._addNewFeature(
        "Filters", c.BtnFilters,
        Function.getDelegate(this, this._initializeFilters, []),
        Function.getDelegate(this, this._destroyFilters, []),
        Function.getDelegate(this, this._getFiltersInput, []),
        true
    );
    

    this._addNewFeature(
        "Rotate",
        c.BtnRotate,
        Function.getDelegate(this, this._initializeRotate, []),
        Function.getDelegate(this, this._destroyRotate, []),
        Function.getDelegate(this, this._getRotateInput, []),
        false
    );
    
    this._addNewFeature(
        "Resize",
        c.BtnResize,
        Function.getDelegate(this, this._initializeResize, []),
        Function.getDelegate(this, this._destroyResize, []),
        Function.getDelegate(this, this._getResizeInput, []),
        false
    );
};

Tridion.Extensions.UI.FBI.Views.ImageEditorView.prototype.getFeature = function ImageEditorView$getFeature(id) {
    var p = this.properties;
    return p.features[id];
};

Tridion.Extensions.UI.FBI.Views.ImageEditorView.prototype._onFeatureClick = function ImageEditorView$_onFeatureClick(feature) {
    var p = this.properties;
    var clickedFeature = this.getFeature(feature);


    for (var i = 0; i < p.features.length; i++) {
        var id = p.features[i];
        var f = p.features[id];
        if (feature != id) {
            if (f.isActive) {
                f.stop();
                f.b.toggleOff();
                f.isActive = false;
            }
        }
    }

    if (!clickedFeature.isActive) {
        clickedFeature.start();
        clickedFeature.b.toggleOn();
        clickedFeature.isActive = true;
        this.displayCanvas(clickedFeature.displayCanvas);
    } else {
        clickedFeature.stop();
        clickedFeature.b.toggleOff();
        clickedFeature.isActive = false;
        this.displayCanvas(true);
    }
};

//Filters Feature 
Tridion.Extensions.UI.FBI.Views.ImageEditorView.prototype._addNewFeature = function ImageEditorView$_addNewFeature(id, button, start, stop, input, displayCanvas) {
    var p = this.properties;
    var f = p.features;
    var newFeature;
    if (!(typeof f[id] === "undefined")) {
        newFeature = f[id];
    } else {
        f.push(id);
    }
    newFeature = {
        id: id,
        isActive: false,
        displayCanvas: displayCanvas,
        b: button,
        start: start,
        stop: stop,
        save: alert,
        getInput: input

    };
    
    f[id] = newFeature;
    
};

Tridion.Extensions.UI.FBI.Views.ImageEditorView.prototype._destroyFilters = function ImageEditorView$_destroyFilters() {
    var p = this.properties;
    var c = p.controls;
    $css.undisplay(c.Filters);
    
};

Tridion.Extensions.UI.FBI.Views.ImageEditorView.prototype._getFiltersInput = function ImageEditorView$_getFiltersInput() {
    //Tridion.Extensions.UI.FBI.Model.Services.FBI.SchemaFieldImageEditor.Data.FiltersImageEditorInput
    var input = this.getInput("Filters");
    if (typeof input === "undefined") {
        input = {
            
        };
    }
    return input;
};

Tridion.Extensions.UI.FBI.Views.ImageEditorView.prototype._initializeFilters = function ImageEditorView$_initializeFilters() {
    var p = this.properties;
    var c = p.controls;
    
    function debounce(fn, delay) {
        var timer = null;
        return function() {
            var context = this, args = arguments;
            clearTimeout(timer);
            timer = setTimeout(function() {
                fn.apply(context, args);
            }, delay);
        };
    }

    if (typeof p.filtersInitialized === "undefined") {
        $jquery("div.FilterSetting > input[type=range]").on('change', debounce(function(event) {
            var filter = $jquery(this).attr('data-filter');
            var value = $jquery(this).val();
            var span = $jquery(this).next();
            span.html(value);
            p.caman.revert(false);
            p.caman[filter](value).render();
            p.isModified = true;
        }, 200));
        p.filtersInitialized = true;
    }
    
    $css.display(c.Filters);
};

//Crop Feature
Tridion.Extensions.UI.FBI.Views.ImageEditorView.prototype._getCropInput = function ImageEditorView$_getCropInput() {
    //Tridion.Extensions.UI.FBI.Model.Services.FBI.SchemaFieldImageEditor.Data.CropImageEditorInput
    var input = this.getInput("Crop");
    if (typeof input === "undefined") {
        input = {
            X: -1,
            Y: -1,
            Height: -1,
            Width: -1
        };
    }
    return input;
};

Tridion.Extensions.UI.FBI.Views.ImageEditorView.prototype._destroyCrop = function ImageEditorView$_destroyCrop() {
    var p = this.properties;
    
    if (!(typeof p.crop === "undefined")) {
        p.crop.destroy();
    }
    p.crop = undefined;

};

Tridion.Extensions.UI.FBI.Views.ImageEditorView.prototype._initializeCrop = function ImageEditorView$_initializeCrop() {
    var p = this.properties;
    var self = this;
    
    function updateCropInput(c) {
        var input = this.getInput("Crop");
        input.X = Math.round(c.x);
        input.Y = Math.round(c.y);
        input.Width = Math.round(a.x2);
        input.Height = Math.round(a.y2);
        p.inputs["Crop"] = input;
        self.enableSave();
    }

    p.crop = $jquery.Jcrop(this.getImageElement());
    p.crop.onChange = updateCropInput;
    p.crop.onSelect = updateCropInput;
    
    var dim = p.crop.getBounds();
    p.crop.animateTo([ //x,y,x2,y2 
            Math.round(0),
            Math.round(0),
            Math.round(dim[0]),
            Math.round(dim[1])
    ]);
    
};

//Resize Feature
Tridion.Extensions.UI.FBI.Views.ImageEditorView.prototype._destroyResize = function ImageEditorView$_destroyResize() {
    var p = this.properties;
    if (!(typeof p.resizable === "undefined")) {
        p.resizable.resizable("destroy");
        p.resizable.remove();
    } 
    p.resizable = undefined;

};

Tridion.Extensions.UI.FBI.Views.ImageEditorView.prototype._initializeResize = function ImageEditorView$_initializeResize() {
    var p = this.properties;
    p.resizable = $jquery(this.getImageElement()).resizable({
        helper: "ui-resizable-helper"
    });
};

Tridion.Extensions.UI.FBI.Views.ImageEditorView.prototype._getResizeInput = function ImageEditorView$_getResizeInput() {
    //Tridion.Extensions.UI.FBI.Model.Services.FBI.SchemaFieldImageEditor.Data.ResizeImageEditorInput
    var input = this.getInput("Resize");
    if (typeof input === "undefined") {
        input = {
            Height: -1,
            Width: -1
        };
    }
    return input;
};


//Rotate Feature
Tridion.Extensions.UI.FBI.Views.ImageEditorView.prototype._destroyRotate = function ImageEditorView$_destroyRotate() {
    var p = this.properties;
    if (!(typeof p.raphael === "undefined")) {
        p.raphael.remove();
        p.raphael = undefined;
    }

};

Tridion.Extensions.UI.FBI.Views.ImageEditorView.prototype._initializeRotate = function ImageEditorView$_initializeRotate() {
    var p = this.properties;
    var c = p.controls;
    
    var src = p.imgSrc;
    var angle = 0;
    c.Holder.innerHTML = "";
    
    p.raphael = Raphael(c.Holder, 640, 480);
    
    
    p.raphael.circle(320, 240, 200).attr({ fill: "#a1a9b2", "fill-opacity": .5, "stroke-width": 0 });
    p.raphaelImg = p.raphael.image(src, 160, 120, 320, 240);
    var rotateLeft = p.raphael.set();
    var rotateRight = p.raphael.set();
    
    rotateLeft.push(p.raphael.circle(24.833, 26.917, 26.667).attr({ stroke: "#ccc", fill: "#fff", "fill-opacity": .8, "stroke-width": 2 }),
               p.raphael.path("M12.582,9.551C3.251,16.237,0.921,29.021,7.08,38.564l-2.36,1.689l4.893,2.262l4.893,2.262l-0.568-5.36l-0.567-5.359l-2.365,1.694c-4.657-7.375-2.83-17.185,4.352-22.33c7.451-5.338,17.817-3.625,23.156,3.824c5.337,7.449,3.625,17.813-3.821,23.152l2.857,3.988c9.617-6.893,11.827-20.277,4.935-29.896C35.591,4.87,22.204,2.658,12.582,9.551z").attr({ stroke: "none", fill: "#1A8517" }),
               p.raphael.circle(24.833, 26.917, 26.667).attr({ fill: "#1A9817", opacity: 0 }));
    rotateRight.push(p.raphael.circle(24.833, 26.917, 26.667).attr({ stroke: "#ccc", fill: "#fff", "fill-opacity": .8, "stroke-width": 2 }),
               p.raphael.path("M37.566,9.551c9.331,6.686,11.661,19.471,5.502,29.014l2.36,1.689l-4.893,2.262l-4.893,2.262l0.568-5.36l0.567-5.359l2.365,1.694c4.657-7.375,2.83-17.185-4.352-22.33c-7.451-5.338-17.817-3.625-23.156,3.824C6.3,24.695,8.012,35.06,15.458,40.398l-2.857,3.988C2.983,37.494,0.773,24.109,7.666,14.49C14.558,4.87,27.944,2.658,37.566,9.551z").attr({ stroke: "none", fill: "#1A8517" }),
               p.raphael.circle(24.833, 26.917, 26.667).attr({ fill: "#1A9817", opacity: 0 }));

    rotateLeft.translate(10, 181);
    rotateRight.translate(10, 245);
    
    rotateLeft[2].click(function () {
        angle -= 90;
        p.raphaelImg.stop().animate({ transform: "r" + angle }, 1000, "<>");
    }).mouseover(function () {
        rotateLeft[1].animate({ fill: "#54C851 " }, 300);
    }).mouseout(function () {
        rotateLeft[1].stop().attr({ fill: "#1A8517" });
    });


    rotateRight[2].click(function () {
        angle += 90;
        p.raphaelImg.animate({ transform: "r" + angle }, 1000, "<>");
    }).mouseover(function () {
        rotateRight[1].animate({ fill: "#54C851" }, 300);
    }).mouseout(function () {
        rotateRight[1].stop().attr({ fill: "#1A8517" });
    });

};


Tridion.Extensions.UI.FBI.Views.ImageEditorView.prototype._getRotateInput = function ImageEditorView$_getRotateInput() {
    //Tridion.Extensions.UI.FBI.Model.Services.FBI.SchemaFieldImageEditor.Data.RotateImageEditorInput
    var input = this.getInput("Rotate");
    if (typeof input === "undefined") {
        input = {
            Angle: 0
        };
    }
    
    return input;
};

//Utils -------------------------------
Tridion.Extensions.UI.FBI.Views.ImageEditorView.prototype.getImageElement = function ImageEditorView$getImageElement() {
    var p = this.properties;
    $jquery('.temp-img').remove();
    return $jquery("<img id='{0}' src='{1}' class='temp-img' />".format("img_" + Date.now(), p.imgSrc)).appendTo("#holder");
};

Tridion.Extensions.UI.FBI.Views.ImageEditorView.prototype.getInput = function ImageEditorView$getInput(action) {
    var p = this.properties;
    return p.inputs[action];
};

$display.registerView(Tridion.Extensions.UI.FBI.Views.ImageEditorView);

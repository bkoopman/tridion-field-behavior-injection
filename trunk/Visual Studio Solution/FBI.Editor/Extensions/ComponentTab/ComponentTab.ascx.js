Type.registerNamespace("Tridion.Extensions.UI.FBI.Tabs");
Tridion.Extensions.UI.FBI.Tabs.FBITab = function FBITab(element) {
    Tridion.OO.enableInterface(this, "Tridion.Extensions.UI.FBI.Tabs.FBITab");
    this.properties = {};
    this.properties.controls = {};
    this.properties.controls.tabControl = $controls.getControl($("#MasterTabControl"), "Tridion.Controls.TabControl");

    this.initialize();
    //Remove it when done
    $dom.removeNode($("#FBIComponentTab_switch"));
};




Tridion.Extensions.UI.FBI.Tabs.FBITab.prototype.initialize = function FBITab$initialize() {
    var p = this.properties;
    var c = p.controls;
    $fbi = new Tridion.Extensions.UI.FBI.Handler(c.tabControl);
    $fbi.initialize();
    
};


Tridion.Extensions.UI.FBI.Tabs.FBITab.prototype.select = function FBITab$select() {
    //Not needed
};

Tridion.Extensions.UI.FBI.Tabs.FBITab.prototype.updateView = function FBITab$updateView() {
    //Not needed
};

Tridion.Controls.Deck.registerPageType(Tridion.Extensions.UI.FBI.Tabs.FBITab, "FBIComponentTab");



//************************************************************************************************************
// FBI Handler
Type.registerNamespace("Tridion.Extensions.UI.FBI");
Tridion.Extensions.UI.FBI.Handler = function FBIHandler(tabControl) {
    Tridion.OO.enableInterface(this, "Tridion.Extensions.UI.FBI.Handler");
    this.properties = {};
    this.properties.tabControl = tabControl;
};

Tridion.Extensions.UI.FBI.Handler.prototype.initialize = function FBIHandler$initialize() {
    var p = this.properties;
    p.behaviourHandlers = [];
    
    var editor = $config.Editors[$fbiConst.EDITOR_NAME].configuration;
    if (editor) {
        var confXml = $xml.getNewXmlDocument(editor);
        var confObj = $xml.toJson(confXml);
        for (var i = 0; i < confObj.length; i++) {
            var handler = {};
            handler.name = confObj[i]["@name"];
            handler.handler = confObj[i]["@handler"];
            p.behaviourHandlers.push(handler);
        }

    }
    //$evt.addEventHandler(p.tabControl, "select", this.applyBehaviours);
};

Tridion.Extensions.UI.FBI.Handler.prototype.applyBehaviours = function FBIHandler$applyBehaviours(e) {
    var selectedPage = e.source;
    //console.debug("ApplyBehaviours for: " + selectedPage.getId());
};




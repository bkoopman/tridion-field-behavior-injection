/// <reference path="../../FBI.Model/Scripts/Handler/FBIHandler.js" />
Type.registerNamespace("Tridion.Extensions.UI.FBI.Tabs");

Tridion.Extensions.UI.FBI.Tabs.FBITab = function FBITab(element) {
    Tridion.OO.enableInterface(this, "Tridion.Extensions.UI.FBI.Tabs.FBITab");
    this.properties = {};
    this.properties.controls = {};
    this.initialize();
    //TODO: Remove it when done
    /*if (!$fbiConfig.showTab()) {
        $dom.removeNode($("#FBIComponentTab_switch"));
    }*/
    
};


Tridion.Extensions.UI.FBI.Tabs.FBITab.prototype.initialize = function FBITab$initialize() {

    $fbi.initialize();
};


Tridion.Extensions.UI.FBI.Tabs.FBITab.prototype.select = function FBITab$select() {
    //Not needed
};

Tridion.Extensions.UI.FBI.Tabs.FBITab.prototype.updateView = function FBITab$updateView() {
    //Not needed
};

Tridion.Controls.Deck.registerPageType(Tridion.Extensions.UI.FBI.Tabs.FBITab, $fbiConst.FBI_COMPONENT_TAB);



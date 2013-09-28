Type.registerNamespace("FBIComponentTab");

FBIComponentTab.ComponentTab = function FBIComponentTab$ComponentTab(element) {
    if ($ptUtils.isCurrentUserAdmin()) {
        Tridion.OO.enableInterface(this, "ItemXmlTab.ItemXmlTab");
        this.addInterface("Tridion.Controls.DeckPage", [element]);
    }
    else {
        $j("#ItemXmlTab_switch").hide();
    }
};

FBIComponentTab.ComponentTab.prototype.initialize = function FBIComponentTab$initialize() {
    this.callBase("Tridion.Controls.DeckPage", "initialize");
    $evt.addEventHandler($display.getItem(), "load", this.getDelegate(this.updateView));
};

FBIComponentTab.ComponentTab.prototype.select = function FBIComponentTab$select() {
    this.callBase("Tridion.Controls.DeckPage", "select");
    this.updateView();
};

FBIComponentTab.ComponentTab.prototype.updateView = function FBIComponentTab$updateView() {
    if (this.isSelected()) {
            var html = "hello world";
            $dom.setOuterHTML($("#ComponentTab"), html);
    }
};

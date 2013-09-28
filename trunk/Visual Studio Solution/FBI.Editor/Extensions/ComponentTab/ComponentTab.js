Type.registerNamespace("ComponentTab");

ComponentTab.ComponentTab = function ComponentTab$ComponentTab(element) {
    if ($ptUtils.isCurrentUserAdmin()) {
        Tridion.OO.enableInterface(this, "ItemXmlTab.ItemXmlTab");
        this.addInterface("Tridion.Controls.DeckPage", [element]);
    }
    else {
        $j("#ItemXmlTab_switch").hide();
    }
};

ItemXmlTab.ItemXmlTab.prototype.initialize = function ItemXmlTab$initialize() {
    this.callBase("Tridion.Controls.DeckPage", "initialize");
    $evt.addEventHandler($display.getItem(), "load", this.getDelegate(this.updateView));
};

ComponentTab.ComponentTab.prototype.select = function ComponentTab$select() {
    this.callBase("Tridion.Controls.DeckPage", "select");
    this.updateView();
};

ComponentTab.ComponentTab.prototype.updateView = function ComponentTab$updateView() {
    if (this.isSelected()) {
            var html = "hello world";
            $dom.setOuterHTML($("#ComponentTab"), html);
    }
};

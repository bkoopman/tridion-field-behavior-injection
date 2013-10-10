Type.registerNamespace("Tridion.Extensions.UI.FBI.Tabs");
Tridion.Extensions.UI.FBI.Tabs.FBITab = function FBITab(element) {
    Tridion.OO.enableInterface(this, "Tridion.Extensions.UI.FBI.Tabs.FBITab");
    this.addInterface("Tridion.Controls.DeckPage", [element]);
};

Tridion.Extensions.UI.FBI.Tabs.FBITab.prototype.initialize = function initialize() {
    this.callBase("Tridion.Controls.DeckPage", "initialize");
    $evt.addEventHandler($display.getItem(), "load", this.getDelegate(this.updateView));
};

Tridion.Extensions.UI.FBI.Tabs.FBITab.prototype.select = function select() {
    this.callBase("Tridion.Controls.DeckPage", "select");
    this.updateView();
};

Tridion.Extensions.UI.FBI.Tabs.FBITab.prototype.updateView = function updateView() {
    if (this.isSelected()) {
        alert('hell2o');

    }
};

Tridion.Controls.Deck.registerPageType(Tridion.Extensions.UI.FBI.Tabs.FBITab, "FBIComponentTab");

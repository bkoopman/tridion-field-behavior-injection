Type.registerNamespace("Tridion.Extensions.UI.FBI.Tabs");
Tridion.Extensions.UI.FBI.Tabs.ComponentTab = function ComponentTab(element) {
    Tridion.OO.enableInterface(this, "Tridion.Extensions.UI.FBI.Tabs.ComponentTab");
    this.addInterface("Tridion.Controls.DeckPage", [element]);
};

Tridion.Extensions.UI.FBI.Tabs.ComponentTab.prototype.initialize = function initialize() {
    this.callBase("Tridion.Controls.DeckPage", "initialize");
    $evt.addEventHandler($display.getItem(), "load", this.getDelegate(this.updateView));
};

Tridion.Extensions.UI.FBI.Tabs.ComponentTab.prototype.select = function select() {
    this.callBase("Tridion.Controls.DeckPage", "select");
    this.updateView();
};

Tridion.Extensions.UI.FBI.Tabs.ComponentTab.prototype.updateView = function updateView() {
    if (this.isSelected()) {
        alert('hello');

    }
};

Tridion.Controls.Deck.registerPageType(Tridion.Extensions.UI.FBI.Tabs.ComponentTab, "FBIComponentTab");

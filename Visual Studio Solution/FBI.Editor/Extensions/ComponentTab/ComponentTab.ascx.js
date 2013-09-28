Type.registerNamespace("Tridion.Extensions.UI.FBI");

console.debug("FBI Component Tab JS LOADED");

Tridion.Extensions.UI.FBI.ComponentTab = function ComponentTab(element) {
    Tridion.OO.enableInterface(this, "Tridion.Extensions.UI.FBI.ComponentTab");
    this.addInterface("Tridion.Controls.DeckPage", [element]);
    //$j("#FBIComponentTab_switch").hide();
    console.debug("FBI Component Tab ");
};

Tridion.Extensions.UI.FBI.ComponentTab.prototype.initialize = function initialize() {
    console.debug("FBI Component Tab Initialize entered");
    this.callBase("Tridion.Controls.DeckPage", "initialize");
    $evt.addEventHandler($display.getItem(), "load", this.getDelegate(this.updateView));
};

Tridion.Extensions.UI.FBI.ComponentTab.prototype.select = function select() {
    console.debug("FBI Component Tab Selected");
    this.callBase("Tridion.Controls.DeckPage", "select");
    this.updateView();
};

Tridion.Extensions.UI.FBI.ComponentTab.prototype.updateView = function updateView() {

    console.debug("FBI Component Tab Update View Entered");
    if (this.isSelected()) {
        var html = "hello world";
        alert(html);
        $dom.setOuterHTML($("#ComponentTab"), html);


    }
};

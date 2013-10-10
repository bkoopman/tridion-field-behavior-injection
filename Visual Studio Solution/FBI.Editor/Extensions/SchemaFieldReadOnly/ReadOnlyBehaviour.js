Type.registerNamespace("Tridion.Extensions.UI.FBI.Behaviours");

Tridion.Extensions.UI.FBI.Behaviours.ReadOnlyBehaviour = function ReadOnlyBehaviour() {
    Tridion.OO.enableInterface(this, "Tridion.Extensions.UI.FBI.Behaviours.ReadOnlyBehaviour");
    this.addInterface("Tridion.DisposableObject");
};

Tridion.Extensions.UI.FBI.Behaviours.ReadOnlyBehaviour.prototype.initialize = function ReadOnlyBehaviour$apply(deckPage) {
    console.debug("Applying ReadOnlyBehaviour");
};
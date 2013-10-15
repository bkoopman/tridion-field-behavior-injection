Tridion.Type.registerNamespace("Tridion.Extensions.UI.FBI.Behaviours.SchemaFieldValidation");

Tridion.Extensions.UI.FBI.Behaviours.SchemaFieldValidation.Configuration = function SFVConfiguration() {
    /// <summary>
    /// Handler class to deal with the behaviours configuration, and triggers them.
    /// Moreover, it exposes a Helper class based on <see cref="Tridion.Extensions.UI.FBI.SchemaFieldBehaviourHelper"/>
    /// </summary>
    Tridion.OO.enableInterface(this, "Tridion.Extensions.UI.FBI.Behaviours.SchemaFieldValidation.Configuration");
    this.properties = {};
    this.properties.controls =
    {
        tabControl: $controls.getControl($("#MasterTabControl"), "Tridion.Controls.TabControl")
    };
};

Tridion.Extensions.UI.FBI.Behaviours.SchemaFieldValidation.Configuration.prototype.getValidationRules = function SFVConfiguration$getValidationRules() {
    var p = this.properties;
    p.validationRules = {};



};

$fbiValidationConfig = Tridion.Extensions.UI.FBI.Behaviours.SchemaFieldValidation.Configuration;



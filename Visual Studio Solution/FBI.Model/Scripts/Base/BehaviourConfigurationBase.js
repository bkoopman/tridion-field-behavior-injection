﻿/// <reference path="../Costants/FBIConstants.js" />
Type.registerNamespace("Tridion.Extensions.UI.FBI");

Tridion.Extensions.UI.FBI.BehaviourConfigurationBase = function BehaviourConfigurationBase() {
    /// <summary>
    /// Behaviour Base to be used as the base class for all extended areas behaviours (ascx code behind). It contains useful methods for the behaviour manipulation
    /// </summary>
    Tridion.OO.enableInterface(this, "Tridion.Extensions.UI.FBI.BehaviourConfigurationBase");
    this.addInterface("Tridion.DisposableObject");
    this.key = "";
};

Tridion.Extensions.UI.FBI.BehaviourConfigurationBase.prototype.setKey = function BehaviourConfigurationBase$setKey(key) {
    /// <summary>
    /// Sets the behaviour key
    /// </summary>
    this.key = key;
};


Tridion.Extensions.UI.FBI.BehaviourConfigurationBase.prototype.getConfigurationValue = function BehaviourConfigurationBase$getConfigurationValue() {
    /// <summary>
    /// Gets the configuration value
    /// <returns type="string">The value</returns>
    /// </summary>
    var p = this.properties;
    var value = $fbiConfig.getConfigurationHelper().getConfigurationValue(p.selectedGroup, this.key);
    return value;

};

Tridion.Extensions.UI.FBI.BehaviourConfigurationBase.prototype.setConfigurationValue = function BehaviourConfigurationBase$setConfigurationValue(value) {
    /// <summary>
    /// Sets the configuration value
    /// <param name="value">The value</param>
    /// </summary>
    var p = this.properties;
    $fbiConfig.getConfigurationHelper().setConfigurationValue(p.selectedGroup, this.key, value);
};
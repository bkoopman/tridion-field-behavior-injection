Type.registerNamespace("Tridion.Extensions.FBI.Commands");
/**
* Implements the <c>ValidationSave</c> command
*/
Tridion.Extensions.FBI.Commands.DisableFBI = function FBICommands$DisableFBI() {
    Type.enableInterface(this, "Tridion.Extensions.FBI.Commands.DisableFBI");
    this.addInterface("Tridion.Cme.Command", ["DisableFBI"]);
    this.buttonId = "DisableFBIBtn";
};

/**
* Checks whether the command is Available or not
* @param {Tridion.Cme.Selection} selection The current selection.
* @param {Tridion.Cme.Pipeline} execution pipeline.
*/
Tridion.Extensions.FBI.Commands.DisableFBI.prototype._isAvailable = function DisableFBI$_isAvailable(selection, pipeline) {
    console.debug(Tridion.Runtime["IsAdministrator"]);
    console.debug(Tridion.Runtime["IsAdministrator"] == "1");
    return Tridion.Runtime["IsAdministrator"] == "1";
};

/**
* Checks whether the command is Enabled or not
* @param {Tridion.Cme.Selection} selection The current selection.
* @param {Tridion.Cme.Pipeline} execution pipeline.
*/
Tridion.Extensions.FBI.Commands.DisableFBI.prototype._isEnabled = function DisableFBI$_isEnabled(selection, pipeline) {
    if ($fbiConfig && !$fbiConfig.enabled) {
        var p = this.properties;
        var c = p.controls;
        c.fbiButton = $controls.getControl($(this.buttonId), "Tridion.Controls.RibbonButton");
        c.fbiButton.toggleOn();
    }
    return this._isAvailable(selection, pipeline);
};

/**
* Executes this command on the selection.
* @param {Tridion.Cme.Selection} selection The current selection.
* @param {Tridion.Cme.Pipeline} execution pipeline.
*/
Tridion.Extensions.FBI.Commands.DisableFBI.prototype._execute = function DisableFBI$_execute(selection, pipeline) {
    var p = this.properties;
    var c = p.controls;
    c.fbiButton = $controls.getControl($(this.buttonId), "Tridion.Controls.RibbonButton");
    var btn = c.fbiButton;
    
    
    if (btn.isOn()) {
        //Is disabled, need to enable
        btn.toggleOff();
        $fbiConfig.enabled = true;
        alert('enable');
    } else {
        //Is enabled, need to disable
        btn.toggleOn();
        $fbiConfig.enabled = false;
        alert('disable');
    }
};

Type.registerNamespace("Tridion.Extensions.FBI.Commands");
/**
* Implements the <c>ValidationSave</c> command
*/
Tridion.Extensions.FBI.Commands.DisableFBI = function FBICommands$DisableFBI() {
    Type.enableInterface(this, "Tridion.Extensions.FBI.Commands.DisableFBI");
    this.addInterface("Tridion.Cme.Command", ["DisableFBI"]);
    this.buttonId = "#DisableFBIBtn";
    this.properties.controls = {};
};

/**
* Checks whether the command is Available or not
* @param {Tridion.Cme.Selection} selection The current selection.
* @param {Tridion.Cme.Pipeline} execution pipeline.
*/
Tridion.Extensions.FBI.Commands.DisableFBI.prototype._isAvailable = function DisableFBI$_isAvailable(selection, pipeline) {
    return Tridion.Runtime["IsAdministrator"] == "1";
};

/**
* Checks whether the command is Enabled or not
* @param {Tridion.Cme.Selection} selection The current selection.
* @param {Tridion.Cme.Pipeline} execution pipeline.
*/
Tridion.Extensions.FBI.Commands.DisableFBI.prototype._isEnabled = function DisableFBI$_isEnabled(selection, pipeline) {
    
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
    if (typeof c.fbiButton === "undefined") {
        c.fbiButton = $controls.getControl($(this.buttonId), "Tridion.Controls.RibbonButton");
    }

    if (this.isFBILoaded()) {
        if ($fbiConfig.disabled) {
            c.fbiButton.setText($fbiConfig.getLabel("DisableFBILabel"));
            $fbi.enableActiveHandlers();
        } else {
            c.fbiButton.setText($fbiConfig.getLabel("EnableFBILabel"));
            $fbi.disableActiveHandlers();
        }
        $fbi.reApplyBehaviours();
        $fbiConfig.disabled = !$fbiConfig.disabled;
    }
    
};


Tridion.Extensions.FBI.Commands.DisableFBI.prototype.isFBILoaded = function DisableFBI$isFBILoaded() {
    var fbiConfigDefined = !(typeof $fbiConfig === "undefined");
    var fbiDefined = !(typeof $fbi === "undefined");
    return fbiConfigDefined && fbiDefined;
};

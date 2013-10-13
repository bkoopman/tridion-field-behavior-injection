Type.registerNamespace("Tridion.Extensions.FBI.Commands");
/**
* Implements the <c>ValidationSave</c> command
*/
Tridion.Extensions.FBI.Commands.EnableFBI = function FBICommands$EnableFBI() {
    Type.enableInterface(this, "Tridion.Extensions.FBI.Commands.EnableFBI");
    this.addInterface("Tridion.Cme.Command", ["EnableFBI"]);
};

/**
* Checks whether the command is Available or not
* @param {Tridion.Cme.Selection} selection The current selection.
* @param {Tridion.Cme.Pipeline} execution pipeline.
*/
Tridion.Extensions.FBI.Commands.EnableFBI.prototype._isAvailable = function EnableFBI$_isAvailable(selection, pipeline) {
    return Tridion.Runtime["IsAdministrator"] == "1";
};

/**
* Checks whether the command is Enabled or not
* @param {Tridion.Cme.Selection} selection The current selection.
* @param {Tridion.Cme.Pipeline} execution pipeline.
*/
Tridion.Extensions.FBI.Commands.EnableFBI.prototype._isEnabled = function EnableFBI$_isEnabled(selection, pipeline) {
    return this._isAvailable(selection, pipeline);
};

/**
* Executes this command on the selection.
* @param {Tridion.Cme.Selection} selection The current selection.
* @param {Tridion.Cme.Pipeline} execution pipeline.
*/
Tridion.Extensions.FBI.Commands.ValidationSave.prototype._execute = function EnableFBI$_execute(selection, pipeline) {
    alert('disable');
};

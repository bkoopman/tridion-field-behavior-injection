Type.registerNamespace("Tridion.Extensions.FBI.Commands");

/**
* Implements the <c>ValidationSave</c> command
*/
Tridion.Extensions.FBI.Commands.ValidationSave = function Commands$ValidationSave() {
    Type.enableInterface(this, "Tridion.Extensions.FBI.Commands.ValidationSave");
    this.addInterface("Tridion.Extensions.FBI.Commands.ValidationBaseCommand");
    this.addInterface("Tridion.Cme.Command", ["ValidationSave"]);
};

/**
* Checks whether the command is Available or not
* @param {Tridion.Cme.Selection} selection The current selection.
* @param {Tridion.Cme.Pipeline} execution pipeline.
*/
Tridion.Extensions.FBI.Commands.ValidationSave.prototype._isAvailable = function ValidationSave$_isAvailable(selection, pipeline) {
    return this.callBase("Tridion.Extensions.FBI.Commands.ValidationBaseCommand", "_isAvailable", [selection, pipeline]);
};

/**
* Checks whether the command is Enabled or not
* @param {Tridion.Cme.Selection} selection The current selection.
* @param {Tridion.Cme.Pipeline} execution pipeline.
*/
Tridion.Extensions.FBI.Commands.ValidationSave.prototype._isEnabled = function ValidationSave$_isEnabled(selection, pipeline) {    
    return this.callBase("Tridion.Extensions.FBI.Commands.ValidationBaseCommand", "_isEnabled", [selection, pipeline]);
};

/**
* Executes this command on the selection.
* @param {Tridion.Cme.Selection} selection The current selection.
* @param {Tridion.Cme.Pipeline} execution pipeline.
*/
Tridion.Extensions.FBI.Commands.ValidationSave.prototype._execute = function ValidationSave$_execute(selection, pipeline) {
    this.callBase("Tridion.Extensions.FBI.Commands.ValidationBaseCommand", "_execute", [selection, pipeline, "Save"]);
};


/**
* Implements the <c>ValidationCheckIn</c> command
*/
Tridion.Extensions.FBI.Commands.ValidationCheckIn = function Commands$ValidationCheckIn() {
    Type.enableInterface(this, "Tridion.Extensions.FBI.Commands.ValidationCheckIn");
    this.addInterface("Tridion.Extensions.FBI.Commands.ValidationBaseCommand");
    this.addInterface("Tridion.Cme.Command", ["ValidationCheckIn"]);

};

/**
* Checks whether the command is Available or not
* @param {Tridion.Cme.Selection} selection The current selection.
* @param {Tridion.Cme.Pipeline} execution pipeline.
*/
Tridion.Extensions.FBI.Commands.ValidationCheckIn.prototype._isAvailable = function ValidationCheckIn$_isAvailable(selection, pipeline) {    
    return this.callBase("Tridion.Extensions.FBI.Commands.ValidationBaseCommand", "_isAvailable", [selection, pipeline]);
};

/**
* Checks whether the command is Enabled or not
* @param {Tridion.Cme.Selection} selection The current selection.
* @param {Tridion.Cme.Pipeline} execution pipeline.
*/
Tridion.Extensions.FBI.Commands.ValidationCheckIn.prototype._isEnabled = function ValidationCheckIn$_isEnabled(selection, pipeline) {
    return this.callBase("Tridion.Extensions.FBI.Commands.ValidationBaseCommand", "_isEnabled", [selection, pipeline]);
};

/**
* Executes this command on the selection.
* @param {Tridion.Cme.Selection} selection The current selection.
* @param {Tridion.Cme.Pipeline} execution pipeline.
*/
Tridion.Extensions.FBI.Commands.ValidationCheckIn.prototype._execute = function ValidationCheckIn$_execute(selection, pipeline) {
    this.callBase("Tridion.Extensions.FBI.Commands.ValidationBaseCommand", "_execute", [selection, pipeline, "CheckIn"]);
};
/**
* Implements the <c>ValidationSaveNew</c> command
*/
Tridion.Extensions.FBI.Commands.ValidationSaveNew = function Commands$ValidationSaveNew() {
    Type.enableInterface(this, "Tridion.Extensions.FBI.Commands.ValidationSaveNew");
    this.addInterface("Tridion.Extensions.FBI.Commands.ValidationBaseCommand");
    this.addInterface("Tridion.Cme.Command", ["ValidationSaveNew"]);

};

/**
* Checks whether the command is Available or not
* @param {Tridion.Cme.Selection} selection The current selection.
* @param {Tridion.Cme.Pipeline} execution pipeline.
*/
Tridion.Extensions.FBI.Commands.ValidationSaveNew.prototype._isAvailable = function ValidationSaveNew$_isAvailable(selection, pipeline) {    
    return this.callBase("Tridion.Extensions.FBI.Commands.ValidationBaseCommand", "_isAvailable", [selection, pipeline]);
};

/**
* Checks whether the command is Enabled or not
* @param {Tridion.Cme.Selection} selection The current selection.
* @param {Tridion.Cme.Pipeline} execution pipeline.
*/
Tridion.Extensions.FBI.Commands.ValidationSaveNew.prototype._isEnabled = function ValidationSaveNew$_isEnabled(selection, pipeline) {
    return this.callBase("Tridion.Extensions.FBI.Commands.ValidationBaseCommand", "_isEnabled", [selection, pipeline]);
};

/**
* Executes this command on the selection.
* @param {Tridion.Cme.Selection} selection The current selection.
* @param {Tridion.Cme.Pipeline} execution pipeline.
*/
Tridion.Extensions.FBI.Commands.ValidationSaveNew.prototype._execute = function ValidationSaveNew$_execute(selection, pipeline) {
    this.callBase("Tridion.Extensions.FBI.Commands.ValidationBaseCommand", "_execute", [selection, pipeline, "SaveNew"]);
};

/**
* Implements the <c>ValidationSaveClose</c> command
*/
Tridion.Extensions.FBI.Commands.ValidationSaveClose = function Commands$ValidationSaveClose() {
    Type.enableInterface(this, "Tridion.Extensions.FBI.Commands.ValidationSaveClose");
    this.addInterface("Tridion.Extensions.FBI.Commands.ValidationBaseCommand");
    this.addInterface("Tridion.Cme.Command", ["ValidationSaveClose"]);

};

/**
* Checks whether the command is Available or not
* @param {Tridion.Cme.Selection} selection The current selection.
* @param {Tridion.Cme.Pipeline} execution pipeline.
*/
Tridion.Extensions.FBI.Commands.ValidationSaveClose.prototype._isAvailable = function ValidationSaveClose$_isAvailable(selection, pipeline) {    
    return this.callBase("Tridion.Extensions.FBI.Commands.ValidationBaseCommand", "_isAvailable", [selection, pipeline]);
};

/**
* Checks whether the command is Enabled or not
* @param {Tridion.Cme.Selection} selection The current selection.
* @param {Tridion.Cme.Pipeline} execution pipeline.
*/
Tridion.Extensions.FBI.Commands.ValidationSaveClose.prototype._isEnabled = function ValidationSaveClose$_isEnabled(selection, pipeline) {
    return this.callBase("Tridion.Extensions.FBI.Commands.ValidationBaseCommand", "_isEnabled", [selection, pipeline]);
};

/**
* Executes this command on the selection.
* @param {Tridion.Cme.Selection} selection The current selection.
* @param {Tridion.Cme.Pipeline} execution pipeline.
*/
Tridion.Extensions.FBI.Commands.ValidationSaveClose.prototype._execute = function ValidationSaveClose$_execute(selection, pipeline) {
    this.callBase("Tridion.Extensions.FBI.Commands.ValidationBaseCommand", "_execute", [selection, pipeline, "SaveClose"]);
};
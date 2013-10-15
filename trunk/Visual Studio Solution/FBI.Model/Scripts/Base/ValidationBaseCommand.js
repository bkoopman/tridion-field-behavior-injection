Type.registerNamespace("Tridion.Extensions.FBI.Commands");
/**
* Implements the <c>ValidationSave</c> command
*/
Tridion.Extensions.FBI.Commands.ValidationBaseCommand = function Commands$ValidationBaseCommand() {
    Type.enableInterface(this, "Tridion.Extensions.FBI.Commands.ValidationBaseCommand");
};

/**
* Checks whether the command is Available or not
* @param {Tridion.Cme.Selection} selection The current selection.
* @param {Tridion.Cme.Pipeline} execution pipeline.
*/
Tridion.Extensions.FBI.Commands.ValidationBaseCommand.prototype._isAvailable = function ValidationBaseCommand$_isAvailable(selection, pipeline) {
    return true;
};

/**
* Checks whether the command is Enabled or not
* @param {Tridion.Cme.Selection} selection The current selection.
* @param {Tridion.Cme.Pipeline} execution pipeline.
*/
Tridion.Extensions.FBI.Commands.ValidationBaseCommand.prototype._isEnabled = function ValidationBaseCommand$_isEnabled(selection, pipeline) {
    return this._isAvailable(selection, pipeline);
};

/**
* Executes this command on the selection.
* @param {Tridion.Cme.Selection} selection The current selection.
* @param {Tridion.Cme.Pipeline} execution pipeline.
*/
Tridion.Extensions.FBI.Commands.ValidationBaseCommand.prototype._execute = function ValidationBaseCommand$_execute(selection, pipeline, commandName) {
    var itemUri = selection.getItem(0);
    var item = $models.getItem(itemUri);
    var command = $cme.getCommand(commandName);
    
    var user = $models.getItem(Tridion.UI.UserSettings.getJsonUserSettings()["User"]["@ID"]);


    if (user.isLoaded()) {
        Validation$onUserReady(user);
    } else {
        $evt.addEventHandler(user, "load", Validation$onUserReady);
        user.load();
    }


    function Validation$onUserReady(e) {
        var u = e;
        if (e.source) {
            u = e.source;
        }
        
        if (item.getItemType() == $const.ItemType.COMPONENT) {
            
            var inputs = Tridion.Extensions.FBI.Commands.ValidationBaseCommand.GetValidationFields(selection, u);

            if (inputs.length > 0) {
                Tridion.Extensions.FBI.Commands.Services.FBIServices.ValidateField(inputs,
                    function (result) {
                        if (!result.Success) {
                            $messages.registerWarning(result.ErrorMessage);
                        } else {
                            return command._execute(selection, pipeline);
                        }
                    },
                    function (error) {
                        console.debug(error);
                        return;
                    }
                );
            }
            else {
                command._execute(selection, pipeline);
            }
        } else {
            command._execute(selection, pipeline);
        }
    }

    
};

Tridion.Extensions.FBI.Commands.ValidationBaseCommand.GetValidationFields = function ValidationBaseCommand$GetValidationFields(selection, user) {
    var itemUri = selection.getItem(0);
    var item = $models.getItem(itemUri);
    var inputs = [];
    if (item) {
        if (item.getItemType() == $const.ItemType.COMPONENT) {
            var schema = item.getSchema();
            //Content
            var fields = schema.getStaticFields();            
            var contentFieldBuilder = false;
            var mdFieldBuilder = false;

            if ($display.getView().getId() == "ComponentView") {
                contentFieldBuilder = $display.getView().properties.controls.fieldBuilder;
                var tabControl = $display.getView().properties.controls.TabControl;
                var mdTab = tabControl.getPage("MetadataTab");
                if (mdTab) {
                    mdFieldBuilder = mdTab.properties.controls.fieldBuilder;
                }
            }
            

            Tridion.Extensions.FBI.Commands.ValidationBaseCommand.GetInputs(item.getXml(), schema, fields, contentFieldBuilder, inputs, user);
            schema = item.getMetadataSchema();
            fields = schema.getStaticMetadataFields();
            Tridion.Extensions.FBI.Commands.ValidationBaseCommand.GetInputs(item.getMetadata(), schema, fields, mdFieldBuilder, inputs, user);
            
        }
    }
    return inputs;
};


Tridion.Extensions.FBI.Commands.ValidationBaseCommand.GetInputs = function ValidationBaseCommand$GetInputs(xml, schema,  fields, fieldBuilder, existingInputs, user) {
    var p = this.properties;
    var inputs = existingInputs || [];
    var xmlFields = $xml.getNewXmlDocument(fields);
    var schemaFields = $xml.selectNodes(xmlFields, "/*/*");
    
    for (var i = 0; i < schemaFields.length; i++) {
        var fieldXml = schemaFields[i];
        var configValue = $fbi.getConfigurationHelper().hasConfigurationValueFromFieldXml(fieldXml, $fbiConst.VALIDATION, user);
        if (configValue && configValue.length > 0) {
            
            var fieldName = $xml.getInnerText(fieldXml, 'tcm:Name');
            console.debug(fieldName);
            var input = {
                Type: configValue.value,
                FieldValue: $xml.getInnerXml($xml.getNewXmlDocument(xml), "//fvc:" + fieldName),
                FieldName: fieldName
            };
            console.debug(input);
            inputs.push(input);
        }
    }
};
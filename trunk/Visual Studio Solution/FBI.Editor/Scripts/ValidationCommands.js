Type.registerNamespace("Tridion.Extensions.FBI.Commands");

/**
* Implements the <c>ValidationSave</c> command
*/
Tridion.Extensions.FBI.Commands.ValidationSave = function Commands$ValidationSave() {
    Type.enableInterface(this, "Tridion.Extensions.FBI.Commands.ValidationSave");
    this.addInterface("Tridion.Cme.Command", ["ValidationSave"]);
};

/**
* Checks whether the command is Available or not
* @param {Tridion.Cme.Selection} selection The current selection.
* @param {Tridion.Cme.Pipeline} execution pipeline.
*/
Tridion.Extensions.FBI.Commands.ValidationSave.prototype._isAvailable = function ValidationSave$_isAvailable(selection, pipeline) {    
    return true;
};

/**
* Checks whether the command is Enabled or not
* @param {Tridion.Cme.Selection} selection The current selection.
* @param {Tridion.Cme.Pipeline} execution pipeline.
*/
Tridion.Extensions.FBI.Commands.ValidationSave.prototype._isEnabled = function ValidationSave$_isEnabled(selection, pipeline) {    
	return this._isAvailable(selection, pipeline);
};

/**
* Executes this command on the selection.
* @param {Tridion.Cme.Selection} selection The current selection.
* @param {Tridion.Cme.Pipeline} execution pipeline.
*/
Tridion.Extensions.FBI.Commands.ValidationSave.prototype._execute = function ValidationSave$_execute(selection, pipeline) {
    var itemUri = selection.getItem(0);
    var item = $models.getItem(itemUri);
    var command = $cme.getCommand("Save");

    if (item.getItemType() == $const.ItemType.COMPONENT) {
        var inputs = Tridion.Extensions.FBI.Commands.GetValidationFields(selection);
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
            return command._execute(selection, pipeline);
        }
    } else {        
        return command._execute(selection, pipeline);
    }

};


/**
* Implements the <c>ValidationCheckIn</c> command
*/
Tridion.Extensions.FBI.Commands.ValidationCheckIn = function Commands$ValidationCheckIn() {
    Type.enableInterface(this, "Tridion.Extensions.FBI.Commands.ValidationCheckIn");
    this.addInterface("Tridion.Cme.Command", ["ValidationCheckIn"]);  

};

/**
* Checks whether the command is Available or not
* @param {Tridion.Cme.Selection} selection The current selection.
* @param {Tridion.Cme.Pipeline} execution pipeline.
*/
Tridion.Extensions.FBI.Commands.ValidationCheckIn.prototype._isAvailable = function ValidationCheckIn$_isAvailable(selection, pipeline) {    
    return true;
};

/**
* Checks whether the command is Enabled or not
* @param {Tridion.Cme.Selection} selection The current selection.
* @param {Tridion.Cme.Pipeline} execution pipeline.
*/
Tridion.Extensions.FBI.Commands.ValidationCheckIn.prototype._isEnabled = function ValidationCheckIn$_isEnabled(selection, pipeline) {
    return this._isAvailable(selection, pipeline);
};

/**
* Executes this command on the selection.
* @param {Tridion.Cme.Selection} selection The current selection.
* @param {Tridion.Cme.Pipeline} execution pipeline.
*/
Tridion.Extensions.FBI.Commands.ValidationCheckIn.prototype._execute = function ValidationCheckIn$_execute(selection, pipeline) {
    var itemUri = selection.getItem(0);
    var item = $models.getItem(itemUri);
    var command = $cme.getCommand("CheckIn");

    if (item.getItemType() == $const.ItemType.COMPONENT) {
        var inputs = Tridion.Extensions.FBI.Commands.GetValidationFields(selection);
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
            return command._execute(selection, pipeline);
        }
    } else {
        console.debug(selection);
        return command._execute(selection, pipeline);
    }
};





/**
* Implements the <c>ValidationSaveNew</c> command
*/
Tridion.Extensions.FBI.Commands.ValidationSaveNew = function Commands$ValidationSaveNew() {
    Type.enableInterface(this, "Tridion.Extensions.FBI.Commands.ValidationSaveNew");
    this.addInterface("Tridion.Cme.Command", ["ValidationSaveNew"]);

};

/**
* Checks whether the command is Available or not
* @param {Tridion.Cme.Selection} selection The current selection.
* @param {Tridion.Cme.Pipeline} execution pipeline.
*/
Tridion.Extensions.FBI.Commands.ValidationSaveNew.prototype._isAvailable = function ValidationSaveNew$_isAvailable(selection, pipeline) {    
    return true;
};

/**
* Checks whether the command is Enabled or not
* @param {Tridion.Cme.Selection} selection The current selection.
* @param {Tridion.Cme.Pipeline} execution pipeline.
*/
Tridion.Extensions.FBI.Commands.ValidationSaveNew.prototype._isEnabled = function ValidationSaveNew$_isEnabled(selection, pipeline) {
    return this._isAvailable(selection, pipeline);
};

/**
* Executes this command on the selection.
* @param {Tridion.Cme.Selection} selection The current selection.
* @param {Tridion.Cme.Pipeline} execution pipeline.
*/
Tridion.Extensions.FBI.Commands.ValidationSaveNew.prototype._execute = function ValidationSaveNew$_execute(selection, pipeline) {
    var itemUri = selection.getItem(0);
    var item = $models.getItem(itemUri);
    var command = $cme.getCommand("SaveNew");

    if (item.getItemType() == $const.ItemType.COMPONENT) {
        var inputs = Tridion.Extensions.FBI.Commands.GetValidationFields(selection);
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
            return command._execute(selection, pipeline);
        }
    } else {
        return command._execute(selection, pipeline);
    }
};




/**
* Implements the <c>ValidationSaveClose</c> command
*/
Tridion.Extensions.FBI.Commands.ValidationSaveClose = function Commands$ValidationSaveClose() {
    Type.enableInterface(this, "Tridion.Extensions.FBI.Commands.ValidationSaveClose");
    this.addInterface("Tridion.Cme.Command", ["ValidationSaveClose"]);

};

/**
* Checks whether the command is Available or not
* @param {Tridion.Cme.Selection} selection The current selection.
* @param {Tridion.Cme.Pipeline} execution pipeline.
*/
Tridion.Extensions.FBI.Commands.ValidationSaveClose.prototype._isAvailable = function ValidationSaveClose$_isAvailable(selection, pipeline) {    
    return true;
};

/**
* Checks whether the command is Enabled or not
* @param {Tridion.Cme.Selection} selection The current selection.
* @param {Tridion.Cme.Pipeline} execution pipeline.
*/
Tridion.Extensions.FBI.Commands.ValidationSaveClose.prototype._isEnabled = function ValidationSaveClose$_isEnabled(selection, pipeline) {
    return this._isAvailable(selection, pipeline);
};

/**
* Executes this command on the selection.
* @param {Tridion.Cme.Selection} selection The current selection.
* @param {Tridion.Cme.Pipeline} execution pipeline.
*/
Tridion.Extensions.FBI.Commands.ValidationSaveClose.prototype._execute = function ValidationSaveClose$_execute(selection, pipeline) {
    var itemUri = selection.getItem(0);
    var item = $models.getItem(itemUri);
    var command = $cme.getCommand("SaveClose");

    if (item.getItemType() == $const.ItemType.COMPONENT) {
        var inputs = Tridion.Extensions.FBI.Commands.GetValidationFields(selection);
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
            return command._execute(selection, pipeline);
        }
    } else {
        return command._execute(selection, pipeline);
    }
};


Tridion.Extensions.FBI.Commands.GetValidationFields = function Commands$GetValidationFields(selection) {
    var itemUri = selection.getItem(0);
    var item = $models.getItem(itemUri);
    var inputs = [];
    if (item) {
        if (item.getItemType() == $const.ItemType.COMPONENT) {
            var schema = item.getSchema();
            //Content
            $item = item;
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
            

            Tridion.Extensions.FBI.Commands.GetInputs(item.getXml(), schema, fields, contentFieldBuilder, inputs);
            schema = item.getMetadataSchema();
            fields = schema.getStaticMetadataFields();
            Tridion.Extensions.FBI.Commands.GetInputs(item.getMetadata(), schema, fields, mdFieldBuilder, inputs);
            
        }
    }
    return inputs;


};


Tridion.Extensions.FBI.Commands.GetInputs = function Commands$GetInputs(xml, schema,  fields, fieldBuilder, existingInputs) {
    var inputs = existingInputs || [];    
    var xmlFields = $xml.getNewXmlDocument(fields);
    var schemaFields = $xml.selectNodes(xmlFields, "/*/*");
    var ns = Tridion.Constants.Namespaces;
    ns["fv"] = "http://www.sdltridion.com/2011/FieldValidation";


    for (var i = 0; i < schemaFields.length; i++) {
        var fieldXml = schemaFields[i];                        
        var extensionXmlElement = $xml.selectSingleNode(fieldXml, "tcm:ExtensionXml");
        if (extensionXmlElement) {
            var configurationNode = $xml.selectSingleNode(extensionXmlElement, "fv:configuration");
            if (configurationNode) {
                var validation = $xml.getInnerText(configurationNode, "fv:field/fv:validation");
                validation = (validation != 'undefined') ? validation : 'none';
                if (validation && validation != 'none') {
                    var fieldName = $xml.getInnerText(fieldXml, 'tcm:Name');
                    ns["fvc"] = schema.getStaticNamespaceUri();
                    var fieldValue = $xml.getInnerXml($xml.getNewXmlDocument(xml), "//fvc:" + fieldName)                    
                    if (fieldBuilder) {
                        var contentFieldBuilder = $display.getView().properties.controls.fieldBuilder;                        
                        fieldValue = $xml.getInnerXml($xml.getNewXmlDocument(fieldBuilder.getData()), "//fvc:" + fieldName);                        
                    }
                    var input = {
                        Type: validation,
                        FieldValue: fieldValue,
                        FieldName: fieldName
                    };
                    console.debug(input);
                    inputs.push(input)
                }
            }
        }
    }

};
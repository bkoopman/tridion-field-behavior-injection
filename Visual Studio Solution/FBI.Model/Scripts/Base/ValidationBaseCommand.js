/**
* Implements the <c>ValidationSave</c> command
*/
Tridion.Extensions.FBI.Commands.ValidationBaseCommand = function Commands$ValidationBaseCommand() {
    Type.enableInterface(this, "Tridion.Extensions.FBI.Commands.ValidationBaseCommand");
    var p = this.properties = {};
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
Tridion.Extensions.FBI.Commands.ValidationBaseCommand.prototype._execute = function ValidationBaseCommand$_execute(selection, pipeline) {
    var itemUri = selection.getItem(0);
    var item = $models.getItem(itemUri);
    var command = $cme.getCommand("SaveClose");

    var user = $models.getItem(Tridion.UI.UserSettings.getJsonUserSettings()["User"]["@ID"]);


    if (user.isLoaded()) {
        FBIHandler$onUserReady();
    } else {
        $evt.addEventHandler(user, "load", FBIHandler$onUserReady);
        user.load();
    }


    function Validation
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

Tridion.Extensions.FBI.Commands.ValidationBaseCommand.GetValidationFields = function ValidationBaseCommand$GetValidationFields(selection) {
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
            

            Tridion.Extensions.FBI.Commands.GetInputs(item.getXml(), schema, fields, contentFieldBuilder, inputs);
            schema = item.getMetadataSchema();
            fields = schema.getStaticMetadataFields();
            Tridion.Extensions.FBI.Commands.GetInputs(item.getMetadata(), schema, fields, mdFieldBuilder, inputs);
            
        }
    }
    return inputs;


};


Tridion.Extensions.FBI.Commands.ValidationBaseCommand.GetInputs = function ValidationBaseCommand$GetInputs(xml, schema,  fields, fieldBuilder, existingInputs) {
    var inputs = existingInputs || [];    
    var xmlFields = $xml.getNewXmlDocument(fields);
    var schemaFields = $xml.selectNodes(xmlFields, "/*/*");
    var ns = Tridion.Constants.Namespaces;
    ns["fv"] = "http://www.sdltridion.com/2011/FieldValidation";




    for (var i = 0; i < schemaFields.length; i++) {
        var fieldXml = schemaFields[i];
        var value = $fbi.getConfigurationHelper().hasConfigurationValueFromFieldXml(fieldXml, $fbiConst.VALIDATION, user);
        console.debug("Validation: ");
        console.debug(value)
        /*var input = {
            Type: validation,
            FieldValue: fieldValue,
            FieldName: value
        };
        

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
                    
                    inputs.push(input);
                }
            }
        }*/
    }
};
<%@ Control Language="C#" AutoEventWireup="true" Inherits="Tridion.Extensions.UI.FieldBehaviorExtension.SchemaFieldValidation" %>
<div class="fbi_feature_wrapper">
    <div style="margin: 3px 3px 3px 3px">
        <div class="fbi_label">
            <label for="<%=this.ClientID %>ValidationList"><asp:Literal ID="Literal1" runat="server" Text="<%$ Resources: Tridion.Extensions.UI.FBI.Strings, ValidationLabel %>" />:</label>
        </div>
        <select name="Validation" id="<%=this.ClientID %>_ValidationList">
            <option value="none">None</option>
        </select>
    </div>
    
    
</div>


<%@ Control Language="C#" AutoEventWireup="true" Inherits="Tridion.Extensions.UI.FieldBehaviorExtension.SchemaFieldValidation" %>
<hr />
<label for="<%=this.ClientID %>ValidationList"><asp:Literal ID="Literal1" runat="server" Text="Validation:" /></label>
<select name="Validation" id="<%=this.ClientID %>_ValidationList">
    <option value="none">None</option>
</select>


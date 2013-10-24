<%@ Control Language="C#" AutoEventWireup="true" Inherits="Tridion.Extensions.UI.FieldBehaviorExtension.SchemaFieldImageEditor" %>
<div class="fbi_feature_wrapper">
    <input type="checkbox" id="<%=this.ClientID %>_checkbox" />
    <label for="<%=this.ClientID %>_checkbox">
        <asp:Literal ID="Literal1" runat="server" Text="<%$ Resources: Tridion.Extensions.UI.FBI.Strings, EditImageLabel %>" /></label>
</div>


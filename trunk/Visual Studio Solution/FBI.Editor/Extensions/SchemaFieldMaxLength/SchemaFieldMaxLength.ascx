<%@ Control Language="C#" AutoEventWireup="true" Inherits="Tridion.Extensions.UI.FieldBehaviorExtension.SchemaFieldMaxLength" %>
<div class="fbi_feature_wrapper">
    <input type="text" id="<%=this.ClientID %>_text" />
    <label for="<%=this.ClientID %>_text">
        <asp:Literal ID="Literal1" runat="server" Text="<%$ Resources: Tridion.Extensions.UI.FBI.Strings, MaxLengthLabel %>" /></label>
</div>

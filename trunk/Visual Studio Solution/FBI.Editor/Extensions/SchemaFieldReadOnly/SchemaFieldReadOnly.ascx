<%@ Control Language="C#" AutoEventWireup="true" Inherits="Tridion.Extensions.UI.FieldBehaviorExtension.SchemaFieldReadOnly" %>
<div class="fbi_feature_wrapper" style="display:none;">
<input type="checkbox" id="<%=this.ClientID %>_checkbox" />
<label for="<%=this.ClientID %>_checkbox"><asp:Literal ID="Literal1" runat="server" Text="<%$ Resources: Tridion.Extensions.UI.FBI.Strings, ReadOnlyLabel %>" /></label>
</div>

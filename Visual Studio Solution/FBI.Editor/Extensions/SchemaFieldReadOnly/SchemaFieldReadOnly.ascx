﻿<%@ Control Language="C#" AutoEventWireup="true" Inherits="Tridion.Extensions.UI.FieldBehaviorExtension.SchemaFieldReadOnly" %>
<div class="fbi_feature_wrapper">
<input type="checkbox" id="<%=this.ClientID %>_checkbox" />
<label style="position: absolute; top: 8px;" for="<%=this.ClientID %>_checkbox"><asp:Literal ID="Literal1" runat="server" Text="<%$ Resources: Tridion.Extensions.UI.FBI.Strings, ReadOnlyLabel %>" /></label>
</div>

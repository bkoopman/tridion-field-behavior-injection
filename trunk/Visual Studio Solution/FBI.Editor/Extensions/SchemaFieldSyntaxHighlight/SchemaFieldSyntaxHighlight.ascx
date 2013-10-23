<%@ Control Language="C#" AutoEventWireup="true" Inherits="Tridion.Extensions.UI.FieldBehaviorExtension.SchemaFieldSyntaxHighlight" %>
<div class="fbi_feature_wrapper">
    <div style="margin: 3px 3px 3px 3px">
        <div class="fbi_label">
            <label for="<%=this.ClientID %>_SyntaxList"><asp:Literal ID="SyntaxLiteral" runat="server" Text="<%$ Resources: Tridion.Extensions.UI.FBI.Strings, SyntaxHighlightLabel %>" />:</label>
        </div>
        <select name="SyntaxLanguages" id="<%=this.ClientID %>_SyntaxList">
            <option value="none">None</option>
        </select>
    </div>
</div>
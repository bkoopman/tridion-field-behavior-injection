<%@ Control Language="C#" AutoEventWireup="true" Inherits="Tridion.Extensions.UI.FieldBehaviorExtension.SchemaFieldBehaviour" %>
<hr />

<c:Panel runat="server" id="SchemaDesignFieldSecurity" class="stack-calc stack horizontal fixed" label="Field Behaviour">
    <input type="checkbox" id="<%=this.ClientID %>_ReadOnlyCheckbox"/>
    <%--label for="<%=this.ClientID %>_ReadOnlyCheckbox"><asp:Literal ID="Literal2" runat="server" Text="<%$ Resources: Tridion.Extensions.UI.FBI.Strings, ReadOnlyLabel %>" /> --%>
    <label for="<%=this.ClientID %>_ReadOnlyCheckbox"><asp:Literal ID="Literal2" runat="server" Text="<%$ Resources: Tridion.Extensions.UI.FBI.Strings, ReadOnlyLabel %>"/>
    <input type="checkbox" id="<%=this.ClientID %>_VisibleCheckbox"/>    
    <label for="<%=this.ClientID %>_VisibleCheckbox"><asp:Literal ID="Literal1" runat="server" Text="Visible" />
    
    <hr />
    <div id="FBISettings">
	    <div id="Permissions">
		    <div class="fbiLeftPanel">
			    <div class="label">
				    <asp:Literal ID="Literal3" runat="server" Text="<%$ Resources: Tridion.Web.UI.Strings, UsersAndGroups %>" />:
			    </div>
			    <div class="middle">
				    <c:List runat="server" MultiSelect="false" ID="UpperList" TabIndex="2" />
			    </div>
			    <div class="footer">
				    <input type="checkbox" id="UpperShowAll" tabindex="3" />
				    <label for="UpperShowAll">
					    <asp:Literal ID="Literal4" runat="server" Text="<%$ Resources: Tridion.Web.UI.Strings, ShowAll %>" />
				    </label>
			    </div>
		    </div>
		    <div class="fbiRightPanel">
			    <div class="label">
				    <span class="PermissionsLabel"><asp:Literal ID="Literal5" runat="server" Text="<%$ Resources: Tridion.Extensions.UI.FBI.Strings, BehaviourLabel %>"/>:</span>
				    
			    </div>
			    <div class="middle securityInfo" id="UpperSecurityInfo"></div>
			    <div class="footer">
				    <input type="checkbox" id="ShowExceptions" tabindex="5" />
				    <label for="ShowExceptions">
					    <asp:Literal ID="Literal7" runat="server" Text="<%$ Resources: Tridion.Web.UI.Strings, ShowExceptions %>" />
				    </label>
			    </div>
		    </div>
	    </div>
        <%-- 
	    <div id="Exceptions">
		    <div id="ExceptionsLabel">
			    <span class="PermissionsLabel"><asp:Literal ID="Literal8" runat="server" Text="<%$ Resources: Tridion.Web.UI.Strings, PermissionsExceptionsLabel %>" /></span>
			    
		    </div>
		    <div class="leftPanel">
			    <div class="label">
				    <asp:Literal ID="Literal10" runat="server" Text="<%$ Resources: Tridion.Web.UI.Strings, UsersAndGroups %>" />:
			    </div>
			    <div class="middle">
				    <c:List runat="server" MultiSelect="false" ID="LowerList" TabIndex="6" />
			    </div>
			    <div class="footer">
				    <input type="checkbox" id="LowerShowAll" tabindex="7" />
				    <label for="LowerShowAll">
					    <asp:Literal ID="Literal11" runat="server" Text="<%$ Resources: Tridion.Web.UI.Strings, ShowAll %>" />
				    </label>						
			    </div>
		    </div>
		    <div class="rightPanel">
			    <div class="label">
				    <span class="PermissionsLabel"><asp:Literal ID="Literal12" runat="server" Text="<%$ Resources: Tridion.Web.UI.Strings, Permissions %>" />:</span>
				    <span class="RightsLabel"><asp:Literal ID="Literal13" runat="server" Text="<%$ Resources: Tridion.Web.UI.Strings, Rights %>" />:</span>
			    </div>
			    <div class="middle securityInfo" id="LowerSecurityInfo"></div>
		    </div>
	    </div>
        --%>
    </div>
</c:Panel>

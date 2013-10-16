<%@ Control Language="C#" AutoEventWireup="true" Inherits="Tridion.Extensions.UI.FieldBehaviorExtension.SchemaFieldBehaviour" %>
<c:Panel runat="server" id="SchemaDesignFieldSecurity" class="stack-calc stack horizontal fixed fbi_top_padding" label="Field Behaviour">    
    <div id="FBISettings">
	    <div id="Permissions">
		    <div class="fbiLeftPanel">
			    <div class="fbi_label">
				    <asp:Literal ID="Literal3" runat="server" Text="<%$ Resources: Tridion.Extensions.UI.FBI.Strings, UsersAndGroupsLabel %>" />:
			    </div>
			    <div class="middle">
				    <c:List  runat="server" MultiSelect="false" ID="UsersAndGroupsList" TabIndex="2" />
			    </div>
                
			    <div class="fbiFooter fbiFooterLeft">
				    <input type="checkbox" id="<%=this.ClientID %>_ApplyToEveryoneCheckBox" tabindex="3" />
				    <label for="<%=this.ClientID %>_ApplyToEveryoneCheckBox">
					    <asp:Literal ID="Literal1" runat="server" Text="<%$ Resources: Tridion.Extensions.UI.FBI.Strings, ApplyToEveryoneLabel %>" />
				    </label>
			    </div>
                <div class="fbiFooter fbiFooterRight">
				    <label for="<%=this.ClientID %>_ShowAllCheckBox">
					    <asp:Literal ID="Literal4" runat="server" Text="<%$ Resources: Tridion.Extensions.UI.FBI.Strings, ShowUsersLabel %>" />
				    </label>
                    <input type="checkbox" id="<%=this.ClientID %>_ShowAllCheckBox" tabindex="3" />
			    </div>
                
                
		    </div>
		    <div class="fbiRightPanel">
			    <div class="fbi_label">
				    <span><asp:Literal ID="Literal5" runat="server" Text="<%$ Resources: Tridion.Extensions.UI.FBI.Strings, BehaviourLabel %>"/>:</span>				    
			    </div>
			    <div class="middle securityInfo" id="UpperSecurityInfo">
                    <div id="behaviours-wrapper" class="list stack horizontal" tabindex="-1" c:multiselect="false" c:textlookup="true" style="outline: 0px;">							                    
                        <!-- Behaviours come here -->
                        <c:ExtendableArea id="BehavioursArea" runat="server" />
			        </div>
		        </div>
	        </div>
        </div>
    </div>
</c:Panel>

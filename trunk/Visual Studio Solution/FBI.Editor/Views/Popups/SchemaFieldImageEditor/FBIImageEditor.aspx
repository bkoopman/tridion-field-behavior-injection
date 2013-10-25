<%@ Control Language="C#" AutoEventWireup="true" Inherits="Tridion.Extensions.UI.FieldBehaviorExtension.FBIImageEditorView" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html class="tridion" id="FBIImageEditorView" xmlns="http://www.w3.org/1999/xhtml" xmlns:c="http://www.sdltridion.com/web/ui/controls" >
	<head>
		<title><asp:Literal ID="Literal1" runat="server" Text="<%$ Resources: Tridion.Web.UI.Strings, Metadata %>" /></title>
		<cc:TridionManager runat="server" Editor="SiteEdit" IsStandAloneView="false">
			<dependencies runat="server">		
				<dependency runat="server">Tridion.Web.UI.Editors.SiteEdit</dependency>
				<dependency runat="server">Tridion.Web.UI.Editors.CME</dependency>
			</dependencies>
		</cc:TridionManager>
	</head>
	<body id="Stack" class="stack horizontal fixed">
		<div class="line stack-elem" id="DialogTitle"></div>
		<div class="line stack-calc form fieldgroup fieldbuilder"></div>
		<div class="line buttons stack-elem">
			<c:Button ID="Cancel" class="button2013 touchButton gray" runat="server" Label="<%$ Resources: Tridion.Web.UI.Editors.SiteEdit.Strings, Cancel %>" />
			<c:Button ID="SaveAndClose" class="button2013 touchButton green" runat="server" Label="<%$ Resources: Tridion.Web.UI.Editors.SiteEdit.Strings, SaveAndClose %>" />
		</div>
	</body>
</html>

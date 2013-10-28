<%@ Page Language="C#" AutoEventWireup="true" Inherits="Tridion.Extensions.UI.FieldBehaviorExtension.FBIImageEditorView" ClassName="FBIImageEditorView" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html class="tridion" id="FBIImageEditorView" xmlns="http://www.w3.org/1999/xhtml" xmlns:c="http://www.sdltridion.com/web/ui/controls">
<head>
    <title>
        <asp:Literal ID="Literal1" runat="server" Text="<%$ Resources: Tridion.Extensions.UI.FBI.Strings, EditImageLabel %>" /></title>
        <cc:tridionmanager runat="server" editor="SiteEdit" isstandaloneview="false">
			<dependencies runat="server">		
				<dependency runat="server">Tridion.Web.UI.Editors.SiteEdit</dependency>
				<dependency runat="server">Tridion.Web.UI.Editors.CME</dependency>
			</dependencies>
		</cc:tridionmanager>
</head>
<body id="Stack" class="stack horizontal fixed">
    <div class="line stack-elem" id="DialogTitle"></div>
    <div class="line stack-calc form fieldgroup fieldbuilder">
        <div id="Filters">
            <div class="Filter">
                <div class="FilterName">
                    <p>brightness</p>
                </div>

                <div class="FilterSetting">
                    <input type="range" min="-100" max="100" step="1" value="0" data-filter="brightness">
                    <span class="FilterValue">0</span>
                </div>
            </div>

            <div class="Filter">
                <div class="FilterName">
                    <p>contrast</p>
                </div>

                <div class="FilterSetting">
                    <input type="range" min="-100" max="100" step="1" value="0" data-filter="contrast">
                    <span class="FilterValue">0</span>
                </div>
            </div>

            <div class="Filter">
                <div class="FilterName">
                    <p>saturation</p>
                </div>

                <div class="FilterSetting">
                    <input type="range" min="-100" max="100" step="1" value="0" data-filter="saturation">
                    <span class="FilterValue">0</span>
                </div>
            </div>

            <div class="Filter">
                <div class="FilterName">
                    <p>vibrance</p>
                </div>

                <div class="FilterSetting">
                    <input type="range" min="-100" max="100" step="1" value="0" data-filter="vibrance">
                    <span class="FilterValue">0</span>
                </div>
            </div>

            <div class="Filter">
                <div class="FilterName">
                    <p>exposure</p>
                </div>

                <div class="FilterSetting">
                    <input type="range" min="-100" max="100" step="1" value="0" data-filter="exposure">
                    <span class="FilterValue">0</span>
                </div>
            </div>

            <div class="Filter">
                <div class="FilterName">
                    <p>hue</p>
                </div>

                <div class="FilterSetting">
                    <input type="range" min="0" max="100" step="1" value="0" data-filter="hue">
                    <span class="FilterValue">0</span>
                </div>
            </div>

            <div class="Filter">
                <div class="FilterName">
                    <p>sepia</p>
                </div>

                <div class="FilterSetting">
                    <input type="range" min="0" max="100" step="1" value="0" data-filter="sepia">
                    <span class="FilterValue">0</span>
                </div>
            </div>

            <div class="Filter">
                <div class="FilterName">
                    <p>gamma</p>
                </div>

                <div class="FilterSetting">
                    <input type="range" min="0" max="10" step="0.1" value="0" data-filter="gamma">
                    <span class="FilterValue">0</span>
                </div>
            </div>

            <div class="Filter">
                <div class="FilterName">
                    <p>noise</p>
                </div>

                <div class="FilterSetting">
                    <input type="range" min="0" max="100" step="1" value="0" data-filter="noise">
                    <span class="FilterValue">0</span>
                </div>
            </div>

            <div class="Filter">
                <div class="FilterName">
                    <p>clip</p>
                </div>

                <div class="FilterSetting">
                    <input type="range" min="0" max="100" step="1" value="0" data-filter="clip">
                    <span class="FilterValue">0</span>
                </div>
            </div>

            <div class="Filter">
                <div class="FilterName">
                    <p>sharpen</p>
                </div>

                <div class="FilterSetting">
                    <input type="range" min="0" max="100" step="1" value="0" data-filter="sharpen">
                    <span class="FilterValue">0</span>
                </div>
            </div>

            <div class="Filter">
                <div class="FilterName">
                    <p>stackBlur</p>
                </div>

                <div class="FilterSetting">
                    <input type="range" min="0" max="20" step="1" value="0" data-filter="stackBlur">
                    <span class="FilterValue">0</span>
                </div>
            </div>


            <div class="Clear"></div>
        </div>
        <div id="holder">
            
        </div>
        <div id="canvas-holder">
            <canvas id="image" />
        </div>
        
        
    </div>
    <div id="ButtonStackLeft">
        
    </div>
    <div id="ButtonStackRight" class="line buttons stack-elem fieldgroup">
        <c:button id="Cancel" class="button2013 touchButton gray" runat="server" label="<%$ Resources: Tridion.Extensions.UI.FBI.Strings, Cancel %>" />
        <c:button id="SaveAndClose" class="button2013 touchButton green" runat="server" label="<%$ Resources: Tridion.Extensions.UI.FBI.Strings, SaveAndClose %>" />
        <c:button id="BtnResize" class="button2013 touchButton green" runat="server" label="<%$ Resources: Tridion.Extensions.UI.FBI.Strings, Resize %>" />
        <c:button id="BtnRotate" class="button2013 touchButton green" runat="server" label="<%$ Resources: Tridion.Extensions.UI.FBI.Strings, Rotate %>" />
        <c:button id="BtnCrop" class="button2013 touchButton green" runat="server" label="<%$ Resources: Tridion.Extensions.UI.FBI.Strings, Crop %>" />
        <c:button id="BtnFilters" class="button2013 touchButton green" runat="server" label="<%$ Resources: Tridion.Extensions.UI.FBI.Strings, Filters %>" />
    </div>

    <hr />

</body>
</html>

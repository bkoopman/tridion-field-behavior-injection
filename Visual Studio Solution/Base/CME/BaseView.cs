using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Tridion.Web.UI.Core.Controls;
using Tridion.Web.UI.Editors.CME.Views.Popups;
using Tridion.Web.UI.Controls;

namespace Tridion.Extensions.Base.CME.Views
{
    [ControlResourcesDependency(typeof(Tridion.Web.UI.Controls.Button), typeof(List), typeof(Tree), typeof(Splitter), typeof(RibbonToolbar), typeof(Popup))]
    public partial class BaseView: TridionPage
    {
    }
}

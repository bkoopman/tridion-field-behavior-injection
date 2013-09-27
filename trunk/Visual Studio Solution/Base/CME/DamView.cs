using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Tridion.Web.UI.Core.Controls;
using Tridion.Web.UI.Editors.CME.Views.Popups;
using Tridion.Web.UI.Controls;
using Tridion.Web.UI.Editors.CME.Views;
using Tridion.Web.UI.Editors.CME.Controls;

namespace Tridion.Extensions.Base.CME.Views
{
    [ControlResourcesDependency(new Type[] { typeof(Button), typeof(List), typeof(Tree), typeof(Splitter), typeof(RibbonToolbar), typeof(Popup), typeof(Stack), typeof(Resizer), typeof(FormatArea), typeof(Resizer), typeof(DateSelectControl), typeof(ItemSelectControl), typeof(MultimediaLinkControl), typeof(ExternalLinkControl) })]   
    public partial class DamView : TridionPage
    {
    }
}

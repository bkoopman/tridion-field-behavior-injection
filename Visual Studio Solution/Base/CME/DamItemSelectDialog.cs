using System;
using Tridion.Web.UI.Controls;
using Tridion.Web.UI.Core.Controls;
using Tridion.Web.UI.Editors.CME.Views.Popups;

namespace Tridion.Extensions.Base.CME.Views
{
    [ControlResources("Tridion.Extensions.PE4.Views.DamItemSelectDialog")]
    [ControlResourcesDependency(new Type[] { typeof(Splitter), typeof(Tridion.Web.UI.Editors.CME.Views.Popups.MessageCenter), typeof(Date) })]
    public partial class DamItemSelectDialog : PopupView
    {
    }
}

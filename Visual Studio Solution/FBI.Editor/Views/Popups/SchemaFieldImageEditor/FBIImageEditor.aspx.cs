
using Tridion.Web.UI.Controls;
using Tridion.Web.UI.Core.Controls;
using Tridion.Web.UI.Editors.CME.Views.Popups;

namespace Tridion.Extensions.UI.FieldBehaviorExtension
{
    [ControlResources("Tridion.Extensions.UI.FBI.SchemaFieldImageEditor.View")]
    [ControlResourcesDependency(typeof(Tridion.Web.UI.Controls.Button), typeof(List), typeof(Tree), typeof(Splitter), typeof(RibbonToolbar), typeof(Popup), typeof(Stack))]
    public class FBIImageEditorView : ModalPopupView
    {
    }
}
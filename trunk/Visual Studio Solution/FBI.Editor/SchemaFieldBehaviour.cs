using System;
using Tridion.Web.UI.Controls;
using Tridion.Web.UI.Core.Controls;

namespace Tridion.Extensions.UI.FieldBehaviorExtension
{
    [ControlResources("Tridion.Extensions.UI.FBI.SchemaFieldBehaviour")]
    public class SchemaFieldBehaviour : TridionUserControl
    {
        public Tridion.Web.UI.Controls.List UsersAndGroupsList { get; set; }
        public Tridion.Web.UI.Controls.Panel SchemaDesignFieldSecurity { get; set; }

        protected override void OnLoad(EventArgs e)
        {
            base.OnLoad(e);
            UsersAndGroupsList.ID = this.ClientID + "_" + UsersAndGroupsList.ID;
            SchemaDesignFieldSecurity.ID = this.ClientID + "_" + SchemaDesignFieldSecurity.ID;
        }
    }
}
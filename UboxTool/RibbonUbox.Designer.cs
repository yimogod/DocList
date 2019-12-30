namespace Ubox
{
    partial class RibbonUbox : Microsoft.Office.Tools.Ribbon.RibbonBase
    {
        /// <summary>
        /// 必需的设计器变量。
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        public RibbonUbox()
            : base(Globals.Factory.GetRibbonFactory())
        {
            InitializeComponent();
        }

        /// <summary> 
        /// 清理所有正在使用的资源。
        /// </summary>
        /// <param name="disposing">如果应释放托管资源，为 true；否则为 false。</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region 组件设计器生成的代码

        /// <summary>
        /// 设计器支持所需的方法 - 不要修改
        /// 使用代码编辑器修改此方法的内容。
        /// </summary>
        private void InitializeComponent()
        {
            this.group1 = this.Factory.CreateRibbonGroup();
            this.btnFormatName = this.Factory.CreateRibbonButton();
            this.btnFormatDate = this.Factory.CreateRibbonButton();
            this.tabUbox = this.Factory.CreateRibbonTab();
            this.group1.SuspendLayout();
            this.tabUbox.SuspendLayout();
            this.SuspendLayout();
            // 
            // group1
            // 
            this.group1.Items.Add(this.btnFormatName);
            this.group1.Items.Add(this.btnFormatDate);
            this.group1.Name = "group1";
            // 
            // btnFormatName
            // 
            this.btnFormatName.Label = "格式名称";
            this.btnFormatName.Name = "btnFormatName";
            this.btnFormatName.ShowImage = true;
            this.btnFormatName.Click += new Microsoft.Office.Tools.Ribbon.RibbonControlEventHandler(this.BtnName_Click);
            // 
            // btnFormatDate
            // 
            this.btnFormatDate.Label = "格式日期";
            this.btnFormatDate.Name = "btnFormatDate";
            this.btnFormatDate.ShowImage = true;
            this.btnFormatDate.Click += new Microsoft.Office.Tools.Ribbon.RibbonControlEventHandler(this.BtnDate_Click);
            // 
            // tabUbox
            // 
            this.tabUbox.ControlId.ControlIdType = Microsoft.Office.Tools.Ribbon.RibbonControlIdType.Office;
            this.tabUbox.Groups.Add(this.group1);
            this.tabUbox.Label = "UboxTool";
            this.tabUbox.Name = "tabUbox";
            // 
            // RibbonUbox
            // 
            this.Name = "RibbonUbox";
            this.RibbonType = "Microsoft.Excel.Workbook";
            this.Tabs.Add(this.tabUbox);
            this.Load += new Microsoft.Office.Tools.Ribbon.RibbonUIEventHandler(this.RibbonUbox_Load);
            this.group1.ResumeLayout(false);
            this.group1.PerformLayout();
            this.tabUbox.ResumeLayout(false);
            this.tabUbox.PerformLayout();
            this.ResumeLayout(false);

        }

        #endregion

        internal Microsoft.Office.Tools.Ribbon.RibbonTab tabUbox;
        internal Microsoft.Office.Tools.Ribbon.RibbonButton btnFormatName;
        internal Microsoft.Office.Tools.Ribbon.RibbonButton btnFormatDate;
        private Microsoft.Office.Tools.Ribbon.RibbonGroup group1;
    }

    partial class ThisRibbonCollection
    {
        internal RibbonUbox RibbonUbox
        {
            get { return this.GetRibbon<RibbonUbox>(); }
        }
    }
}

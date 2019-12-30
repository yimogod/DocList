using System;
using System.Collections.Generic;
using System.Windows.Forms;
using Microsoft.Office.Interop.Excel;
using Microsoft.Office.Tools.Ribbon;

namespace Ubox
{
    public partial class RibbonUbox
    {
        public delegate string HandleCell(string src);


        private void RibbonUbox_Load(object sender, RibbonUIEventArgs e)
        {
            
        }

        private void BtnName_Click(object sender, RibbonControlEventArgs e)
        {
            HandleSelection("SheetFormatName", UboxUtil.FormatName);
        }

        private void BtnDate_Click(object sender, RibbonControlEventArgs e)
        {
            HandleSelection("SheetFormatDate", UboxUtil.FormatDate);
        }

        private void HandleSelection(string sheetName, HandleCell cellHandler)
        {
            var app = Globals.ThisAddIn.Application;
            var selection = app.ActiveWindow.RangeSelection;
            Worksheet wst = ((Worksheet)app.ActiveSheet);

            int maxRow = wst.UsedRange.Rows.Count;

            List<string> srcList = new List<string>();
            List<string> destList = new List<string>();
            foreach (Range cell in selection)
            {
                if (cell.Row > maxRow) break;
                //var address = cell.Address;

                string v = cell.Text as string;
                if (v == null) v = "";
                srcList.Add(v);

                var nv = cellHandler(v);
                destList.Add(nv);
            }

            var new_wst = (Worksheet)Globals.ThisAddIn.Application.Worksheets.Add();
            new_wst.Name = sheetName;

            for (int i = 0; i < srcList.Count; i++)
            {
                var srcRange = new_wst.Range["A" + (i + 1)];
                var destRange = new_wst.Range["B" + (i + 1)];
                srcRange.Value = srcList[i];
                destRange.Value = destList[i];

                if (!string.Equals(srcList[i], destList[i]))
                {
                    destRange.Font.Color = XlRgbColor.rgbRed;
                }
            }
        }
    }
}

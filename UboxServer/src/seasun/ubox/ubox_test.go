package ubox

import "testing"

func TestImportExcel(t *testing.T) {
	ConnecToDB()

	ImportExcel("C://FrancesWork/lzb_list.xlsx")
}

func TestExportExcel(t *testing.T) {
	ConnecToDB()
	ExportExcel()
}

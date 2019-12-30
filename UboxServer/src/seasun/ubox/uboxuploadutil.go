package ubox

import (
	"fmt"
	"log"
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/360EntSecGroup-Skylar/excelize"
	"github.com/gin-gonic/gin"
)

//导出excel
func ExportExcel() {
	f := excelize.NewFile()
	sheetIndex := f.NewSheet(sheetName)

	var list []UboxUser
	col := db.C(Collection_User)
	col.Find(nil).All(&list)

	f.SetCellValue(sheetName, "A1", "Client")
	f.SetCellValue(sheetName, "B1", "Openning")
	f.SetCellValue(sheetName, "C1", "Title")
	f.SetCellValue(sheetName, "D1", "Company")
	f.SetCellValue(sheetName, "E1", "Depart")
	f.SetCellValue(sheetName, "F1", "Name")
	f.SetCellValue(sheetName, "G1", "Mobile")
	f.SetCellValue(sheetName, "H1", "Email")
	f.SetCellValue(sheetName, "I1", "IM")
	f.SetCellValue(sheetName, "J1", "City")
	f.SetCellValue(sheetName, "K1", "ContactDate")
	f.SetCellValue(sheetName, "L1", "Channel")
	f.SetCellValue(sheetName, "M1", "Remark")
	f.SetCellValue(sheetName, "N1", "Comment")
	for i, v := range list {
		r := strconv.Itoa(i + 2)
		f.SetCellValue(sheetName, "A"+r, v.Client)
		f.SetCellValue(sheetName, "B"+r, v.Openning)
		f.SetCellValue(sheetName, "C"+r, v.Title)
		f.SetCellValue(sheetName, "D"+r, v.Company)
		f.SetCellValue(sheetName, "E"+r, v.Depart)
		f.SetCellValue(sheetName, "F"+r, v.Name)
		f.SetCellValue(sheetName, "G"+r, v.Mobile)
		f.SetCellValue(sheetName, "H"+r, v.Email)
		f.SetCellValue(sheetName, "I"+r, v.IM)
		f.SetCellValue(sheetName, "J"+r, v.City)
		f.SetCellValue(sheetName, "K"+r, v.ContactDate)
		f.SetCellValue(sheetName, "L"+r, v.Channel)
		f.SetCellValue(sheetName, "M"+r, v.Remark)
		f.SetCellValue(sheetName, "N"+r, v.Comment)
	}

	f.SetActiveSheet(sheetIndex)
	// Save xlsx file by the given path.
	now := time.Now().Format("2006_01_02_15_04_05")
	err := f.SaveAs("./bak/frances_" + now + ".xlsx")
	if err != nil {
		fmt.Println(err)
	}
}

//检查上传的文件对不对
func CheckUploadedExcel(c *gin.Context) (string, bool) {
	fileSrc, error := c.FormFile("upload")
	if error != nil {
		log.Println(error)
		c.JSON(http.StatusOK, gin.H{"status": 401, "content": "upload file is null"})
		return "", false
	}

	//log.Println("---------------------------------------------")
	//log.Println("upload file name is " + fileSrc.Filename)
	ns := strings.Split(fileSrc.Filename, ".")
	if len(ns) <= 1 {
		c.JSON(http.StatusOK, gin.H{"status": 402, "content": "upload file has no extension"})
		return "", false
	}

	if ns[len(ns)-1] != "xlsx" {
		c.JSON(http.StatusOK, gin.H{"status": 403, "content": "upload file is not excel"})
		return "", false
	}
	//log.Println("-- get excel file from post success")

	// 上传文件到指定的路径
	now := time.Now().Format("2006_01_02_15_04_05")
	cacheUploadPath := "./upload/upload_" + now + ".xlsx"
	error = c.SaveUploadedFile(fileSrc, cacheUploadPath)
	if error != nil {
		log.Println(error)
		c.JSON(http.StatusOK, gin.H{"status": 501, "content": "can not save upload file"})
		return "", false
	}

	return cacheUploadPath, true
}

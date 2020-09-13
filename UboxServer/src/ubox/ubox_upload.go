package ubox

import (
	"fmt"
	"log"
	"net/http"

	"github.com/360EntSecGroup-Skylar/excelize"
	"github.com/gin-gonic/gin"
	"gopkg.in/mgo.v2/bson"
)

var sheetName string = "Sheet1"

//请求导出excel, 只是在服务器备份了一份，暂时没有什么卵用
func RequestExcelExport(c *gin.Context) {
	ExportExcel()
}

//上传excel, 清库，覆盖整个数据库
func RequestExcelOverride(c *gin.Context) {
	//ubox_id = c.Query("data_id")
	//fileName := c.DefaultQuery("file_name", "0")

	path, result := CheckUploadedExcel(c)
	if !result {
		return
	}
	//log.Println("-- save excel file success")

	//导出一个数据表, 避免上传数据出错没办法恢复
	ExportExcel()
	//log.Println("-- export dbdata to excel success")

	f, err := excelize.OpenFile(path)
	if err != nil {
		fmt.Println(err)
		c.JSON(http.StatusOK, gin.H{"status": 504, "content": "saved file ./frances_upload.xlsx not exist"})
		return
	}

	rowsArr := f.GetRows(sheetName)
	log.Println("import excel has rows ")
	log.Println(len(rowsArr))

	//先清理所有的数据
	col := db.C(Collection_User)
	col.RemoveAll(nil)

	//第一行是字段数据, 需要过滤掉
	rows := rowsArr[1:len(rowsArr)]
	for _, row := range rows {
		user := UboxUser{}
		user.Id_ = bson.NewObjectId()
		user.Client = row[0]
		user.Openning = row[1]
		user.Title = row[2]
		user.Company = row[3]
		user.Depart = row[4]
		user.Name = row[5]
		user.Mobile = row[6]
		user.Email = row[7]
		user.IM = row[8]
		user.City = row[9]
		user.ContactDate = row[10]
		user.Channel = row[11]
		user.Remark = row[12]
		user.Comment = row[13]
		log.Println(user.Id_)
		col.Insert(&user)
	}
	c.JSON(http.StatusOK, gin.H{"status": 200, "content": "upload success"})
}

//同样是上传excel,不过并不是完全覆盖, 而是增量添加或者更新
func RequestExcelUpdate(c *gin.Context) {
	path, result := CheckUploadedExcel(c)
	if !result {
		return
	}

	//导出一个数据表, 避免上传数据出错没办法恢复
	ExportExcel()

	f, err := excelize.OpenFile(path)
	if err != nil {
		fmt.Println(err)
		c.JSONP(http.StatusOK, gin.H{"status": 504, "content": "saved file ./frances_upload.xlsx not exist"})
	}
	rowsArr := f.GetRows(sheetName)
	log.Println("import excel has rows num: ", len(rowsArr))

	var updatedUsers []UboxUser
	var insertedUsers []UboxUser

	col := db.C(Collection_User)
	var users []UboxUser
	col.Find(nil).All(&users)
	//第一行是字段数据, 需要过滤掉
	rows := rowsArr[1:len(rowsArr)]
	for _, row := range rows {
		user := UboxUser{}
		user.Client = row[0]
		user.Openning = row[1]
		user.Title = row[2]
		user.Company = row[3]
		user.Depart = row[4]
		user.Name = row[5]
		user.Mobile = row[6]
		user.Email = row[7]
		user.IM = row[8]
		user.City = row[9]
		user.ContactDate = row[10]
		user.Channel = row[11]
		user.Remark = row[12]
		user.Comment = row[13]

		//update or create data
		var sameNameUsers []UboxUser
		for _, u := range users {
			if u.Name == user.Name {
				sameNameUsers = append(sameNameUsers, u)
			}
		}

		var sameUsers []UboxUser
		if user.Mobile != "" {
			for _, u := range sameNameUsers {
				if u.Mobile == user.Mobile {
					sameUsers = append(sameUsers, u)
				}
			}
		} else if user.Email != "" {
			for _, u := range sameNameUsers {
				if u.Email == user.Email {
					sameUsers = append(sameUsers, u)
				}
			}
		} else if user.Phone != "" {
			for _, u := range sameNameUsers {
				if u.Phone == user.Phone {
					sameUsers = append(sameUsers, u)
				}
			}
		} else {
			sameUsers = sameNameUsers
		}

		if sameUsers == nil || len(sameUsers) == 0 {
			user.Id_ = bson.NewObjectId()
			err := col.Insert(user)
			if err == nil {
				insertedUsers = append(insertedUsers, user)
			} else {
				log.Println(err)
			}
		} else {
			updatedUsers = append(updatedUsers, user)
			log.Println("updated user num is", len(sameUsers))
			for _, u := range sameUsers {
				user.Id_ = u.Id_
				log.Println("updated user id is", user.Id_)
				err := col.UpdateId(user.Id_, &user)
				if err == nil {
					updatedUsers = append(updatedUsers, u)
				} else {
					log.Println(err)
				}
			}
		}
	}

	c.JSONP(http.StatusOK, gin.H{"status": 200, "inserted": insertedUsers, "updated": updatedUsers})
}

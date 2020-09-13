package ubox

import (
	"log"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"gopkg.in/mgo.v2/bson"
)

//获取 ubox 统计数据的概览
func RequestSummaryList(c *gin.Context) {
	list := FilterUboxField(c, Collection_User, "", "", false)
	c.JSONP(http.StatusOK, list)
}

//获取某个单独的user
func RequestDetail(c *gin.Context) {
	uboxID := c.Params.ByName("id")
	list := FilterUboxField(c, Collection_User, uboxID, "", false)
	c.JSONP(http.StatusOK, list)
}

//修改或者创建
func RequestEdit(c *gin.Context) {
	uboxID := c.Params.ByName("id")
	log.Println("in users id is ", uboxID)

	col := db.C(Collection_User)
	user := UboxUser{}
	user.Name = c.PostForm("name")

	user.Client = c.DefaultPostForm("client", "")
	user.Openning = c.DefaultPostForm("openning", "")
	user.Company = c.DefaultPostForm("company", "")
	user.Depart = c.DefaultPostForm("depart", "")
	user.Title = c.DefaultPostForm("title", "")
	user.Mobile = c.DefaultPostForm("mobile", "")
	user.Phone = c.DefaultPostForm("phone", "")
	user.Email = c.DefaultPostForm("email", "")
	user.IM = c.DefaultPostForm("im", "")
	user.City = c.DefaultPostForm("city", "")
	user.ContactDate = c.DefaultPostForm("contact_date", "")
	user.Remark = c.DefaultPostForm("remark", "")
	user.Comment = c.DefaultPostForm("comment", "")

	//edit
	op := 0
	if uboxID != "create" {
		d := new(UboxUser)
		col.FindId(bson.ObjectIdHex(uboxID)).One(&d)

		if d == nil {
			user.Id_ = bson.NewObjectId()
			col.Insert(user)
			log.Println("create custom success ", user.Id_, user.Name)
		} else {
			user.Id_ = d.Id_
			col.UpdateId(user.Id_, &user)
			log.Println("edit custom success ", user.Id_, user.Name)
		}
	} else {
		user.Id_ = bson.NewObjectId()
		col.Insert(user)
		op = 1
		log.Println("create users success ", user.Id_, user.Name)
	}

	c.JSON(http.StatusOK, gin.H{"status": 200, "op": op, "content": "success"})
}

func RequestDelete(c *gin.Context) {
	ids := c.DefaultPostForm("id", "")
	if ids == "" {
		c.JSON(http.StatusOK, gin.H{"status": 500, "content": "get no id from client request"})
		return
	}

	col := db.C(Collection_User)
	idList := strings.Split(ids, ",")
	for _, id := range idList {
		err := col.RemoveId(bson.ObjectIdHex(id))
		if err != nil {
			c.JSON(http.StatusOK, gin.H{"status": 500, "content": err})
			return
		}
	}

	log.Println("delete users success ", ids)
	c.JSON(http.StatusOK, gin.H{"status": 200, "content": "success"})
}

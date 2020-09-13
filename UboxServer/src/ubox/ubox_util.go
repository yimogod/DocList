package ubox

import (
	"strings"

	"github.com/gin-gonic/gin"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

var mongo *mgo.Session
var db *mgo.Database

//连接mongo数据库
func ConnecToDB() {
	//本机mongo db
	dbPath := "127.0.0.1:27017"

	if gin.IsDebugging() {
		//北京垃圾桶上的db
		dbPath = "10.230.64.71:27017"
		//阿里云
		//dbPath = "ubox.iyimo.net:27017"
		//家里的mac
		dbPath = "127.0.0.1:27017"
	}

	mongo, err := mgo.Dial(dbPath)
	if err != nil {
		panic(err)
	}

	mongo.SetMode(mgo.Monotonic, true)
	db = mongo.DB("ubox")
}

//查询collectin中的某些字段
func FilterUboxField(c *gin.Context, collection string, uboxID string, fieldName string, include bool) []interface{} {
	fileList := strings.Split(fieldName, ",")
	col := db.C(collection)

	var query *mgo.Query
	if uboxID == "" {
		query = col.Find(nil)
	} else {
		query = col.FindId(bson.ObjectIdHex(uboxID))
	}

	//有字段让我们能去选择
	if len(fileList) > 0 {
		f := 0
		if include {
			f = 1
		}
		filter := make(map[string]interface{})
		for _, v := range fileList {
			filter[v] = f
		}
		query.Select(filter)
	}

	var list []interface{}
	query.All(&list)
	return list
}

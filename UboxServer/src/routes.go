package main

import (
	"github.com/yimogod/ubox"
	"net/http"

	"github.com/gin-gonic/gin"
)

func InitializeRoutes() {
	v1 := router.Group("/api")
	{
		v1.POST("/upload_override", ubox.RequestExcelOverride)
		v1.POST("/upload_update", ubox.RequestExcelUpdate)
		v1.GET("/summary", ubox.RequestSummaryList)
		v1.GET("/detail/:id", ubox.RequestDetail)
		v1.POST("/edit/:id", ubox.RequestEdit)
		v1.POST("/delete", ubox.RequestDelete)
	}

	router.StaticFS("/bak", http.Dir("./bak"))
	router.StaticFS("/upload", http.Dir("./upload"))
	
	// Ping test
	router.GET("/ping", func(c *gin.Context) {
		c.String(http.StatusOK, "pong")
	})

	// Get user value
	router.GET("/user/:name", func(c *gin.Context) {
		user := c.Params.ByName("name")
		value, ok := db[user]
		if ok {
			c.JSON(http.StatusOK, gin.H{"user": user, "value": value})
		} else {
			c.JSON(http.StatusOK, gin.H{"user": user, "status": "no value"})
		}
	})

	// Authorized group (uses gin.BasicAuth() middleware)
	// Same than:
	// authorized := r.Group("/")
	// authorized.Use(gin.BasicAuth(gin.Credentials{
	//	  "foo":  "bar",
	//	  "manu": "123",
	//}))
	authorized := router.Group("/", gin.BasicAuth(gin.Accounts{
		"foo":  "bar", // user:foo password:bar
		"manu": "123", // user:manu password:123
	}))

	authorized.POST("admin", func(c *gin.Context) {
		user := c.MustGet(gin.AuthUserKey).(string)

		// Parse JSON
		var json struct {
			Value string `json:"value" binding:"required"`
		}

		if c.Bind(&json) == nil {
			db[user] = json.Value
			c.JSON(http.StatusOK, gin.H{"status": "ok"})
		}
	})
}

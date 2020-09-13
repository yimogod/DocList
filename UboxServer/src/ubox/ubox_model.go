package ubox

import "gopkg.in/mgo.v2/bson"

const (
	Collection_User string = "ubox_user"
)

type UboxUser struct {
	Id_      bson.ObjectId `bson:"_id"`
	Name     string        `bson:"name"`
	Client   string        `bson:"client"`
	Openning string        `bson:"openning"`

	Company string `bson:"company"`
	Depart  string `bson:"depart"`
	Title   string `bson:"title"` //职位

	Mobile string `bson:"mobile"`
	Phone  string `bson:"phone"` //in company or family
	Email  string `bson:"email"`
	IM     string `bson:"im"`

	City        string `bson:"city"`
	Channel     string `bson:"channel"`
	ContactDate string `bson:"contact_date"`

	Remark  string `bson:"remark"`
	Comment string `bson:"comment"`
}

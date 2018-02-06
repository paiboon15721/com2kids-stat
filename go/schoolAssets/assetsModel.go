package schoolAssets

import (
	"com2kids/go/config"

	"gopkg.in/mgo.v2/bson"
)

type usableStat struct {
	Usable   int `bson:"ใช้งานได้"`
	Unusable int `bson:"ใช้งานไม่ได้"`
}

type computerTotal struct {
	usableStat `bson:",inline"`
	Total      int `bson:"คอมพิวเตอร์"`
}

type computer struct {
	usableStat `bson:",inline"`
	ByBudget   int `bson:"งบประมาณ สพฐ."`
	BySelf     int `bson:"จัดหาเอง/บริจาค"`
}

type internet struct {
	Speed string `bson:"ความเร็ว"`
	Isp   string `bson:"ผู้ให้บริการ"`
	Tech  string `bson:"ประเภท"`
	Usage string `bson:"สถานะการใช้งาน"`
}

type internetSelf struct {
	internet       `bson:",inline"`
	BudgetPerMonth string `bson:"งบประมาณ/เดือน"`
}

type assets struct {
	InternetMOEnet internet      `bson:"INTERNET_MOEnet"`
	InternetSelf   internetSelf  `bson:"INTERNET_SELF"`
	ComputerTeach  computer      `bson:"COMP_TEACH"`
	ComputerAdmin  computer      `bson:"COMP_ADMIN"`
	ComputerTotal  computerTotal `bson:"COMP_TOTAL"`
}

type assetsWithSchool struct {
	assets `bson:",inline"`
	School []school
}

var lookupSchool = bson.M{
	"$lookup": bson.M{
		"from":         "schools",
		"localField":   "SCHOOL_ID",
		"foreignField": "SCHOOL_ID",
		"as":           "school",
	},
}

func allAssets() ([]assetsWithSchool, error) {
	as := []assetsWithSchool{}
	limit := bson.M{"$limit": 10}
	err := config.Assets.Pipe([]bson.M{lookupSchool, limit}).All(&as)
	if err != nil {
		return as, err
	}
	return as, nil
}

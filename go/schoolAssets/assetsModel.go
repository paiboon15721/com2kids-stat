package schoolAssets

import (
	"com2kids/go/config"

	"gopkg.in/mgo.v2/bson"
)

type usableStat struct {
	Usable   int `bson:"ใช้งานได้" json:"usable"`
	Unusable int `bson:"ใช้งานไม่ได้" json:"unusable"`
}

type computerTotal struct {
	usableStat `bson:",inline"`
	Total      int `bson:"คอมพิวเตอร์" json:"total"`
}

type computer struct {
	usableStat `bson:",inline"`
	ByBudget   int `bson:"งบประมาณ สพฐ." json:"byBudget"`
	BySelf     int `bson:"จัดหาเอง/บริจาค" json:"bySelf"`
}

type internet struct {
	Speed string `bson:"ความเร็ว" json:"speed"`
	Isp   string `bson:"ผู้ให้บริการ" json:"isp"`
	Tech  string `bson:"ประเภท" json:"tech"`
	Usage string `bson:"สถานะการใช้งาน" json:"usage"`
}

type internetSelf struct {
	internet       `bson:",inline"`
	BudgetPerMonth string `bson:"งบประมาณ/เดือน" json:"budgetPerMonth"`
}

type assets struct {
	InternetMOEnet internet      `bson:"INTERNET_MOEnet" json:"internetMOEnet"`
	InternetSelf   internetSelf  `bson:"INTERNET_SELF" json:"internetSelf"`
	ComputerTeach  computer      `bson:"COMP_TEACH" json:"computerTeach"`
	ComputerAdmin  computer      `bson:"COMP_ADMIN" json:"computerAdmin"`
	ComputerTotal  computerTotal `bson:"COMP_TOTAL" json:"computerTotal"`
}

type assetsWithSchool struct {
	assets `bson:"school_comp_net_data,inline"`
	School []school `json:"school"`
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

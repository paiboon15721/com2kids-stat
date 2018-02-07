package schoolAssets

import (
	"com2kids/go/config"
	"net/url"

	"gopkg.in/mgo.v2/bson"
)

type school struct {
	ID             int    `bson:"SCHOOL_ID" json:"id"`
	Name           string `bson:"โรงเรียน" json:"name"`
	Address        string `bson:"หมู่บ้าน" json:"address"`
	Tambon         string `bson:"ตำบล" json:"tambon"`
	Amphoe         string `bson:"อำเภอ" json:"amphoe"`
	Province       string `bson:"จังหวัด" json:"province"`
	Type           string `bson:"ประเภทการศึกษา" json:"type"`
	Size           string `bson:"ขนาดสถานศึกษา" json:"size"`
	TotalStudent   int    `bson:"นักเรียน" json:"totalStudent"`
	TotalClassroom int    `bson:"ห้องเรียน" json:"totalClassroom"`
	TotalTeacher   int    `bson:"ครู/บุคลากร" json:"totalTeacher"`
	Electricity    string `bson:"ไฟฟ้า" json:"electricity"`
}

type schoolWithAssets struct {
	school `bson:",inline"`
	Assets []assets `json:"asset,omitempty"`
}

var lookupAssets = bson.M{
	"$lookup": bson.M{
		"from":         "assets",
		"localField":   "SCHOOL_ID",
		"foreignField": "SCHOOL_ID",
		"as":           "assets",
	},
}

func allSchools(qs url.Values) ([]schoolWithAssets, error) {
	name := qs.Get("name")
	ss := []schoolWithAssets{}
	match := bson.M{"$match": bson.M{"โรงเรียน": bson.RegEx{Pattern: name, Options: ""}}}
	limit := bson.M{"$limit": 10}
	err := config.School.Pipe([]bson.M{match, lookupAssets, limit}).All(&ss)
	if err != nil {
		return ss, err
	}
	return ss, nil
}

func oneSchool(schoolID int) (schoolWithAssets, error) {
	s := schoolWithAssets{}
	match := bson.M{"$match": bson.M{"SCHOOL_ID": schoolID}}
	err := config.School.Pipe([]bson.M{match, lookupAssets}).One(&s)
	if err != nil {
		return s, err
	}
	return s, nil
}

func sizeList() ([]string, error) {
	ss := []string{}
	err := config.School.Find(nil).Distinct("ขนาดสถานศึกษา", &ss)
	if err != nil {
		return ss, err
	}
	return ss, nil
}

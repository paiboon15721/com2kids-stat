package schoolAssets

import (
	"com2kids/go/config"
	"net/url"

	"gopkg.in/mgo.v2/bson"
)

type school struct {
	ID             int    `bson:"SCHOOL_ID"`
	Name           string `bson:"โรงเรียน"`
	Address        string `bson:"หมู่บ้าน"`
	Tambon         string `bson:"ตำบล"`
	Amphoe         string `bson:"อำเภอ"`
	Province       string `bson:"จังหวัด"`
	Type           string `bson:"ประเภทการศึกษา"`
	Size           string `bson:"ขนาดสถานศึกษา"`
	TotalStudent   int    `bson:"นักเรียน"`
	TotalClassroom int    `bson:"ห้องเรียน"`
	TotalTeacher   int    `bson:"ครู/บุคลากร"`
	Electricity    string `bson:"ไฟฟ้า"`
}

type schoolWithAssets struct {
	school `bson:",inline"`
	Assets []assets
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
	match := bson.M{"$match": bson.M{"โรงเรียน": bson.RegEx{name, ""}}}
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

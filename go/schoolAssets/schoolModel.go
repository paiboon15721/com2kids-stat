package schoolAssets

import (
	"com2kids/go/config"
	"net/url"
	"strconv"

	"gopkg.in/mgo.v2/bson"
)

type school struct {
	ID             int    `bson:"SCHOOL_ID" json:"id"`
	Name           string `bson:"โรงเรียน" json:"name"`
	EnglishName    string `bson:"ภาษาอังกฤษ" json:"englishName"`
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
	Assets assets `json:"assets,omitempty"`
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
	skip := bson.M{"$skip": 0}
	if qSkip, err := strconv.Atoi(qs.Get("skip")); err == nil {
		skip["$skip"] = qSkip
	}
	limit := bson.M{"$limit": 10}
	if qLimit, err := strconv.Atoi(qs.Get("limit")); err == nil {
		limit["$limit"] = qLimit
	}
	var pipeline []bson.M
	province := qs.Get("province")
	if province != "" {
		provinceMatch := bson.M{"$match": bson.M{"จังหวัด": bson.RegEx{Pattern: province, Options: ""}}}
		pipeline = append(pipeline, provinceMatch)
	}
	name := qs.Get("name")
	if name != "" {
		nameMatch := bson.M{"$match": bson.M{"โรงเรียน": bson.RegEx{Pattern: name, Options: ""}}}
		pipeline = append(pipeline, nameMatch)
	}
	pipeline = append(pipeline, lookupAssets, bson.M{"$unwind": "$assets"})
	if comLess, err := strconv.Atoi(qs.Get("comLess")); err == nil {
		comLessMatch := bson.M{"$match": bson.M{"assets.COMP_TOTAL.ใช้งานได้": bson.M{"$lt": comLess}}}
		pipeline = append(pipeline, comLessMatch)
	}
	sort := bson.M{"$sort": bson.M{"assets.COMP_TOTAL.ใช้งานได้": 1}}
	pipeline = append(pipeline, sort, skip, limit)
	ss := []schoolWithAssets{}
	err := config.School.Pipe(pipeline).AllowDiskUse().All(&ss)
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

func provinceList() ([]string, error) {
	ps := []string{}
	err := config.School.Find(nil).Distinct("จังหวัด", &ps)
	if err != nil {
		return ps, err
	}
	return ps, nil
}

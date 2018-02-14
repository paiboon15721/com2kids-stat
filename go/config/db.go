package config

import (
	"fmt"
	"os"

	"gopkg.in/mgo.v2"
)

// DB : com2kids database
var DB *mgo.Database

// School : schools collection
var School *mgo.Collection

// Assets : assets collection
var Assets *mgo.Collection

func init() {
	mongoURL := os.Getenv("MONGO_URL")
	if mongoURL == "" {
		mongoURL = "mongodb://localhost/com2kids"
	}
	s, err := mgo.Dial(mongoURL)
	if err != nil {
		panic(err)
	}
	if err = s.Ping(); err != nil {
		panic(err)
	}
	fmt.Println("connected to mongodb")
	DB = s.DB("com2kids")
	School = DB.C("schools")
	err = School.EnsureIndex(
		mgo.Index{
			Key:    []string{"SCHOOL_ID"},
			Unique: true,
		},
	)
	if err != nil {
		panic(err)
	}
	fmt.Println("ensured schools.SCHOOL_ID index")
	err = School.EnsureIndexKey("จังหวัด")
	if err != nil {
		panic(err)
	}
	fmt.Println("ensured schools.จังหวัด index")
	err = School.EnsureIndexKey("โรงเรียน")
	if err != nil {
		panic(err)
	}
	fmt.Println("ensured schools.โรงเรียน index")
	err = School.EnsureIndexKey("ภาษาอังกฤษ")
	if err != nil {
		panic(err)
	}
	fmt.Println("ensured schools.ภาษาอังกฤษ index")
	Assets = DB.C("school_comp_net_data")
	err = Assets.EnsureIndex(
		mgo.Index{
			Key:    []string{"SCHOOL_ID"},
			Unique: true,
		},
	)
	if err != nil {
		panic(err)
	}
	fmt.Println("ensured school_comp_net_data.SCHOOL_ID index")
	err = Assets.EnsureIndexKey("COMP_TOTAL.ใช้งานได้")
	if err != nil {
		panic(err)
	}
	fmt.Println("ensured school_comp_net_data.COMP_TOTAL.ใช้งานได้ index")
	fmt.Println("everything ready to go :)")
}

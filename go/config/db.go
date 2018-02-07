package config

import (
	"fmt"

	bolt "github.com/coreos/bbolt"
	"gopkg.in/mgo.v2"
)

// DB : com2kids database
var DB *mgo.Database

// Bolt : cache database
var Bolt *bolt.DB

// School : schools collection
var School *mgo.Collection

// Assets : assets collection
var Assets *mgo.Collection

func init() {
	s, err := mgo.Dial("mongodb://localhost")
	if err != nil {
		panic(err)
	}
	Bolt, err = bolt.Open("my.db", 0600, nil)
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
	Assets = DB.C("assets")
	err = Assets.EnsureIndex(
		mgo.Index{
			Key:    []string{"SCHOOL_ID"},
			Unique: true,
		},
	)
	if err != nil {
		panic(err)
	}
	fmt.Println("ensured assets.SCHOOL_ID index")
	err = Assets.EnsureIndexKey("COMP_TOTAL.ใช้งานได้")
	if err != nil {
		panic(err)
	}
	fmt.Println("ensured assets.COMP_TOTAL.ใช้งานได้ index")
}

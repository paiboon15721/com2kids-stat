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
	Assets = DB.C("assets")
}

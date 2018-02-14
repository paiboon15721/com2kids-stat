package main

import (
	"com2kids/go/schoolAssets"
	"fmt"
	"net/http"
	"os"

	"github.com/julienschmidt/httprouter"
	"github.com/rs/cors"
)

func main() {
	router := httprouter.New()
	router.GET("/schools", schoolAssets.SchoolIndex)
	router.GET("/schools/:schoolID", schoolAssets.SchoolShow)
	router.GET("/school-sizes", schoolAssets.SchoolGetSizeList)
	router.GET("/school-provinces", schoolAssets.SchoolGetProvinceList)
	router.GET("/assets", schoolAssets.AssetsIndex)
	c := cors.New(cors.Options{
		ExposedHeaders: []string{"X-Total-Count"},
	})
	portenv := os.Getenv("PORT")
	if portenv == "" {
		portenv = "3001"
	}
	port := fmt.Sprintf("%s%s", ":", portenv)
	http.ListenAndServe(port, c.Handler(router))
}

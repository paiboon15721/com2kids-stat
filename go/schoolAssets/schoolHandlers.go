package schoolAssets

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/julienschmidt/httprouter"
)

// SchoolIndex : /
func SchoolIndex(w http.ResponseWriter, req *http.Request, _ httprouter.Params) {
	qs := req.URL.Query()
	ss, err := allSchools(qs)
	if err != nil {
		panic(err)
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(ss)
}

// SchoolShow : /:schoolID
func SchoolShow(w http.ResponseWriter, req *http.Request, ps httprouter.Params) {
	schoolID, _ := strconv.Atoi(ps.ByName("schoolID"))
	s, err := oneSchool(schoolID)
	if err != nil {
		http.Error(w, http.StatusText(http.StatusNotFound), http.StatusNotFound)
		return
	}
	json.NewEncoder(w).Encode(s)
}

// SchoolGetSizeList : /school-sizes
func SchoolGetSizeList(w http.ResponseWriter, req *http.Request, _ httprouter.Params) {
	ss, err := sizeList()
	if err != nil {
		panic(err)
	}
	json.NewEncoder(w).Encode(ss)
}

// SchoolGetProvinceList : /school-provinces
func SchoolGetProvinceList(w http.ResponseWriter, req *http.Request, _ httprouter.Params) {
	ps, err := provinceList()
	if err != nil {
		panic(err)
	}
	json.NewEncoder(w).Encode(ps)
}

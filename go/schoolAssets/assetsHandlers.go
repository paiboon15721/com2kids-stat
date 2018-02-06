package schoolAssets

import (
	"encoding/json"
	"net/http"

	"github.com/julienschmidt/httprouter"
)

// AssetsIndex :
func AssetsIndex(w http.ResponseWriter, req *http.Request, _ httprouter.Params) {
	as, err := allAssets()
	if err != nil {
		panic(err)
	}
	json.NewEncoder(w).Encode(as)
}

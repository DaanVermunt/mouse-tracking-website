package app

import (
	"backend/model"
	"encoding/json"
	"fmt"
	"net/http"
)

func (a *App) addProbeResponse(w http.ResponseWriter, r *http.Request) {
	var probe model.Probe
	decode := json.NewDecoder(r.Body)
	if err := decode.Decode(&probe); err != nil {
		fmt.Println(err)
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(500)
		response, _ := json.Marshal(map[string]string{"error": "an error"})
		w.Write(response)
		return
	}

	a.DB.Create(&probe)

	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.WriteHeader(http.StatusCreated)
	response, _ := json.Marshal(map[string]string{"status": "success"})
	w.Write(response)
}

package app

import (
	"backend/model"
	"encoding/json"
	"fmt"
	"net/http"
)

func (a *App) createRecord(w http.ResponseWriter, r *http.Request) {
	var record model.Record
	decode := json.NewDecoder(r.Body)
	if err := decode.Decode(&record); err != nil {
		fmt.Println(err)
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(500)
		response, _ := json.Marshal(map[string]string{"error": "an error"})
		w.Write(response)
		return
	}

	a.DB.Create(&record)

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	response, _ := json.Marshal(record)
	w.Write(response)

}

func (a *App) getRecords(w http.ResponseWriter, r *http.Request) {
	var records []model.Record
	a.DB.Find(&records)

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	response, _ := json.Marshal(records)
	w.Write(response)
}
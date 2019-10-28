package app

import (
	"backend/model"
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
)

func (a *App) submitQuestionnaire(w http.ResponseWriter, r *http.Request) {
	var quest model.Questionnaire
	decode := json.NewDecoder(r.Body)
	if err := decode.Decode(&quest); err != nil {
		fmt.Println(err)
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(500)
		response, _ := json.Marshal(map[string]string{"error": "an error"})
		w.Write(response)
		return
	}

	a.DB.Create(&quest)

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	response, _ := json.Marshal(map[string]string{"status": "success", "cookieId": strconv.Itoa(int(quest.ID))})
	w.Write(response)
}

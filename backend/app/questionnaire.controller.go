package app

import (
	"backend/model"
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
	"time"
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
	questID := strconv.Itoa(int(quest.ID))

	expire := time.Now().AddDate(0, 1, 1)
	cookie := http.Cookie{
		Name:       "userId",
		Value:      questID,
		Path:       "/",
		Domain:     "localhost",
		Expires:    expire,
		//RawExpires: "",
		//MaxAge:     0,
		//Secure:     false,
		//HttpOnly:   false,
		//SameSite:   0,
		//Raw:        "",
		//Unparsed:   nil,
	}

	http.SetCookie(w, &cookie)

	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.WriteHeader(http.StatusCreated)
	response, _ := json.Marshal(map[string]string{"status": "success", "cookieId": questID})
	w.Write(response)
}

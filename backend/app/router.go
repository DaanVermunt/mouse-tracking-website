package app

import (
	"backend/controllers"
	"github.com/gorilla/mux"
	"net/http"
)

func (a *App) initRoutes() {
	a.Router.Use(mux.CORSMethodMiddleware(a.Router))

	a.Router.HandleFunc("/", controllers.IndexHandler)
	a.Router.HandleFunc("/qod", controllers.QuoteOfTheDayHandler())
	a.Router.HandleFunc("/submit_quest", a.submitQuestionnaire).Methods(http.MethodPost, http.MethodOptions)
	a.Router.HandleFunc("/submit_question", a.submitQuestion).Methods(http.MethodPost, http.MethodOptions)
	a.Router.HandleFunc("/create_record", a.createRecord).Methods(http.MethodPost, http.MethodOptions)
	a.Router.HandleFunc("/records", a.getRecords).Methods(http.MethodGet)
}

package app

import (
	"backend/controllers"
)

func (a *App) initRoutes() {
	a.Router.HandleFunc("/", controllers.IndexHandler)
	a.Router.HandleFunc("/qod", controllers.QuoteOfTheDayHandler())
	a.Router.HandleFunc("/submit_quest", a.submitQuestionnaire).Methods("POST")
	a.Router.HandleFunc("/create_record", a.createRecord).Methods("POST")
	a.Router.HandleFunc("/records", a.getRecords).Methods("GET")
}

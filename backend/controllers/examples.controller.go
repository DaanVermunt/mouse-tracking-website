package controllers

import (
	"net/http"
)

func IndexHandler(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Welcome! Please hit the `/qod` API to get the quote of the day."))
}

func QuoteOfTheDayHandler() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("some quote that is not changing over time"))
	}
}
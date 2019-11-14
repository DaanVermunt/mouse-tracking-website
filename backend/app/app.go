package app

import (
	"backend/model"
	"context"
	"github.com/jinzhu/gorm"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/mux"
	_ "github.com/jinzhu/gorm/dialects/mssql"
)

type App struct {
	DB *gorm.DB
	Router *mux.Router
}

func (a *App) Initialize(user, password, dbname string) {
	a.Router = mux.NewRouter()
	a.initRoutes()

	time.Sleep(time.Duration(10) * time.Second)
	db, err := gorm.Open("mysql", "user:pass@(mysql:3306)/mouse_tracker?charset=utf8&parseTime=True&loc=Local")

	if err != nil {
		db, err = gorm.Open("mysql", "user:pass@(mysql_prod:3306)/mouse_tracker?charset=utf8&parseTime=True&loc=Local")
		if err != nil {
			panic(err.Error())
		}
	}

	db.AutoMigrate(&model.Record{}, &model.Questionnaire{}, &model.Question{}, &model.Probe{})

	a.DB = db
}

func (a *App) Run(addr string) {

	srv := &http.Server{
		Handler:      a.Router,
		Addr:         addr,
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 10 * time.Second,
	}

	// Start Server
	go func() {
		log.Println("Starting Server")
		if err := srv.ListenAndServe(); err != nil {
			log.Fatal(err)
		}
	}()

	// Graceful Shutdown
	waitForShutdown(srv)
}


func waitForShutdown(srv *http.Server) {
	interruptChan := make(chan os.Signal, 1)
	signal.Notify(interruptChan, os.Interrupt, syscall.SIGINT, syscall.SIGTERM)

	// Block until we receive our signal.
	<-interruptChan

	// Create a deadline to wait for.
	ctx, cancel := context.WithTimeout(context.Background(), time.Second*10)
	defer cancel()
	srv.Shutdown(ctx)

	log.Println("Shutting down")
	os.Exit(0)
}


package main

import (
	"backend/app"
	"os"
)

func main() {
	a := app.App{}

	a.Initialize("user", "pass", "mouse_tracker")
	a.Run(":8080")
}

func getEnv(key, defaultValue string) string {
	value := os.Getenv(key)
	if value == "" {
		return defaultValue
	}
	return value
}
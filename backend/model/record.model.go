package model

import (
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
	"time"
)

type Record struct {
	gorm.Model
	Timestamp    *time.Time `json:"timestamp"`
	UserId       string     `json:"userId"`
	ClickedLeft  bool       `json:"clickedLeft"`
	ClickedRight bool       `json:"clickedRight"`
	OnScreen     bool       `json:"onScreen"`
	ScreenLoc    int        `json:"scrollLoc"`
	SelectedText string     `json:"selectedText"`
	X            int        `json:"x"`
	Y            int        `json:"y"`
}

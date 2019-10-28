package model

import (
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
)

type Questionnaire struct {
	gorm.Model
	ScreenWidth int `json:"screenWidth"`
	ScreenHeight int `json:"screenHeight"`
	Age int `json:"age"`
	Gender string `json:"gender"`
	LevelOfEducation string `json:"levelOfEducation"`
	Distraction int `json:"distraction"`
	UsingMouse bool `json:"usingMouse"`
	ReadWarAndPeace bool `json:"readWarAndPeace"`
}

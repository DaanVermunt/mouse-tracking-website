package model

import (
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
)

type Questionnaire struct {
	gorm.Model
	ScreenWidth      int    `json:"screenWidth"`
	ScreenHeight     int    `json:"screenHeight"`
	Age              int    `json:"age"`
	Gender           string `json:"gender"`
	LevelOfEducation string `json:"levelOfEducation"`
	UsingMouse       bool   `json:"usingMouse"`
	ReadWarAndPeace  bool   `json:"readWarAndPeace"`
	ReadGrimm        bool   `json:"readGrimm"`
}

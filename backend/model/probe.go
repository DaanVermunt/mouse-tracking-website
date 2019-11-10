package model

import (
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
)

type Probe struct {
	gorm.Model
	UserId       string `json:"userId"`
	Answer       int    `json:"answer"`
	PageNr       int    `json:"page"`
	DelayTime    int    `json:"delayTime"`
	TimeToAnswer int    `json:"timeToAnswer"`
}

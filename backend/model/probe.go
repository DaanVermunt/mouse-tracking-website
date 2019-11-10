package model

import (
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
	"time"
)

type Probe struct {
	gorm.Model
	Timestamp    *time.Time `json:"timestamp"`
	UserId       string `json:"userId"`
	Answer       int    `json:"answer"`
	PageNr       int    `json:"page"`
	DelayTime    int    `json:"delayTime"`
	TimeToAnswer int    `json:"timeToAnswer"`
}

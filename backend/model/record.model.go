package model

import (
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
	"time"
)

type Record struct {
	gorm.Model
	Timestamp	*time.Time 	`json:"timestamp"`
	UserId		string		`json:"userId"`		
}

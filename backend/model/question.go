package model

import (
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
)

type Question struct {
	gorm.Model
	UserId  string `json:"userId"`
	Book    string `json:"book"`
	Correct bool   `json:"correct"`
	PageNr  int    `json:"page"`
}

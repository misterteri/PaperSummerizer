package handlers

import (
	"log"
)

type Modify struct {
	Logger *log.Logger
}

func NewModifyHandler(logger *log.Logger) *Get {
	return &Get{logger}
}

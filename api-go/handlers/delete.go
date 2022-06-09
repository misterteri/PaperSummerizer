package handlers

import (
	"log"
)

type Delete struct {
	Logger *log.Logger
}

func NewDeleteHandler(logger *log.Logger) *Get {
	return &Get{logger}
}

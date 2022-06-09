package handlers

import (
	"fmt"
	"log"
	"net/http"
)

type Create struct {
	Logger *log.Logger
}

func NewCreateHandler(logger *log.Logger) *Get {
	return &Get{logger}
}

func (create *Create) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	create.Logger.Println("Received CREATE request")
	w.WriteHeader(http.StatusOK)

	fmt.Println(r.URL.Query().Get("url"))
}

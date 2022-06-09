package handlers

import (
	"fmt"
	"log"
	"net/http"
)

type Get struct {
	Logger *log.Logger
}

func NewGetHandler(logger *log.Logger) *Get {
	return &Get{logger}
}

func (get *Get) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	get.Logger.Println("Received GET request")
	w.WriteHeader(http.StatusOK)

	fmt.Println(r.URL.Query().Get("url"))
}

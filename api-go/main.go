package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"os/signal"
	"parver/handlers"
	"syscall"
	"time"
)

func main() {
	logger := log.New(os.Stdout, "parser ", log.LstdFlags)

	serveMux := http.NewServeMux()
	serveMux.Handle("/api/v1/create", handlers.NewCreateHandler(logger))
	serveMux.Handle("/api/v1/delete", handlers.NewDeleteHandler(logger))
	serveMux.Handle("/api/v1/modify", handlers.NewModifyHandler(logger))
	serveMux.Handle("/api/v1/get", handlers.NewGetHandler(logger))

	server := &http.Server{
		Addr:         ":8080",
		Handler:      serveMux,
		IdleTimeout:  120 * time.Second,
		ReadTimeout:  120 * time.Second,
		WriteTimeout: 120 * time.Second,
	}

	go server.ListenAndServe()
	logger.Println("Listen and serve at http://localhost:8080")

	signalChannel := make(chan os.Signal, 1)
	signal.Notify(signalChannel, os.Interrupt, syscall.SIGTERM)

	signal := <-signalChannel
	logger.Println("Received termination, gracefully shutdown", signal)

	tc, _ := context.WithDeadline(context.Background(), time.Now().Add(30*time.Second))
	server.Shutdown(tc)
}

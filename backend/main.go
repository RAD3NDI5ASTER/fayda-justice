package main

import (
	"log"
	"net/http"

	"github.com/joho/godotenv"
	"github.com/RAD3NDI5ASTER/fayda-justice/backend/auth"
)

func main() {
	_ = godotenv.Load()

	http.HandleFunc("/callback", auth.HandleCallback)

	log.Println("Backend running at http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}

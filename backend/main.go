

package main

import (
    "github.com/RAD3NDI5ASTER/fayda-justice/auth"

    "github.com/joho/godotenv"
    "log"
    "net/http"
    "os"
)

func main() {
    // Load .env file for env vars
    if err := godotenv.Load(); err != nil {
        log.Fatalf("Error loading .env: %v", err)
    }

    // Setup routes for authentication
    http.HandleFunc("/auth/login", auth.LoginHandler)
    http.HandleFunc("/auth/callback", auth.CallbackHandler)

    // Get port from environment or default to 8080
    port := os.Getenv("PORT")
    if port == "" {
        port = "8080"
    }

    log.Printf("Server started on :%s", port)
    // Start HTTP server
    if err := http.ListenAndServe(":"+port, nil); err != nil {
        log.Fatalf("Server error: %v", err)
    }
}

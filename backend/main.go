package main

import (
	"fmt"
	"log"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"

	"github.com/RAD3NDI5ASTER/fayda-justice/backend/route"
)

func main() {
	// Load .env file
	err := godotenv.Load()
	if err != nil {
		log.Fatal("❌ Error loading .env file")
	}

	// Read port from .env or use default
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080" // fallback port
	}

	// Initialize Gin
	router := gin.Default()

	// Initialize routes
	route.SetupRoutes(router)

	// Start server
	fmt.Printf("🚀 Server running on http://localhost:%s\n", port)
	err = router.Run(":" + port)
	if err != nil {
		log.Fatalf("❌ Failed to start server: %v", err)
	}
}

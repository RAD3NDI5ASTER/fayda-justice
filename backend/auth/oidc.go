package auth

import (
	"net/http"
	"os"
	"fmt"
)

func LoginHandler(w http.ResponseWriter, r *http.Request) {
	clientID := os.Getenv("CLIENT_ID")
	redirectURI := os.Getenv("REDIRECT_URI")
	authEndpoint := os.Getenv("AUTHORIZATION_ENDPOINT")

	url := fmt.Sprintf("%s?client_id=%s&redirect_uri=%s&response_type=code&scope=openid", authEndpoint, clientID, redirectURI)
	http.Redirect(w, r, url, http.StatusFound)
}

func CallbackHandler(w http.ResponseWriter, r *http.Request) {
	// Placeholder for token exchange, validate code here
	w.Write([]byte("Callback received! Implement token exchange logic"))
}

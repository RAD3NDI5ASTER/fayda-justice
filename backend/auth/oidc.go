package auth

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
)

type TokenResponse struct {
	AccessToken string `json:"access_token"`
	IdToken     string `json:"id_token"`
}

func HandleCallback(w http.ResponseWriter, r *http.Request) {
	code := r.URL.Query().Get("code")

	if code == "" {
		http.Error(w, "Missing code param", http.StatusBadRequest)
		return
	}

	data := fmt.Sprintf(
		"grant_type=authorization_code&code=%s&redirect_uri=%s&client_id=%s&client_assertion_type=%s&client_assertion=%s",
		code,
		os.Getenv("REDIRECT_URI"),
		os.Getenv("CLIENT_ID"),
		os.Getenv("CLIENT_ASSERTION_TYPE"),
		os.Getenv("PRIVATE_KEY"), // Normally this is a signed JWT!
	)

	req, err := http.NewRequest("POST", os.Getenv("TOKEN_ENDPOINT"), io.NopCloser(strings.NewReader(data)))
	if err != nil {
		http.Error(w, "Failed to build token request", http.StatusInternalServerError)
		return
	}
	req.Header.Add("Content-Type", "application/x-www-form-urlencoded")

	client := http.Client{}
	resp, err := client.Do(req)
	if err != nil || resp.StatusCode != 200 {
		http.Error(w, "Token exchange failed", http.StatusUnauthorized)
		return
	}
	defer resp.Body.Close()

	var tokenResp TokenResponse
	json.NewDecoder(resp.Body).Decode(&tokenResp)

	// Respond with token or redirect to frontend with it
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(tokenResp)
}

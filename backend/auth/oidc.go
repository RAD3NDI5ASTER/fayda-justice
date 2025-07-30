package auth

import (
	"context"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
)

type User struct {
	Name  string `json:"name"`
	Email string `json:"email"`
}

func RequireAuth(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Dummy auth for testing — replace with real check
		if r.Header.Get("Authorization") == "" {
			http.Error(w, "Unauthorized", http.StatusUnauthorized)
			return
		}
		next.ServeHTTP(w, r)
	})
}

func CallbackHandler(w http.ResponseWriter, r *http.Request) {
	code := r.URL.Query().Get("code")
	if code == "" {
		http.Error(w, "Missing code", http.StatusBadRequest)
		return
	}

	clientID := os.Getenv("CLIENT_ID")
	privateKey := os.Getenv("PRIVATE_KEY")
	tokenEndpoint := os.Getenv("TOKEN_ENDPOINT")
	userinfoEndpoint := os.Getenv("USERINFO_ENDPOINT")

	// Prepare JWT assertion
	jwtAssertion := generateClientAssertion(clientID, privateKey) // You should implement this

	data := fmt.Sprintf(
		"grant_type=authorization_code&code=%s&client_id=%s&client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer&client_assertion=%s&redirect_uri=http://localhost:3000/callback",
		code, clientID, jwtAssertion,
	)

	req, _ := http.NewRequest("POST", tokenEndpoint, io.NopCloser(strings.NewReader(data)))
	req.Header.Add("Content-Type", "application/x-www-form-urlencoded")

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		http.Error(w, "Token request failed", http.StatusInternalServerError)
		return
	}
	defer resp.Body.Close()

	var tokenResp map[string]interface{}
	json.NewDecoder(resp.Body).Decode(&tokenResp)

	accessToken := tokenResp["access_token"].(string)

	// Fetch user info
	userReq, _ := http.NewRequest("GET", userinfoEndpoint, nil)
	userReq.Header.Add("Authorization", "Bearer "+accessToken)

	userResp, err := http.DefaultClient.Do(userReq)
	if err != nil {
		http.Error(w, "Userinfo request failed", http.StatusInternalServerError)
		return
	}
	defer userResp.Body.Close()

	var userInfo User
	json.NewDecoder(userResp.Body).Decode(&userInfo)

	// Just show name for now
	fmt.Fprintf(w, "Welcome, %s!", userInfo.Name)
}

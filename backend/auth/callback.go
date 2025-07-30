package auth

import (
    "encoding/json"
    "io"
    "net/http"
    "net/url"
    "os"
)

// CallbackHandler handles the OAuth2 callback by exchanging code for tokens
func OAuthCallbackHandler(w http.ResponseWriter, r *http.Request) {
    code := r.URL.Query().Get("code")
    if code == "" {
        http.Error(w, "Missing code in callback", http.StatusBadRequest)
        return
    }

    tokenEndpoint := os.Getenv("TOKEN_ENDPOINT")
    clientID := os.Getenv("CLIENT_ID")
    redirectURI := os.Getenv("REDIRECT_URI")

    data := url.Values{}
    data.Set("grant_type", "authorization_code")
    data.Set("code", code)
    data.Set("redirect_uri", redirectURI)
    data.Set("client_id", clientID)
    data.Set("client_assertion_type", os.Getenv("CLIENT_ASSERTION_TYPE"))

    // Generate JWT client assertion to authenticate client
    clientAssertion, err := GenerateJWTAssertion()
    if err != nil {
        http.Error(w, "Failed to generate client assertion: "+err.Error(), http.StatusInternalServerError)
        return
    }
    data.Set("client_assertion", clientAssertion)

    resp, err := http.PostForm(tokenEndpoint, data)
    if err != nil {
        http.Error(w, "Failed to get token: "+err.Error(), http.StatusInternalServerError)
        return
    }
    defer resp.Body.Close()

    body, err := io.ReadAll(resp.Body)
    if err != nil {
        http.Error(w, "Failed to read token response: "+err.Error(), http.StatusInternalServerError)
        return
    }

    if resp.StatusCode != http.StatusOK {
        http.Error(w, "Token endpoint error: "+string(body), http.StatusInternalServerError)
        return
    }

    var tokenResp map[string]interface{}
    if err := json.Unmarshal(body, &tokenResp); err != nil {
        http.Error(w, "Failed to parse token response: "+err.Error(), http.StatusInternalServerError)
        return
    }

    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(tokenResp)
}

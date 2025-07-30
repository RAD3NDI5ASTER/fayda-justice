package auth

import (
    "crypto/rand"
    "encoding/base64"
    "log"
    "net/http"
    "net/url"
    "os"
)

// generateState generates a secure random string for OAuth2 state parameter
func generateState(length int) (string, error) {
    b := make([]byte, length)
    _, err := rand.Read(b)
    if err != nil {
        return "", err
    }
    return base64.URLEncoding.EncodeToString(b), nil
}

// LoginHandlerV2 initiates OAuth2 login flow
func LoginHandlerV2(w http.ResponseWriter, r *http.Request) {
    authEndpoint := os.Getenv("AUTHORIZATION_ENDPOINT")
    clientID := os.Getenv("CLIENT_ID")
    redirectURI := os.Getenv("REDIRECT_URI")
    scope := "openid profile email"

    if authEndpoint == "" || clientID == "" || redirectURI == "" {
        log.Println("OAuth config env variables missing")
        http.Error(w, "Server configuration error", http.StatusInternalServerError)
        return
    }

    state, err := generateState(16)
    if err != nil {
        log.Printf("Error generating state: %v", err)
        http.Error(w, "Internal Server Error", http.StatusInternalServerError)
        return
    }

    // Save state in cookie for CSRF protection
    http.SetCookie(w, &http.Cookie{
        Name:     "oauth_state",
        Value:    state,
        Path:     "/",
        HttpOnly: true,
        SameSite: http.SameSiteLaxMode,
        // Secure: true, // Enable for HTTPS in prod
    })

    params := url.Values{}
    params.Add("response_type", "code")
    params.Add("client_id", clientID)
    params.Add("redirect_uri", redirectURI)
    params.Add("scope", scope)
    params.Add("state", state)

    loginURL := authEndpoint + "?" + params.Encode()

    http.Redirect(w, r, loginURL, http.StatusFound)
}

// CallbackHandler handles OAuth2 provider callback
func CallbackHandler(w http.ResponseWriter, r *http.Request) {
    // Read state from cookie
    cookie, err := r.Cookie("oauth_state")
    if err != nil {
        http.Error(w, "State cookie missing", http.StatusBadRequest)
        return
    }

    stateFromCookie := cookie.Value
    stateFromQuery := r.URL.Query().Get("state")

    if stateFromCookie == "" || stateFromQuery == "" || stateFromCookie != stateFromQuery {
        http.Error(w, "Invalid state parameter", http.StatusBadRequest)
        return
    }

    code := r.URL.Query().Get("code")
    if code == "" {
        http.Error(w, "Code parameter missing", http.StatusBadRequest)
        return
    }

    // TODO: Exchange `code` for tokens at the OAuth2 token endpoint here

    // After successful exchange and validation, establish session or JWT

    w.Write([]byte("Login successful! You can now close this window or be redirected."))
}

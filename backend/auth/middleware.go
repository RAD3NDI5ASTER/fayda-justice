package auth

import (
    "context"
    "errors"
    "net/http"
    "strings"
)

type contextKey string

const (
    UserIDKey contextKey = "userID"
    RoleKey   contextKey = "role"
)

// RequireAuth is middleware that validates JWT token from Authorization header.
func RequireAuth(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        authHeader := r.Header.Get("Authorization")
        if authHeader == "" {
            http.Error(w, "Authorization header missing", http.StatusUnauthorized)
            return
        }

        // Typically the header is like: "Bearer <token>"
        parts := strings.SplitN(authHeader, " ", 2)
        if len(parts) != 2 || strings.ToLower(parts[0]) != "bearer" {
            http.Error(w, "Invalid Authorization header format", http.StatusUnauthorized)
            return
        }

        tokenString := parts[1]

        userID, role, err := ValidateToken(tokenString)
        if err != nil {
            http.Error(w, "Unauthorized: "+err.Error(), http.StatusUnauthorized)
            return
        }

        ctx := context.WithValue(r.Context(), UserIDKey, userID)
        ctx = context.WithValue(ctx, RoleKey, role)
        next.ServeHTTP(w, r.WithContext(ctx))
    })
}

// ValidateToken validates the JWT token string and extracts user info.
// Replace this stub with your real token validation logic.
func ValidateToken(tokenString string) (string, string, error) {
    if tokenString == "" {
        return "", "", errors.New("empty token")
    }

    // TODO: implement JWT validation, parsing, and claims extraction here
    // For example, parse JWT, verify signature, check expiration, extract user ID and role from claims

    // Stub for demo:
    userID := "demo-user-id"
    role := "user"

    return userID, role, nil
}

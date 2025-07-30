package auth

import (
    "context"
    "net/http"
)

type contextKey string

const (
    UserIDKey contextKey = "userID"
    RoleKey   contextKey = "role"
)

func RequireAuth(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        token := r.Header.Get("Authorization")
        userID, role, err := ValidateToken(token)
        if err != nil {
            http.Error(w, "Unauthorized", http.StatusUnauthorized)
            return
        }

        ctx := context.WithValue(r.Context(), UserIDKey, userID)
        ctx = context.WithValue(ctx, RoleKey, role)
        next.ServeHTTP(w, r.WithContext(ctx))
    })
}

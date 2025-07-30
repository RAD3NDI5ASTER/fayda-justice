package auth

import (
    "encoding/base64"
    "fmt"
    "os"
    "time"

    "github.com/golang-jwt/jwt/v5"
)

// GenerateJWTAssertion creates a signed JWT assertion using RS256.
// Returns the signed JWT string or an error if signing fails.
func GenerateJWTAssertion() (string, error) {
    keyB64 := os.Getenv("PRIVATE_KEY")
    if keyB64 == "" {
        return "", fmt.Errorf("PRIVATE_KEY env variable is empty")
    }

    privateKeyPEM, err := base64.StdEncoding.DecodeString(keyB64)
    if err != nil {
        return "", fmt.Errorf("failed to decode base64 private key: %w", err)
    }

    key, err := jwt.ParseRSAPrivateKeyFromPEM(privateKeyPEM)
    if err != nil {
        return "", fmt.Errorf("invalid private key PEM: %w", err)
    }

    claims := jwt.MapClaims{
        "iss": os.Getenv("CLIENT_ID"),
        "sub": os.Getenv("CLIENT_ID"),
        "aud": os.Getenv("TOKEN_ENDPOINT"),
        "exp": time.Now().Add(5 * time.Minute).Unix(),
        "iat": time.Now().Unix(),
        "jti": "fayda-" + fmt.Sprint(time.Now().UnixNano()),
    }

    token := jwt.NewWithClaims(jwt.SigningMethodRS256, claims)
    signed, err := token.SignedString(key)
    if err != nil {
        return "", fmt.Errorf("failed to sign JWT: %w", err)
    }

    return signed, nil
}

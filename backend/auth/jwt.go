package auth

import (
    "os"
    "time"
    "encoding/base64"

    "github.com/golang-jwt/jwt/v5"
)

func GenerateJWTAssertion() string {
    keyB64 := os.Getenv("PRIVATE_KEY")
    privateKeyPEM, _ := base64.StdEncoding.DecodeString(keyB64)

    key, err := jwt.ParseRSAPrivateKeyFromPEM(privateKeyPEM)
    if err != nil {
        panic("Invalid private key")
    }

    claims := jwt.MapClaims{
        "iss": os.Getenv("CLIENT_ID"),
        "sub": os.Getenv("CLIENT_ID"),
        "aud": os.Getenv("TOKEN_ENDPOINT"),
        "exp": time.Now().Add(time.Minute * 5).Unix(),
        "iat": time.Now().Unix(),
        "jti": "fayda-" + fmt.Sprint(time.Now().UnixNano()),
    }

    token := jwt.NewWithClaims(jwt.SigningMethodRS256, claims)
    signed, err := token.SignedString(key)
    if err != nil {
        panic("Failed to sign JWT: " + err.Error())
    }

    return signed
}

package handler

import (
    "encoding/json"
    "net/http"
    "faydajustice/auth"
)

func CallbackHandler(w http.ResponseWriter, r *http.Request) {
    code := r.URL.Query().Get("code")
    if code == "" {
        http.Error(w, "Missing code", http.StatusBadRequest)
        return
    }

    tokenResp, err := auth.ExchangeCode(code)
    if err != nil {
        http.Error(w, "Token exchange failed", http.StatusUnauthorized)
        return
    }

    userInfo, err := auth.GetUserInfo(tokenResp.AccessToken)
    if err != nil {
        http.Error(w, "User info fetch failed", http.StatusUnauthorized)
        return
    }

    json.NewEncoder(w).Encode(userInfo)
}

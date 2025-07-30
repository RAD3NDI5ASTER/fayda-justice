package handler

import (
    "encoding/json"
    "net/http"
    "faydajustice/model"
)

func GetCases(w http.ResponseWriter, r *http.Request) {
    role := r.Context().Value("role").(string)
    if role != "citizen" {
        http.Error(w, "Unauthorized", http.StatusUnauthorized)
        return
    }

    userID := r.Context().Value("userID").(string)

    cases := []model.Case{
        {"1", "Addis Ababa", "Criminal", "Pending", userID, "staff01", true},
    }

    json.NewEncoder(w).Encode(cases)
}

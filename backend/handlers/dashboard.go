package handler

import (
	"encoding/json"
	"net/http"
)

func GetDashboard(w http.ResponseWriter, r *http.Request) {
	data := map[string]string{
		"message": "This is protected dashboard content",
	}
	json.NewEncoder(w).Encode(data)
}

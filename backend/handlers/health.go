package handler

import (
    "net/http"
)

func HealthCheck(w http.ResponseWriter, r *http.Request) {
    w.Write([]byte(`{"status":"ok","service":"FaydaJustice backend"}`))
}

package route

import (
	"net/http"
	"faydajustice/auth"
	"faydajustice/handler"
)

func SetupRouter() *http.ServeMux {
	mux := http.NewServeMux()

	mux.HandleFunc("/auth/callback", auth.CallbackHandler)
	mux.Handle("/api/dashboard", auth.RequireAuth(http.HandlerFunc(handler.GetDashboard)))

	return mux
}

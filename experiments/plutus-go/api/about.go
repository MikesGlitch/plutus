package handler

import (
	"net/http"
	"time"

	"github.com/mikesglitch/plutus/components/pages/about"
)

func AboutHandler(w http.ResponseWriter, r *http.Request) {
	formattedTime := time.Now().Format(time.RFC850)
	about.Page(formattedTime).Render(r.Context(), w)
}

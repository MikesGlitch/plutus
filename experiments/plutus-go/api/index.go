package handler

import (
	"net/http"
	"time"

	"github.com/mikesglitch/plutus/components/pages/index"
)

func Handler(w http.ResponseWriter, r *http.Request) {
	formattedTime := time.Now().Format(time.RFC850)
	index.Page(formattedTime).Render(r.Context(), w)
}

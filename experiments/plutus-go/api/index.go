package handler

import (
	"net/http"
	"time"

	"github.com/mikesglitch/plutus/components"
)

func Handler(w http.ResponseWriter, r *http.Request) {
	formattedTime := time.Now().Format(time.RFC850)
	components.Page(formattedTime).Render(r.Context(), w)
}

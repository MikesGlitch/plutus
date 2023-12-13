package handler

import (
	"net/http"
	"time"

	"github.com/mikesglitch/plutus/components/pages/index"
)

func TestHandler(w http.ResponseWriter, r *http.Request) {
	formattedTime := time.Now().Format(time.RFC850)
	index.Hello(formattedTime).Render(r.Context(), w)
}

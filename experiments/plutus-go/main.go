package main

import (
	"net/http"
	"time"
	"fmt"

	"github.com/mikesglitch/plutus/components/pages/index"
)

func main() {
	// Test harness - Vercel only reads the api directory so this should ideally point to that after spinning up
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		formattedTime := time.Now().Format(time.RFC850)
		index.Page(formattedTime).Render(r.Context(), w)
	})

	fmt.Println("Listening on 127.0.0.1:4000")
	http.ListenAndServe("127.0.0.1:4000", nil)
}

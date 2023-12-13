package main

import (
	"fmt"
	"net/http"
	"time"

	"github.com/mikesglitch/plutus/components/pages/index"
)

func main() {
	// Test harness - Vercel only reads the api directory so this should ideally point to that after spinning up
	// This is wrong, it seems to be taking in all requests at this - need some work to make it fit with the vercel config
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		formattedTime := time.Now().Format(time.RFC850)
		index.Page(formattedTime).Render(r.Context(), w)
	})

	fmt.Println("Listening on 127.0.0.1:4000")
	http.ListenAndServe("127.0.0.1:4000", nil)
}

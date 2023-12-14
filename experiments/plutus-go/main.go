package main

import (
	_ "embed"
	"fmt"
	"github.com/mikesglitch/plutus/api"
	"github.com/mikesglitch/plutus/api/partials"
	"net/http"
)

// Should probably be embedding the html here rather than in the functions
// Is there a startup file that can happen as a result of ALL function?
// Otherwise I'm stuck embedding/making the templates on every handler
// How much of a cost is it? It's happening at compile time right?

func main() {
	// Test harness - Vercel only reads the api directory so this should ideally point to that after spinning up
	http.HandleFunc("/api/partials/test", partials.TestPartialHandler)
	http.HandleFunc("/about", api.AboutHandler)
	http.HandleFunc("/", api.IndexHandler)

	fmt.Println("Listening on 127.0.0.1:4000")
	http.ListenAndServe("127.0.0.1:4000", nil)
}

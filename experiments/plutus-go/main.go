package main

import (
	_ "embed"
	"fmt"
	"github.com/mikesglitch/plutus/api"
	"github.com/mikesglitch/plutus/api/partials"
	"net/http"
	// "time"
)

type NoTemplViewModel struct {
	Time string
}

// Should probably be embedding the html here rather than in the functions
// Is there a startup file that can happen as a result of ALL function?
// Otherwise I'm stuck embedding/making the templates on every handler
// How much of a cost is it? It's happening at compile time right?

func main() {
	// Test harness - Vercel only reads the api directory so this should ideally point to that after spinning up
	// This is wrong, it seems to be taking in all requests at this - need some work to make it fit with the vercel config
	// FYI: we're using templ cause vercel/other deployments wont always recognise a .html file as a part of deploy - they need a .go file.
	// Templ generates the html files as .go files which allows them to be picked up by Serverless deploys
	http.HandleFunc("/api/partials/test", partials.TestPartialHandler)
	http.HandleFunc("/notempl", api.NoTemplHandler)
	http.HandleFunc("/about", api.AboutHandler)
	http.HandleFunc("/", api.IndexHandler)

	fmt.Println("Listening on 127.0.0.1:4000")
	http.ListenAndServe("127.0.0.1:4000", nil)
}

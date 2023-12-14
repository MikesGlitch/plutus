package api

import (
	_ "embed"
	"html/template"
	"net/http"
	"time"
)

type NoTemplViewModel struct {
	Time string
}

// Can I embed this outside of the API?
// I'd like to do it in the main.go and have vercel understand it so I don't have to nest html my api folder to embed it

//go:embed "notempltest.html"
var noTemplPageHtml string

// https://www.makeuseof.com/go-html-templating/
func NoTemplHandler(w http.ResponseWriter, r *http.Request) {
	var noTemplTemplate = template.New("noTemplTemplate")
	noTemplTemplate.Parse(noTemplPageHtml)

	formattedTime := time.Now().Format(time.RFC850)
	vm := NoTemplViewModel{
		Time: formattedTime,
	}

	err := noTemplTemplate.Execute(w, vm)

	if err != nil {
		return
	}
}

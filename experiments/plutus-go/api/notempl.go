package handler

import (
	"html/template"
	"net/http"
	"time"
)

type NoTemplViewModel struct {
	Time string
}

// https://www.makeuseof.com/go-html-templating/
func NoTemplHandler(w http.ResponseWriter, r *http.Request) {
	var tmplt *template.Template
	formattedTime := time.Now().Format(time.RFC850)
	tmplt, _ = template.ParseFiles("notempltest.html")
	vm := NoTemplViewModel{
		Time: formattedTime,
	}

	err := tmplt.Execute(w, vm)

	if err != nil {
		return
	}
}

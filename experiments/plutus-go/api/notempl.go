package handler

import (
	"html/template"
	"net/http"
	"time"
)

var tmplt *template.Template

// https://www.makeuseof.com/go-html-templating/
func NoTemplHandler(w http.ResponseWriter, r *http.Request) {
	formattedTime := time.Now().Format(time.RFC850)
	tmplt, _ = template.ParseFiles("../components/pages/notempl/notempl.html")

	err := tmplt.Execute(w, formattedTime)

	if err != nil {
		return
	}
}

package handler

import (
	"html/template"
	"net/http"
	// "time"
)

type NoTemplViewModel struct {
	Time string
}

var tmplt *template.Template

// https://www.makeuseof.com/go-html-templating/
func NoTemplHandler(w http.ResponseWriter, r *http.Request) {
	// formattedTime := time.Now().Format(time.RFC850)
	tmplt, _ = template.ParseFiles("notempltest.html") // throwing them in public to see if it picks them up
	// vm := NoTemplViewModel{
	// 	Time: formattedTime,
	// }

	err := tmplt.Execute(w, nil)
	println("are we here?", err)
	if err != nil {
		return
	}
}

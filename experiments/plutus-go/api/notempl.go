package handler

import (
	"fmt"
	"html/template"
	"net/http"
	"os"
	"time"
)

type NoTemplViewModel struct {
	Time string
}

var tmplt *template.Template

// https://www.makeuseof.com/go-html-templating/
func NoTemplHandler(w http.ResponseWriter, r *http.Request) {
	mydir, _ := os.Getwd()
	println("dir", mydir)
	entries, _ := os.ReadDir(mydir)
	for _, e := range entries {
		fmt.Println(e.Name())
	}

	formattedTime := time.Now().Format(time.RFC850)
	tmplt, _ = template.ParseFiles("./../components/pages/notempl/notempl.html")
	vm := NoTemplViewModel{
		Time: formattedTime,
	}

	println("are we here?", tmplt)
	err := tmplt.Execute(w, vm)
	println("are we here?", err)
	if err != nil {
		return
	}
}

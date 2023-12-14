package main

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

func main() {
	mydir, _ := os.Getwd()
	println("are we here?", mydir)
	// Test harness - Vercel only reads the api directory so this should ideally point to that after spinning up
	// This is wrong, it seems to be taking in all requests at this - need some work to make it fit with the vercel config

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		formattedTime := time.Now().Format(time.RFC850)

		tmplt, _ = template.ParseFiles("./components/pages/notempl/notempl.html")

		vm := NoTemplViewModel{
			Time: formattedTime,
		}

		println("are we here?", tmplt)
		err := tmplt.Execute(w, vm)

		if err != nil {
			return
		}
	})

	fmt.Println("Listening on 127.0.0.1:4000")
	http.ListenAndServe("127.0.0.1:4000", nil)
}

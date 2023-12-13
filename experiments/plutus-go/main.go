package main

import (
	"fmt"
	"html/template"
	"net/http"
	"time"
)

type NoTemplViewModel struct {
	Time string
}

func main() {
	// Test harness - Vercel only reads the api directory so this should ideally point to that after spinning up
	// This is wrong, it seems to be taking in all requests at this - need some work to make it fit with the vercel config
	var tmplt *template.Template

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		formattedTime := time.Now().Format(time.RFC850)

		tmplt, _ = template.ParseFiles("./components/pages/notempl/notempl.html")

		vm := NoTemplViewModel{
			Time: formattedTime,
		}

		err := tmplt.Execute(w, vm)

		if err != nil {
			return
		}
	})

	fmt.Println("Listening on 127.0.0.1:4000")
	http.ListenAndServe("127.0.0.1:4000", nil)
}

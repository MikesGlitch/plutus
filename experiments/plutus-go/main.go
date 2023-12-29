package main

import (
	"database/sql"
	_ "embed"
	"fmt"
	"github.com/mikesglitch/plutus/api"
	"github.com/mikesglitch/plutus/api/partials"
	"net/http"

	_ "modernc.org/sqlite"
)

// Notes: I could give this a go: https://echo.labstack.com/docs/templates
// I could also give templ another go
// just make sure you need it - don't want to be beholden to it - there's only 1/2 active maintianers
// https://templ.guide/
// https://www.youtube.com/watch?v=EkK8Jxjj95s&t=2622s
// Yeah, add templ back in. He makes good points about failing in runtime and it's faster. Also cleaner

// Is there a startup file that can happen as a result of ALL function?
// Otherwise I'm stuck embedding/making the templates on every handler
// How much of a cost is it? It's happening at compile time right?

// Have a look at the official vercel bridge - https://github.com/vercel/go-bridge
// Should mean I don't have to duplicate the register of the handlers
func main() {
	db, err := sql.Open("sqlite", "./data/plutus.db")
	if err != nil {
		panic(err)
	}

	if _, err = db.Exec(`
	drop table if exists t;
	create table t(i);
	insert into t values(42), (314);
	`); err != nil {
		panic(err)
	}

	rows, err := db.Query("select i from t order by i;")
	if err != nil {
		panic(err)
	}

	for rows.Next() {
		var i int
		if err = rows.Scan(&i); err != nil {
			panic(err)
		}

		fmt.Println(i)
	}

	// Local only - Vercel only reads the api directory
	http.HandleFunc("/api/partials/test", partials.TestPartialHandler)
	http.HandleFunc("/about", api.AboutHandler)
	http.HandleFunc("/", api.IndexHandler)
	http.Handle("/plutus.css", http.FileServer(http.Dir("public")))

	fmt.Println("Listening on 127.0.0.1:4000")
	http.ListenAndServe("127.0.0.1:4000", nil)
}

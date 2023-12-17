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

// Is there a startup file that can happen as a result of ALL function?
// Otherwise I'm stuck embedding/making the templates on every handler
// How much of a cost is it? It's happening at compile time right?
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

	rows, err := db.Query("select 3*i from t order by i;")
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

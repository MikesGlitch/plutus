// /api/index.go
package handler

import (
	"fmt"
	"net/http"
)

// https://plutus-b6aovw6p1-mikesglitch.vercel.app/api/about
// Oh look, an example: https://github.com/riccardogiorato/template-go-vercel
func About(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "About page nomsaying")
}

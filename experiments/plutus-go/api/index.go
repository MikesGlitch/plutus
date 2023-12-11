// /api/index.go
package handler

import (
	"fmt"
	"net/http"
)

// https://plutus-mikesglitch.vercel.app/index
// Oh look, an example: https://github.com/riccardogiorato/template-go-vercel
func HelloWorld(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hello World from Go!")
}

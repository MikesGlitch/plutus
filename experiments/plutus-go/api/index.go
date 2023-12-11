// /api/index.go
package handler
import (
  "fmt"
  "net/http"
)
func HelloWorld(w http.ResponseWriter, r *http.Request) {
  fmt.Fprintf(w, "Hello World from Go!")
}
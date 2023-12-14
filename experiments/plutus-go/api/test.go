package api

import (
	"fmt"
	"net/http"
	"os"
	"path/filepath"
)

func TestHandler(w http.ResponseWriter, r *http.Request) {
	mydir, _ := os.Getwd()
	println("dir", mydir)
	backOne, _ := filepath.Abs(mydir + "../")
	println("dir", backOne)
	entries, _ := os.ReadDir(mydir)
	for _, e := range entries {
		fmt.Println(e.Name())
	}

	backOneEntries, _ := os.ReadDir(backOne)
	for _, e := range backOneEntries {
		fmt.Println(e.Name())
	}
}

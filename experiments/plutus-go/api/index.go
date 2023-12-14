package api

import (
	"html/template"
	"net/http"
	"time"

	"github.com/mikesglitch/plutus/components/common"
	"github.com/mikesglitch/plutus/components/layouts"
	"github.com/mikesglitch/plutus/components/pages"
)

type NoTemplViewModel struct {
	Title string
	Time  string
}

func IndexHandler(w http.ResponseWriter, r *http.Request) {
	var page = template.New("IndexPage")
	page.Parse(layouts.BlankLayoutHtml)
	page.Parse(pages.IndexPageHtml)
	page.Parse(common.ServerTimeHtml)

	formattedTime := time.Now().Format(time.RFC850)
	vm := NoTemplViewModel{
		Title: "Index page",
		Time:  formattedTime,
	}

	err := page.Execute(w, vm)

	if err != nil {
		return
	}
}

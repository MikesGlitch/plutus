package api

import (
	"html/template"
	"net/http"
	"time"

	"github.com/mikesglitch/plutus/components/common"
	"github.com/mikesglitch/plutus/components/layouts"
	"github.com/mikesglitch/plutus/components/pages"
)

func AboutHandler(w http.ResponseWriter, r *http.Request) {
	var page = template.New("AboutPage")
	page.Parse(layouts.BlankLayoutHtml)
	page.Parse(pages.AboutPageHtml)
	page.Parse(common.ServerTimeHtml)

	formattedTime := time.Now().Format(time.RFC850)
	vm := NoTemplViewModel{
		Title: "About page",
		Time:  formattedTime,
	}

	err := page.Execute(w, vm)

	if err != nil {
		return
	}
}

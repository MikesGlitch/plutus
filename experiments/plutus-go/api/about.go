package api

import (
	"html/template"
	"net/http"
	"time"

	"github.com/mikesglitch/plutus/components/common"
	"github.com/mikesglitch/plutus/components/layouts"
	"github.com/mikesglitch/plutus/components/pages"
	"github.com/mikesglitch/plutus/utils"
)

func AboutHandler(w http.ResponseWriter, r *http.Request) {
	var page = template.New("AboutPage").Funcs(utils.Funcs)
	page.Parse(pages.AboutPageHtml)
	page.Parse(layouts.BlankLayoutHtml)
	page.Parse(common.ServerTimeHtml)
	page.Parse(common.LinkHtml)

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

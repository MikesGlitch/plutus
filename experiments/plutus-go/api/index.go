package api

import (
	"fmt"
	"html/template"
	"net/http"
	"time"

	"github.com/mikesglitch/plutus/components/common"
	"github.com/mikesglitch/plutus/components/layouts"
	"github.com/mikesglitch/plutus/components/pages"
	"github.com/mikesglitch/plutus/utils"
)

type Item struct {
	ID    string
	Value string
}

type NoTemplViewModel struct {
	Title string
	Time  string
	Items []Item
}

func IndexHandler(w http.ResponseWriter, r *http.Request) {
	page := template.New("IndexPage").Funcs(utils.Funcs)
	// I can probably set this up once for everything? Then just call it with a name? I'd like to say just call "indexPageHtml"
	page.Parse(pages.IndexPageHtml)
	page.Parse(layouts.BlankLayoutHtml)
	page.Parse(common.ServerTimeHtml)
	page.Parse(common.LinkHtml)

	formattedTime := time.Now().Format(time.RFC850)
	vm := NoTemplViewModel{
		Title: "Index page",
		Time:  formattedTime,
		Items: []Item{
			Item{
				ID:    "Test1",
				Value: "Test 1 value",
			},
			Item{
				ID:    "Test2",
				Value: "Test 2 value",
			},
		},
	}

	err := page.ExecuteTemplate(w, "IndexPage", vm)

	if err != nil {
		fmt.Print(err)
		return
	}
}

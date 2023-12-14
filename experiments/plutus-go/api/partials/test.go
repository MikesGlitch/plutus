package partials

import (
	"html/template"
	"net/http"
	"time"

	"github.com/mikesglitch/plutus/components/common"
)

type TestPartialVm struct {
	Time string
}

func TestPartialHandler(w http.ResponseWriter, r *http.Request) {
	var page = template.New("partial_servertime")
	page.Parse(common.ServerTimeHtml)

	formattedTime := time.Now().Format(time.RFC850)

	vm := TestPartialVm{
		Time: formattedTime,
	}

	err := page.Execute(w, vm)

	if err != nil {
		return
	}
}

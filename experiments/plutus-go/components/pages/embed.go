package pages

import (
	_ "embed"
)

//go:embed "notempl/notempl.html"
var NoTemplPageHtml string

//go:embed "index/index.html"
var IndexPageHtml string

//go:embed "about/about.html"
var AboutPageHtml string

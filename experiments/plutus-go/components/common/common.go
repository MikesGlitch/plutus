package common

import (
	_ "embed"
)

//go:embed "servertime.html"
var ServerTimeHtml string

//go:embed "link.html"
var LinkHtml string

package utils

import (
	"errors"
	"fmt"
)

// this is needed to pass parameters defined in the template...  This is rough
var Funcs = map[string]any{
	"map": func(pairs ...any) (map[string]any, error) {
		if len(pairs)%2 != 0 {
			return nil, errors.New("misaligned map")
		}
		m := make(map[string]any, len(pairs)/2)
		for i := 0; i < len(pairs); i += 2 {
			key, ok := pairs[i].(string)
			if !ok {
				return nil, fmt.Errorf("cannot use type %T as map key", pairs[i])
			}
			m[key] = pairs[i+1]
		}
		return m, nil
	},
}

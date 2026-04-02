package dto

type ThemeDTO struct {
	Dark struct {
		Background string `json:"background" firestore:"background"`
		Primary    string `json:"primary" firestore:"primary"`
	} `json:"dark" firestore:"dark"`
	Light struct {
		Background string `json:"background" firestore:"background"`
		Primary    string `json:"primary" firestore:"primary"`
	} `json:"light" firestore:"light"`
}

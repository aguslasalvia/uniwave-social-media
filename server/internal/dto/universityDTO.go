package dto

type UniveristyListDTO struct {
	ID   string `json:"id"`
	Name string `json:"name" firestore:"name"`
}

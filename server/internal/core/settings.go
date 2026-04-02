package core

type Settings struct {
	Language             string `json:"language" firestore:"language"`
	Background           string `json:"background" firestore:"background"`
	PrimaryColor         string `json:"primaryColor" firestore:"primaryColor"`
	SecondaryColor       string `json:"secondaryColor" firestore:"secondaryColor"`
	NotificationsEnabled bool   `json:"notificationsEnabled" firestore:"notificationsEnabled"`
}

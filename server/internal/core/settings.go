package core

// Settings is each user's personal configuration. It has a 1-to-1 relation with
// User through UserID (which is also the table's primary key).
type Settings struct {
	UserID               string `gorm:"type:uuid;primaryKey" json:"-"`
	Language             string `json:"language"`
	Background           string `json:"background"`
	PrimaryColor         string `json:"primaryColor"`
	SecondaryColor       string `json:"secondaryColor"`
	NotificationsEnabled bool   `json:"notificationsEnabled"`
}

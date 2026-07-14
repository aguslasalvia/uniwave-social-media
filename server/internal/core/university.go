package core

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

// ThemeMode holds the colors of a single mode (light or dark) of a university theme.
// Background and Primary are the minimum a theme needs; the rest are optional
// overrides for the client's derived tokens — when empty (e.g. rows serialized
// before these fields existed), the client keeps its built-in defaults.
type ThemeMode struct {
	Background   string `json:"background"`
	Primary      string `json:"primary"`
	Surface      string `json:"surface,omitempty"`      // cards, modals, sheets
	SurfaceMuted string `json:"surfaceMuted,omitempty"` // input fields, chips, wells
	Border       string `json:"border,omitempty"`
	Text         string `json:"text,omitempty"`
	TextMuted    string `json:"textMuted,omitempty"` // secondary text and icons
}

// Theme is the visual theme the app applies based on the user's university.
// It is persisted as JSON (jsonb column) on the university row.
type Theme struct {
	Dark  ThemeMode `json:"dark"`
	Light ThemeMode `json:"light"`
}

// University is each institution available to register with.
type University struct {
	ID    string `gorm:"type:uuid;primaryKey" json:"id"`
	Name  string `gorm:"not null" json:"name"`
	State bool   `gorm:"default:true" json:"state"` // whether it is enabled for registration
	Theme Theme  `gorm:"serializer:json;type:jsonb" json:"theme"`
}

func (u *University) BeforeCreate(tx *gorm.DB) error {
	if u.ID == "" {
		u.ID = uuid.NewString()
	}
	return nil
}

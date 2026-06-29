package core

import (
	"time"
	"uniwave/internal/utils"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

// User represents a student registered on the platform.
// The university is stored as a foreign key (UniversityID) and can be preloaded
// through the University relation when the name or theme is needed.
type User struct {
	ID           string      `gorm:"type:uuid;primaryKey" json:"id"`
	FullName     string      `gorm:"not null" json:"fullName"`
	Username     string      `gorm:"uniqueIndex;not null" json:"username"`
	Email        string      `gorm:"uniqueIndex;not null" json:"email"`
	Phone        string      `json:"phone"`
	DateOfBirth  time.Time   `json:"dateOfBirth"`
	UniversityID string      `gorm:"type:uuid" json:"-"`
	University   *University `gorm:"foreignKey:UniversityID" json:"-"`
	Career       string      `json:"career"`
	Avatar       string      `json:"avatar"`
	Password     string      `gorm:"not null" json:"-"`
	Status       bool        `gorm:"default:false" json:"status"` // account activated via email
	CreatedAt    time.Time   `json:"createdAt"`
}

// BeforeCreate generates a UUID if one was not assigned yet.
func (u *User) BeforeCreate(tx *gorm.DB) error {
	if u.ID == "" {
		u.ID = uuid.NewString()
	}
	return nil
}

// CheckPassword compares the plaintext password against the stored hash.
func (u *User) CheckPassword(password string) bool {
	return utils.CheckPasswordHash(password, u.Password)
}

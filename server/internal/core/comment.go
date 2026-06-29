package core

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

// Comment is a comment made by a user on a post.
type Comment struct {
	ID        string    `gorm:"type:uuid;primaryKey" json:"id"`
	PostID    string    `gorm:"type:uuid;index" json:"postId"`
	AuthorID  string    `gorm:"type:uuid;index" json:"authorId"`
	Author    *User     `gorm:"foreignKey:AuthorID" json:"-"`
	Content   string    `gorm:"type:text;not null" json:"content"`
	CreatedAt time.Time `json:"createdAt"`
}

func (c *Comment) BeforeCreate(tx *gorm.DB) error {
	if c.ID == "" {
		c.ID = uuid.NewString()
	}
	return nil
}

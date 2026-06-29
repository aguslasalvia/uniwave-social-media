package core

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

// Post is a feed publication. Its images, likes and comments live in their own
// related tables (with cascade delete when the post is removed).
type Post struct {
	ID        string      `gorm:"type:uuid;primaryKey" json:"id"`
	Content   string      `gorm:"type:text;not null" json:"content"`
	AuthorID  string      `gorm:"type:uuid;index" json:"authorId"`
	Author    *User       `gorm:"foreignKey:AuthorID" json:"-"`
	Privacy   string      `gorm:"default:public" json:"privacy"` // public | friends | private
	CreatedAt time.Time   `json:"createdAt"`
	Images    []PostImage `gorm:"foreignKey:PostID;constraint:OnDelete:CASCADE" json:"-"`
	Likes     []Like      `gorm:"foreignKey:PostID;constraint:OnDelete:CASCADE" json:"-"`
	Comments  []Comment   `gorm:"foreignKey:PostID;constraint:OnDelete:CASCADE" json:"-"`
}

func (p *Post) BeforeCreate(tx *gorm.DB) error {
	if p.ID == "" {
		p.ID = uuid.NewString()
	}
	return nil
}

// PostImage is each image attached to a post (a post can have several).
type PostImage struct {
	ID     string `gorm:"type:uuid;primaryKey" json:"id"`
	PostID string `gorm:"type:uuid;index" json:"postId"`
	URL    string `gorm:"not null" json:"url"`
}

func (i *PostImage) BeforeCreate(tx *gorm.DB) error {
	if i.ID == "" {
		i.ID = uuid.NewString()
	}
	return nil
}

// Like is the many-to-many relation between users and posts. The composite
// primary key prevents a user from liking the same post twice.
type Like struct {
	PostID string `gorm:"type:uuid;primaryKey" json:"postId"`
	UserID string `gorm:"type:uuid;primaryKey" json:"userId"`
}

package dto

type PostInteractionDTO struct {
	UserID string `json:"user_id"`
	PostID string `json:"post_id" binding:"required"`
}

// AuthorDTO is the public author information embedded in posts and comments.
type AuthorDTO struct {
	ID         string `json:"id"`
	Username   string `json:"username"`
	FullName   string `json:"fullName"`
	University string `json:"university"`
	Avatar     string `json:"avatar"`
}

// PostResponseDTO is the enriched representation of a post sent to the client.
type PostResponseDTO struct {
	ID            string    `json:"id"`
	Content       string    `json:"content"`
	ImageURL      []string  `json:"imageUrl"`
	CreatedAt     int64     `json:"createdAt"`
	Privacy       string    `json:"privacy"`
	Author        AuthorDTO `json:"user"`
	Likes         []string  `json:"likes"`
	LikesCount    int       `json:"likesCount"`
	LikedByMe     bool      `json:"likedByMe"`
	CommentsCount int       `json:"comments"`
}

type PostUpdateDTO struct {
	PostID  string  `json:"post_id" binding:"required"`
	Content *string `json:"content"`
	Privacy *string `json:"privacy"`
}

type CreateCommentDTO struct {
	PostID  string `json:"postId" binding:"required"`
	Content string `json:"content" binding:"required"`
}

type CommentResponseDTO struct {
	ID        string    `json:"id"`
	Content   string    `json:"content"`
	CreatedAt int64     `json:"createdAt"`
	Author    AuthorDTO `json:"user"`
}

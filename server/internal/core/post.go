package core

type Post struct {
	ID        string    `json:"id,omitempty" firestore:"-"`
	Content   string    `json:"content" firestore:"content"`
	AuthorID  string    `json:"authorId" firestore:"authorId"`
	ImageURL  *[]string `json:"imageUrl,omitempty" firestore:"imageUrl"`
	CreatedAt int64     `json:"createdAt" firestore:"createdAt"`
	Likes     []string  `json:"likes,omitempty" firestore:"likes"`       // List of user IDs who liked the post
	Comments  []string  `json:"comments,omitempty" firestore:"comments"` // List of comment IDs associated with the post
	Privacy   string    `json:"privacy" fireestore:"privacy"`
}

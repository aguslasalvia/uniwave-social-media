package models

import (
	"context"

	"uniwave/internal/config"
	"uniwave/internal/core"
	"uniwave/internal/dto"
	"uniwave/internal/interfaces"

	"gorm.io/gorm/clause"
)

// CreatePost creates a post together with its images (if any) in one operation.
func CreatePost(ctx context.Context, post *core.Post) error {
	return config.DB.WithContext(ctx).Create(post).Error
}

// DeletePost removes a post if it belongs to the user. Images, likes and
// comments are removed via the foreign key cascade.
func DeletePost(ctx context.Context, postData dto.PostInteractionDTO) error {
	var post core.Post
	err := config.DB.WithContext(ctx).First(&post, "id = ?", postData.PostID).Error
	if err != nil {
		return &interfaces.HTTPResponse{Code: 404, Message: "Post not found"}
	}

	if post.AuthorID != postData.UserID {
		return &interfaces.HTTPResponse{Code: 401, Message: "Unauthorized Action"}
	}

	if err := config.DB.WithContext(ctx).Delete(&core.Post{}, "id = ?", post.ID).Error; err != nil {
		return &interfaces.HTTPResponse{Code: 400, Message: "Unable to Delete this resource"}
	}
	return nil
}

// UpdatePost updates the content and/or privacy of a post owned by the user.
func UpdatePost(ctx context.Context, userID string, data dto.PostUpdateDTO) error {
	var post core.Post
	err := config.DB.WithContext(ctx).First(&post, "id = ?", data.PostID).Error
	if err != nil {
		return &interfaces.HTTPResponse{Code: 404, Message: "Post not found"}
	}

	if post.AuthorID != userID {
		return &interfaces.HTTPResponse{Code: 401, Message: "Unauthorized Action"}
	}

	updates := map[string]any{}
	if data.Content != nil {
		updates["content"] = *data.Content
	}
	if data.Privacy != nil {
		updates["privacy"] = *data.Privacy
	}
	if len(updates) == 0 {
		return nil
	}

	if err := config.DB.WithContext(ctx).Model(&post).Updates(updates).Error; err != nil {
		return &interfaces.HTTPResponse{Code: 400, Message: "Unable to update this resource"}
	}
	return nil
}

// LikePost adds a like. It is idempotent: if it already exists, it does nothing.
func LikePost(ctx context.Context, postID, userID string) error {
	like := core.Like{PostID: postID, UserID: userID}
	return config.DB.WithContext(ctx).
		Clauses(clause.OnConflict{DoNothing: true}).
		Create(&like).Error
}

// UnlikePost removes the user's like on the post (idempotent).
func UnlikePost(ctx context.Context, postID, userID string) error {
	return config.DB.WithContext(ctx).
		Where("post_id = ? AND user_id = ?", postID, userID).
		Delete(&core.Like{}).Error
}

// GetLatestPosts returns the most recent posts already enriched: author,
// images, the current user's like state and the comment count.
func GetLatestPosts(ctx context.Context, currentUserID string) ([]dto.PostResponseDTO, error) {
	var posts []core.Post
	err := config.DB.WithContext(ctx).
		Preload("Author").
		Preload("Author.University").
		Preload("Images").
		Preload("Likes").
		Preload("Comments").
		Order("created_at desc").
		Limit(20).
		Find(&posts).Error
	if err != nil {
		return nil, err
	}

	result := make([]dto.PostResponseDTO, 0, len(posts))
	for _, post := range posts {
		// IDs of everyone who liked it + whether the current user is among them.
		likeIDs := make([]string, 0, len(post.Likes))
		likedByMe := false
		for _, like := range post.Likes {
			likeIDs = append(likeIDs, like.UserID)
			if like.UserID == currentUserID {
				likedByMe = true
			}
		}

		images := make([]string, 0, len(post.Images))
		for _, img := range post.Images {
			images = append(images, img.URL)
		}

		result = append(result, dto.PostResponseDTO{
			ID:            post.ID,
			Content:       post.Content,
			ImageURL:      images,
			CreatedAt:     post.CreatedAt.Unix(),
			Privacy:       post.Privacy,
			Author:        authorDTO(post.Author),
			Likes:         likeIDs,
			LikesCount:    len(likeIDs),
			LikedByMe:     likedByMe,
			CommentsCount: len(post.Comments),
		})
	}

	return result, nil
}

// authorDTO builds the public author info from the preloaded user.
func authorDTO(user *core.User) dto.AuthorDTO {
	if user == nil {
		return dto.AuthorDTO{Username: "usuario", FullName: "Usuario"}
	}

	author := dto.AuthorDTO{
		ID:       user.ID,
		Username: user.Username,
		FullName: user.FullName,
		Avatar:   user.Avatar,
	}
	if user.University != nil {
		author.University = user.University.Name
	}
	return author
}

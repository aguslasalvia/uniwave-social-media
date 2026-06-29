package models

import (
	"context"

	"uniwave/internal/config"
	"uniwave/internal/core"
	"uniwave/internal/dto"
)

// CreateComment stores a new comment.
func CreateComment(ctx context.Context, comment *core.Comment) error {
	return config.DB.WithContext(ctx).Create(comment).Error
}

// GetCommentsByPost returns a post's comments (oldest first) with the public
// info of each author.
func GetCommentsByPost(ctx context.Context, postID string) ([]dto.CommentResponseDTO, error) {
	var comments []core.Comment
	err := config.DB.WithContext(ctx).
		Preload("Author").
		Preload("Author.University").
		Where("post_id = ?", postID).
		Order("created_at asc").
		Find(&comments).Error
	if err != nil {
		return nil, err
	}

	result := make([]dto.CommentResponseDTO, 0, len(comments))
	for _, comment := range comments {
		result = append(result, dto.CommentResponseDTO{
			ID:        comment.ID,
			Content:   comment.Content,
			CreatedAt: comment.CreatedAt.Unix(),
			Author:    authorDTO(comment.Author),
		})
	}

	return result, nil
}

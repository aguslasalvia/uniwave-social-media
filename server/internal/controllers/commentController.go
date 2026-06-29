package controllers

import (
	"net/http"
	"strings"
	"uniwave/internal/core"
	"uniwave/internal/dto"
	"uniwave/internal/models"

	"github.com/gin-gonic/gin"
)

type CommentController struct{}

func NewCommentController() *CommentController {
	return &CommentController{}
}

func (cc *CommentController) Create(c *gin.Context) {
	var commentDTO dto.CreateCommentDTO
	if err := c.ShouldBindJSON(&commentDTO); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	if strings.TrimSpace(commentDTO.Content) == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Content is required"})
		return
	}

	comment := core.Comment{
		PostID:   commentDTO.PostID,
		AuthorID: c.GetString("user_id"),
		Content:  strings.TrimSpace(commentDTO.Content),
		// CreatedAt is set automatically by GORM.
	}

	if err := models.CreateComment(c.Request.Context(), &comment); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not create comment"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"id": comment.ID})
}

func (cc *CommentController) GetByPost(c *gin.Context) {
	postID := c.Query("postId")
	if postID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Missing 'postId' parameter"})
		return
	}

	comments, err := models.GetCommentsByPost(c.Request.Context(), postID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not retrieve comments"})
		return
	}

	c.JSON(http.StatusOK, comments)
}

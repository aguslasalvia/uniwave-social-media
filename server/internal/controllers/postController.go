package controllers

import (
	"net/http"
	"time"
	"uniwave/internal/core"
	"uniwave/internal/dto"
	"uniwave/internal/interfaces"
	"uniwave/internal/models"

	"github.com/gin-gonic/gin"
)

type PostController struct{}

func NewPostController() *PostController {
	return &PostController{}
}

func (pc *PostController) CreatePost(c *gin.Context) {
	var post core.Post
	if err := c.ShouldBindJSON(&post); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	userID := c.GetString("user_id")
	post.AuthorID = userID
	post.CreatedAt = time.Now().Unix()
	if err := models.CreatePost(c.Request.Context(), &post); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not create post"})
		return
	}
	c.JSON(http.StatusCreated, nil)
}

func (pc *PostController) DeletePost(c *gin.Context) {
	var post dto.PostInteractionDTO
	if err := c.ShouldBindJSON(&post); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid Request"})
		return
	}
	userID := c.GetString("user_id")
	post.UserID = userID

	if err := models.DeletePost(c.Request.Context(), post); err != nil {
		// if it is an HttpResponse Error
		if httpErr, ok := err.(*interfaces.HTTPResponse); ok {
			c.JSON(httpErr.Code, gin.H{"error": httpErr.Message})
			return
		}

		// Any other error => 500
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "post deleted successfully"})
}

func (pc *PostController) GetLatestPost(c *gin.Context) {
	posts, err := models.GetLatestPosts(c.Request.Context())
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not retrieve any posts"})
		return
	}

	c.JSON(http.StatusOK, posts)
}

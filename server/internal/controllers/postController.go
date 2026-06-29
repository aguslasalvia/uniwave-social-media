package controllers

import (
	"net/http"
	"strings"
	"uniwave/internal/core"
	"uniwave/internal/dto"
	"uniwave/internal/interfaces"
	"uniwave/internal/models"
	"uniwave/internal/services"

	"github.com/gin-gonic/gin"
)

type PostController struct{}

func NewPostController() *PostController {
	return &PostController{}
}

// handleModelError translates an *interfaces.HTTPResponse into a JSON response,
// falling back to 500 for any other error. Returns true if an error was handled.
func handleModelError(c *gin.Context, err error) bool {
	if err == nil {
		return false
	}
	if httpErr, ok := err.(*interfaces.HTTPResponse); ok {
		c.JSON(httpErr.Code, gin.H{"error": httpErr.Message})
		return true
	}
	c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
	return true
}

// CreatePost accepts both multipart/form-data (with optional images) and JSON.
func (pc *PostController) CreatePost(c *gin.Context) {
	userID := c.GetString("user_id")

	var post core.Post

	if strings.HasPrefix(c.ContentType(), "multipart/form-data") {
		post.Content = strings.TrimSpace(c.PostForm("content"))
		post.Privacy = c.PostForm("privacy")

		if form, err := c.MultipartForm(); err == nil && form != nil {
			files := append(form.File["image"], form.File["images"]...)
			for _, fh := range files {
				url, err := services.UploadPostImage(userID, fh)
				if err != nil {
					c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not upload image"})
					return
				}
				post.Images = append(post.Images, core.PostImage{URL: url})
			}
		}
	} else {
		if err := c.ShouldBindJSON(&post); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
			return
		}
	}

	if post.Content == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Content is required"})
		return
	}
	if post.Privacy == "" {
		post.Privacy = "public"
	}

	post.AuthorID = userID

	if err := models.CreatePost(c.Request.Context(), &post); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not create post"})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"id": post.ID})
}

func (pc *PostController) DeletePost(c *gin.Context) {
	var post dto.PostInteractionDTO
	if err := c.ShouldBindJSON(&post); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid Request"})
		return
	}
	post.UserID = c.GetString("user_id")

	if handleModelError(c, models.DeletePost(c.Request.Context(), post)) {
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "post deleted successfully"})
}

func (pc *PostController) UpdatePost(c *gin.Context) {
	var data dto.PostUpdateDTO
	if err := c.ShouldBindJSON(&data); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid Request"})
		return
	}
	userID := c.GetString("user_id")

	if handleModelError(c, models.UpdatePost(c.Request.Context(), userID, data)) {
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "post updated successfully"})
}

func (pc *PostController) LikePost(c *gin.Context) {
	var data dto.PostInteractionDTO
	if err := c.ShouldBindJSON(&data); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid Request"})
		return
	}
	userID := c.GetString("user_id")

	if err := models.LikePost(c.Request.Context(), data.PostID, userID); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not like post"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "post liked"})
}

func (pc *PostController) UnlikePost(c *gin.Context) {
	var data dto.PostInteractionDTO
	if err := c.ShouldBindJSON(&data); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid Request"})
		return
	}
	userID := c.GetString("user_id")

	if err := models.UnlikePost(c.Request.Context(), data.PostID, userID); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not unlike post"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "post unliked"})
}

func (pc *PostController) GetLatestPost(c *gin.Context) {
	userID := c.GetString("user_id")
	posts, err := models.GetLatestPosts(c.Request.Context(), userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not retrieve any posts"})
		return
	}

	c.JSON(http.StatusOK, posts)
}

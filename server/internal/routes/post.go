package routes

import (
	"uniwave/internal/controllers"
	"uniwave/internal/middlewares"

	"github.com/gin-gonic/gin"
)

func PostRouter(router *gin.Engine) {
	postController := controllers.NewPostController()
	posts := router.Group("/posts")
	posts.Use(middlewares.TokenMiddleware())
	{
		posts.GET("/latest", postController.GetLatestPost)
		posts.POST("/create", postController.CreatePost)
		posts.POST("/like", postController.LikePost)
		posts.PUT("/update", postController.UpdatePost)
		posts.DELETE("/dislike", postController.UnlikePost)
		posts.DELETE("/delete", postController.DeletePost)
	}
}

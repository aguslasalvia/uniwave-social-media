package routes

import (
	"uniwave/internal/controllers"
	"uniwave/internal/middlewares"

	"github.com/gin-gonic/gin"
)

func CommentRouter(router *gin.Engine) {
	commentController := controllers.NewCommentController()
	comments := router.Group("/comments")
	comments.Use(middlewares.TokenMiddleware())
	{
		comments.GET("/", commentController.GetByPost)
		comments.POST("/create", commentController.Create)
	}
}

package routes

import (
	"uniwave/internal/controllers"
	"uniwave/internal/middlewares"

	"github.com/gin-gonic/gin"
)

func PostRouter(router *gin.Engine) {
	postController := controllers.NewPostController()
	posts := router.Group("/posts")
	{
		posts.GET("/latest", middlewares.TokenMiddleware(), postController.GetLatestPost)
		posts.POST("/create", middlewares.TokenMiddleware(), postController.CreatePost)
		posts.POST("/like", middlewares.TokenMiddleware())

		posts.PUT("/update", middlewares.TokenMiddleware())

		posts.DELETE("/dislike", middlewares.TokenMiddleware())
		posts.DELETE("/delete", middlewares.TokenMiddleware(), postController.DeletePost)
	}
}

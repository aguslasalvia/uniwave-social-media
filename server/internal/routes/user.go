package routes

import (
	"uniwave/internal/controllers"
	"uniwave/internal/middlewares"

	"github.com/gin-gonic/gin"
)

func UserRouter(router *gin.Engine) {
	userController := controllers.NewUserController()
	user := router.Group("/user")
	user.Use(middlewares.TokenMiddleware())
	{
		user.PATCH("/update", userController.Update)
		user.GET("/stats", userController.Stats)
		user.POST("/avatar", userController.UploadAvatar)
	}
}

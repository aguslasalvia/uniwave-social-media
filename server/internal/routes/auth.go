package routes

import (
	"uniwave/internal/controllers"

	"github.com/gin-gonic/gin"
)

func AuthRouter(router *gin.Engine) {
	authController := controllers.NewAuthController()
	auth := router.Group("/auth")
	{
		auth.POST("/login", authController.Login)
		auth.POST("/register", authController.Register)
		auth.POST("/activate", authController.ActivateAccount)

		auth.GET("/check", func(ctx *gin.Context) {
			ctx.JSON(200, gin.H{"message": "ok"})
		})
	}
}

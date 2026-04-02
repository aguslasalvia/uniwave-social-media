package routes

import (
	"uniwave/internal/controllers"
	"uniwave/internal/middlewares"

	"github.com/gin-gonic/gin"
)

func UserRouter(router *gin.Engine) {
	userController := controllers.NewUserController()
	user := router.Group("/user")

	user.PATCH("/update", middlewares.TokenMiddleware(), userController.Update)

}

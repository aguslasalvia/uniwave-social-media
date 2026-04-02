package routes

import (
	"uniwave/internal/controllers"

	"github.com/gin-gonic/gin"
)

func UnversitiesRouter(router *gin.Engine) {
	universityController := controllers.NewUniversityController()
	university := router.Group("/universities")
	{
		university.GET("/all", universityController.GetAll)
		university.GET("/find", universityController.GetByID)
	}
}

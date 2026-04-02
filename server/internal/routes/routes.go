package routes

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func SetupRoutes() *gin.Engine {

	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{"POST", "GET", "PATCH", "DELETE"},
		AllowHeaders: []string{"Content-Type"},
	}))

	AuthRouter(r)
	UserRouter(r)
	SettingsRouter(r)
	UnversitiesRouter(r)
	PostRouter(r)

	return r
}

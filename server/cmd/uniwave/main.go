package main

import (
	_ "uniwave/internal/config" // This call's init() to initialize Firebase app
	"uniwave/internal/routes"
	_ "uniwave/internal/utils" // This call's init() to load environment variables and initialize JWT secret
)

func main() {
	r := routes.SetupRoutes()
	r.Run(":8080")
}

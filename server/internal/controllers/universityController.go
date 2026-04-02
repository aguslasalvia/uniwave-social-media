package controllers

import (
	"net/http"
	"uniwave/internal/models"

	"github.com/gin-gonic/gin"
)

type UniversityController struct{}

func NewUniversityController() *UniversityController {
	return &UniversityController{}
}

func (uc *UniversityController) GetAll(c *gin.Context) {
	ctx := c.Request.Context()

	universities, err := models.GetAllUniversities(ctx)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}
	c.JSON(http.StatusOK, universities)
}

func (uc *UniversityController) GetByID(c *gin.Context) {
	ctx := c.Request.Context()
	id := c.Query("id")

	if id == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Missing 'id' parameters"})
		return
	}

	university, err := models.GetUniversityNameByID(ctx, id)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "University not found"})
		return
	}

	c.JSON(http.StatusOK, university)

}

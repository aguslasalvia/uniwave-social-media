package controllers

import (
	"net/http"
	"uniwave/internal/core"
	"uniwave/internal/models"

	"github.com/gin-gonic/gin"
)

type SettingsController struct{}

func NewSettingsController() *SettingsController {
	return &SettingsController{}
}

func (sc *SettingsController) GetSettings(c *gin.Context) {
	userID := c.GetString("userID")
	settings, err := models.GetSettingsByUserID(c.Request.Context(), userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not retrieve settings"})
		return
	}

	c.JSON(http.StatusOK, settings)
}

func (sc *SettingsController) UpdateSettings(c *gin.Context) {
	var settings core.Settings
	if err := c.ShouldBindJSON(&settings); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	userID := c.GetString("user_ID")
	if err := models.UpdateSettings(c.Request.Context(), userID, &settings); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not update settings"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Settings updated successfully"})
}

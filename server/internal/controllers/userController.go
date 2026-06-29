package controllers

import (
	"net/http"
	"uniwave/internal/dto"
	"uniwave/internal/models"
	"uniwave/internal/services"
	"uniwave/internal/utils"

	"github.com/gin-gonic/gin"
)

type UserController struct{}

func NewUserController() *UserController {
	return &UserController{}
}

func (uc *UserController) Update(c *gin.Context) {
	var userUpdateDTO dto.UserUpdateDTO
	if err := c.ShouldBindJSON(&userUpdateDTO); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	// The target user is always the authenticated user, never a value from the
	// request body, to prevent users from editing other accounts.
	userID := c.GetString("user_id")
	if userID == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	user, err := models.FindUserByID(c.Request.Context(), userID)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	if userUpdateDTO.FullName != nil {
		user.FullName = *userUpdateDTO.FullName
	}
	if userUpdateDTO.Username != nil {
		user.Username = *userUpdateDTO.Username
	}
	if userUpdateDTO.Email != nil {
		user.Email = *userUpdateDTO.Email
	}
	if userUpdateDTO.Phone != nil {
		user.Phone = *userUpdateDTO.Phone
	}
	if userUpdateDTO.DateOfBirth != nil {
		user.DateOfBirth = *userUpdateDTO.DateOfBirth
	}
	if userUpdateDTO.University != nil {
		// The client sends the university name; resolve it to the ID (FK).
		// If no university matches that name, the current one is kept.
		if uni, err := models.FindUniversityByName(c.Request.Context(), *userUpdateDTO.University); err == nil {
			user.UniversityID = uni.ID
			user.University = uni
		}
	}
	if userUpdateDTO.Career != nil {
		user.Career = *userUpdateDTO.Career
	}
	if userUpdateDTO.Password != nil {

		if userUpdateDTO.OldPassword == nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Actual password required"})
			return
		}

		verification, err := models.VerifyPassword(c.Request.Context(), userID, *userUpdateDTO.OldPassword)
		if err != nil || !verification {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Incorrect actual password"})
			return
		}

		hashed, _ := utils.HashPassword(*userUpdateDTO.Password)
		user.Password = hashed

	}

	if err := models.UpdateUser(c.Request.Context(), user); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not update user"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "User updated successfully", "user": dto.ToUserDTO(*user)})
}

func (uc *UserController) Stats(c *gin.Context) {
	userID := c.GetString("user_id")
	stats, err := models.GetUserStats(c.Request.Context(), userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not retrieve stats"})
		return
	}
	c.JSON(http.StatusOK, stats)
}

// UploadAvatar receives a multipart "avatar" (or "image") file, stores it and
// updates the user's avatar URL.
func (uc *UserController) UploadAvatar(c *gin.Context) {
	userID := c.GetString("user_id")

	fileHeader, err := c.FormFile("avatar")
	if err != nil {
		fileHeader, err = c.FormFile("image")
	}
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "No file provided"})
		return
	}

	url, err := services.UploadAvatar(userID, fileHeader)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not upload avatar"})
		return
	}

	user, err := models.FindUserByID(c.Request.Context(), userID)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}
	user.Avatar = url

	if err := models.UpdateUser(c.Request.Context(), user); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not update user"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"avatar": url, "user": dto.ToUserDTO(*user)})
}

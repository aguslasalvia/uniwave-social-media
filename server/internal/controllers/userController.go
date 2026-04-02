package controllers

import (
	"net/http"
	"uniwave/internal/dto"
	"uniwave/internal/models"
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

	if userUpdateDTO.ID == nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Missing user ID"})
		return
	}

	user, err := models.FindUserByID(c.Request.Context(), *userUpdateDTO.ID)
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
		user.University = *userUpdateDTO.University
	}
	if userUpdateDTO.Career != nil {
		user.Career = *userUpdateDTO.Career
	}
	if userUpdateDTO.Password != nil {

		if userUpdateDTO.OldPassword == nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Actual password required"})
			return
		}

		verification, err := models.VerifyPassword(c.Request.Context(), *userUpdateDTO.ID, *userUpdateDTO.OldPassword)
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

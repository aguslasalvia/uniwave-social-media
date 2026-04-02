package controllers

import (
	"fmt"
	"log"
	"net/http"
	"time"
	"uniwave/internal/core"
	"uniwave/internal/dto"
	"uniwave/internal/models"
	"uniwave/internal/services"
	"uniwave/internal/utils"

	"github.com/gin-gonic/gin"
)

type AuthController struct{}

func NewAuthController() *AuthController {
	return &AuthController{}
}

func (ac *AuthController) Login(c *gin.Context) {
	var loginDTO dto.LoginDTO
	if err := c.ShouldBindJSON(&loginDTO); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	user, err := models.Login(c.Request.Context(), loginDTO.Email)
	if err != nil || !user.CheckPassword(loginDTO.Password) {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
		return
	}

	theme, err := models.GetUniversityTheme(c.Request.Context(), user.University)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not generate token"})
		return
	}

	token, err := utils.GenerateToken(user.ID, 30*24) // 30*24 is 30 days
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not generate token"})
		return
	}

	university, err := models.GetUniversityNameByID(c.Request.Context(), user.University)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not get university"})
		return
	}
	user.University = university

	c.JSON(http.StatusOK, gin.H{
		"token": token,
		"user":  dto.ToUserDTO(*user),
		"theme": theme,
	})
}

func (ac *AuthController) Register(c *gin.Context) {

	var registerDTO dto.UserCreateDTO

	if err := c.ShouldBindJSON(&registerDTO); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	fmt.Print(registerDTO.Email)

	verify, err := models.FindUserByEmail(c.Request.Context(), registerDTO.Email)

	if err == nil && verify != nil {
		c.JSON(http.StatusConflict, gin.H{"error": "Email already exists"})
		return
	}

	dateOfBirth, err := time.Parse(time.RFC3339, registerDTO.DateOfBirth.Format(time.RFC3339))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid date format"})
		return
	}

	hashedPassword, err := utils.HashPassword(registerDTO.Password)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to hash password"})
		return
	}

	user := core.User{
		FullName:    registerDTO.FullName,
		Username:    registerDTO.Username,
		Email:       registerDTO.Email,
		Phone:       registerDTO.Phone,
		DateOfBirth: dateOfBirth,
		University:  registerDTO.University,
		Career:      registerDTO.Career,
		Password:    hashedPassword,
		Status:      false,
		Subscribed:  nil,
	}

	err = models.CreateUser(c.Request.Context(), &user)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create user"})
		return
	}

	jwt, err := utils.GenerateToken(user.ID, 30)

	if err != nil {
		log.Print(err)
		return
	}

	mailBody := services.ActivationData{
		Name: user.Username,
		JWT:  jwt,
	}
	err = services.SendActivationEmail(user.Email, mailBody)

	fmt.Print(err)

	if err != nil {
		log.Print(err)
		return
	}

	c.JSON(http.StatusCreated, nil)
}

func (ac *AuthController) ActivateAccount(c *gin.Context) {
	var activationDTO dto.ActivationDTO
	if err := c.ShouldBindJSON(&activationDTO); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid Token"})
		return
	}

	if activationDTO.Jwt == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid Token"})
		return
	}

	claims, err := utils.ValidateToken(activationDTO.Jwt)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid Token"})
		return
	}

	userID, ok := claims["user_id"].(string)
	fmt.Print(userID)
	if !ok {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid Token"})
		return
	}

	err = models.ActivateUser(c, userID)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid Token"})
		return
	}

	c.JSON(http.StatusOK, nil)
}

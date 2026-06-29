package controllers

import (
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

	token, err := utils.GenerateToken(user.ID, 30*24) // 30*24 hours = 30 days
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not generate token"})
		return
	}

	// The university is already preloaded by models.Login, so the name and theme
	// come straight from the relation, with no extra queries.
	var theme core.Theme
	if user.University != nil {
		theme = user.University.Theme
	}

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
		FullName:     registerDTO.FullName,
		Username:     registerDTO.Username,
		Email:        registerDTO.Email,
		Phone:        registerDTO.Phone,
		DateOfBirth:  dateOfBirth,
		UniversityID: registerDTO.University, // the client sends the university ID
		Career:       registerDTO.Career,
		Password:     hashedPassword,
		Status:       false,
	}

	err = models.CreateUser(c.Request.Context(), &user)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create user"})
		return
	}

	// Create default settings for the new user (best-effort).
	if err := models.CreateDefaultSettings(c.Request.Context(), user.ID); err != nil {
		log.Printf("could not create default settings for %s: %v", user.ID, err)
	}

	jwt, err := utils.GenerateToken(user.ID, 30)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not generate activation token"})
		return
	}

	mailBody := services.ActivationData{
		Name: user.Username,
		JWT:  jwt,
	}
	if err := services.SendActivationEmail(user.Email, mailBody); err != nil {
		// The account exists; surface the email failure so the client can offer
		// to resend the activation email instead of silently succeeding.
		log.Printf("could not send activation email to %s: %v", user.Email, err)
		c.JSON(http.StatusCreated, gin.H{"warning": "account created but activation email could not be sent"})
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

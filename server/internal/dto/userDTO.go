package dto

import "time"

type LoginDTO struct {
	Email    string `json:"email" binding:"required"`
	Password string `json:"password" binding:"required"`
}

type UserResponseDTO struct {
	ID          string    `json:"id"`
	FullName    string    `json:"fullName"`
	Username    string    `json:"username"`
	Email       string    `json:"email"`
	Phone       string    `json:"phone"`
	DateOfBirth time.Time `json:"dateOfBirth"`
	University  string    `json:"university"`
	Career      string    `json:"career"`
}

type UserCreateDTO struct {
	FullName    string    `json:"fullName" binding:"required"`
	Username    string    `json:"username" binding:"required"`
	Email       string    `json:"email" binding:"required,email"`
	Phone       string    `json:"phone" binding:"required"`
	DateOfBirth time.Time `json:"dateOfBirth" binding:"required"`
	University  string    `json:"university" binding:"required"`
	Career      string    `json:"career" binding:"required"`
	Password    string    `json:"password" binding:"required,min=8,max=100"`
}

type UserUpdateDTO struct {
	ID          *string    `json:"id"`
	FullName    *string    `json:"fullName"`
	Username    *string    `json:"username"`
	Email       *string    `json:"email"`
	Phone       *string    `json:"phone"`
	DateOfBirth *time.Time `json:"dateOfBirth"`
	University  *string    `json:"university"`
	Career      *string    `json:"career"`
	Password    *string    `json:"password"`
	OldPassword *string    `json:"oldPassword"`
}

type UserInfoPostDTO struct {
	ID       string `json:"id"`
	Username string `json:"username"`
}

// This file contains all ToDTO functions
package dto

import (
	"uniwave/internal/core"
	"uniwave/internal/utils"
)

// *****************************************
// User DTO and ToModel
// *****************************************

func ToUserDTO(user core.User) UserResponseDTO {
	return UserResponseDTO{
		ID:          user.ID,
		FullName:    user.FullName,
		Username:    user.Username,
		Email:       user.Email,
		Phone:       user.Phone,
		DateOfBirth: user.DateOfBirth,
		University:  user.University,
		Career:      user.Career,
	}
}

func ToUserModel(createDTO UserCreateDTO) core.User {
	return core.User{
		FullName:    createDTO.FullName,
		Username:    createDTO.Username,
		Email:       createDTO.Email,
		Phone:       createDTO.Phone,
		DateOfBirth: createDTO.DateOfBirth,
		University:  createDTO.University,
		Career:      createDTO.Career,

		Password: func() string {
			hashed, _ := utils.HashPassword(createDTO.Password)
			return hashed
		}(), // Hash the password before storing
	}
}

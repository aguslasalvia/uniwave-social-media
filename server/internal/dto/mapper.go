// Contains the conversion functions between domain models (core) and DTOs.
package dto

import (
	"uniwave/internal/core"
	"uniwave/internal/utils"
)

// ToUserDTO builds the public representation of a user. The university is
// exposed as its name (taken from the preloaded relation, if present).
func ToUserDTO(user core.User) UserResponseDTO {
	universityName := ""
	if user.University != nil {
		universityName = user.University.Name
	}

	return UserResponseDTO{
		ID:          user.ID,
		FullName:    user.FullName,
		Username:    user.Username,
		Email:       user.Email,
		Phone:       user.Phone,
		DateOfBirth: user.DateOfBirth,
		University:  universityName,
		Career:      user.Career,
		Avatar:      user.Avatar,
	}
}

// ToUserModel builds a user from the registration data.
func ToUserModel(createDTO UserCreateDTO) core.User {
	hashed, _ := utils.HashPassword(createDTO.Password)

	return core.User{
		FullName:     createDTO.FullName,
		Username:     createDTO.Username,
		Email:        createDTO.Email,
		Phone:        createDTO.Phone,
		DateOfBirth:  createDTO.DateOfBirth,
		UniversityID: createDTO.University,
		Career:       createDTO.Career,
		Password:     hashed,
	}
}

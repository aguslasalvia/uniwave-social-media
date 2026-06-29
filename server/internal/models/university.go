package models

import (
	"context"
	"errors"

	"uniwave/internal/config"
	"uniwave/internal/core"
	"uniwave/internal/dto"

	"gorm.io/gorm"
)

// GetAllUniversities lists the enabled universities (state = true).
func GetAllUniversities(ctx context.Context) ([]dto.UniveristyListDTO, error) {
	var universities []dto.UniveristyListDTO
	err := config.DB.WithContext(ctx).
		Model(&core.University{}).
		Where("state = ?", true).
		Find(&universities).Error
	if err != nil {
		return nil, err
	}
	return universities, nil
}

// GetUniversityTheme returns a university's visual theme.
func GetUniversityTheme(ctx context.Context, id string) (core.Theme, error) {
	var university core.University
	err := config.DB.WithContext(ctx).First(&university, "id = ?", id).Error
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return core.Theme{}, nil
		}
		return core.Theme{}, err
	}
	return university.Theme, nil
}

// GetUniversityNameByID returns a university's name by its ID.
func GetUniversityNameByID(ctx context.Context, id string) (string, error) {
	var university core.University
	err := config.DB.WithContext(ctx).
		Select("name").
		First(&university, "id = ?", id).Error
	if err != nil {
		return "", err
	}
	return university.Name, nil
}

// FindUniversityByName looks up a university by exact name. Used when editing the
// profile, where the client sends the name instead of the ID.
func FindUniversityByName(ctx context.Context, name string) (*core.University, error) {
	var university core.University
	err := config.DB.WithContext(ctx).
		First(&university, "name = ?", name).Error
	if err != nil {
		return nil, err
	}
	return &university, nil
}

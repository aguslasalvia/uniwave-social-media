package models

import (
	"context"

	"uniwave/internal/config"
	"uniwave/internal/core"

	"gorm.io/gorm/clause"
)

// GetSettingsByUserID returns the user's settings.
func GetSettingsByUserID(ctx context.Context, userID string) (*core.Settings, error) {
	var settings core.Settings
	err := config.DB.WithContext(ctx).
		First(&settings, "user_id = ?", userID).Error
	if err != nil {
		return nil, err
	}
	return &settings, nil
}

// UpdateSettings saves the settings (creates them if missing, upsert by UserID).
func UpdateSettings(ctx context.Context, userID string, settings *core.Settings) error {
	settings.UserID = userID
	return config.DB.WithContext(ctx).
		Clauses(clause.OnConflict{
			Columns:   []clause.Column{{Name: "user_id"}},
			UpdateAll: true,
		}).
		Create(settings).Error
}

// CreateDefaultSettings creates default settings for a new user.
func CreateDefaultSettings(ctx context.Context, userID string) error {
	defaults := &core.Settings{
		Language:             "es",
		NotificationsEnabled: true,
	}
	return UpdateSettings(ctx, userID, defaults)
}

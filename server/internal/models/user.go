package models

import (
	"context"
	"errors"

	"uniwave/internal/config"
	"uniwave/internal/core"

	"gorm.io/gorm"
)

// CreateUser inserts a new user. The UUID is generated in the BeforeCreate hook.
func CreateUser(ctx context.Context, user *core.User) error {
	return config.DB.WithContext(ctx).Create(user).Error
}

// ActivateUser marks the account as activated (status = true).
func ActivateUser(ctx context.Context, userID string) error {
	res := config.DB.WithContext(ctx).
		Model(&core.User{}).
		Where("id = ?", userID).
		Update("status", true)

	if res.Error != nil {
		return res.Error
	}
	if res.RowsAffected == 0 {
		return errors.New("user not found")
	}
	return nil
}

// Login looks up an activated user by email, preloading the university so the
// name and theme can be returned without extra queries.
func Login(ctx context.Context, email string) (*core.User, error) {
	var user core.User
	err := config.DB.WithContext(ctx).
		Preload("University").
		Where("email = ? AND status = ?", email, true).
		First(&user).Error

	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, errors.New("user not found or not activated")
		}
		return nil, err
	}
	return &user, nil
}

// FindUserByID returns a user by ID with the university preloaded.
func FindUserByID(ctx context.Context, userID string) (*core.User, error) {
	var user core.User
	err := config.DB.WithContext(ctx).
		Preload("University").
		First(&user, "id = ?", userID).Error

	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, errors.New("user not found")
		}
		return nil, err
	}
	return &user, nil
}

// FindUserByEmail returns a user by email (regardless of activation status).
func FindUserByEmail(ctx context.Context, email string) (*core.User, error) {
	var user core.User
	err := config.DB.WithContext(ctx).
		Where("email = ?", email).
		First(&user).Error

	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, errors.New("user not found")
		}
		return nil, err
	}
	return &user, nil
}

// UpdateUser saves the user's changes. The University association is omitted so
// the universities table is not touched when updating the profile.
func UpdateUser(ctx context.Context, user *core.User) error {
	return config.DB.WithContext(ctx).Omit("University").Save(user).Error
}

// VerifyPassword checks that the given password matches the user's.
func VerifyPassword(ctx context.Context, userID string, password string) (bool, error) {
	user, err := FindUserByID(ctx, userID)
	if err != nil {
		return false, err
	}
	return user.CheckPassword(password), nil
}

// GetUserStats returns the post, follower and following counts.
func GetUserStats(ctx context.Context, userID string) (map[string]int, error) {
	db := config.DB.WithContext(ctx)

	var posts, followers, following int64
	db.Model(&core.Post{}).Where("author_id = ?", userID).Count(&posts)
	db.Model(&core.Follow{}).Where("following_id = ?", userID).Count(&followers)
	db.Model(&core.Follow{}).Where("follower_id = ?", userID).Count(&following)

	return map[string]int{
		"posts":     int(posts),
		"followers": int(followers),
		"following": int(following),
	}, nil
}

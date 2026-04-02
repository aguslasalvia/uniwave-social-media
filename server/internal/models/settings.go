package models

import (
	"context"
	"uniwave/internal/config"
	"uniwave/internal/core"
)

func GetSettingsByUserID(ctx context.Context, userID string) (*core.Settings, error) {
	client, err := config.FirebaseApp.Firestore(ctx)
	if err != nil {
		return nil, err
	}
	defer client.Close()

	docRef := client.Collection("settings").Doc(userID)
	doc, err := docRef.Get(ctx)
	if err != nil {
		return nil, err
	}

	var settings core.Settings
	err = doc.DataTo(&settings)
	if err != nil {
		return nil, err
	}

	return &settings, nil
}

func UpdateSettings(ctx context.Context, userID string, settings *core.Settings) error {
	client, err := config.FirebaseApp.Firestore(ctx)
	if err != nil {
		return err
	}
	defer client.Close()

	docRef := client.Collection("settings").Doc(userID)
	_, err = docRef.Set(ctx, settings)
	if err != nil {
		return err
	}

	return nil
}

package config

import (
	"context"

	firebase "firebase.google.com/go"
	"google.golang.org/api/option"
)

var FirebaseApp *firebase.App

func init() {
	ctx := context.Background()
	opt := option.WithCredentialsFile("config/serviceAccountKey.json")

	app, err := firebase.NewApp(ctx, nil, opt)
	if err != nil {
		panic("Failed to initialize Firebase app: " + err.Error())
	}

	FirebaseApp = app
}

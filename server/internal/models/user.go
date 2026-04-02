package models

import (
	"context"
	"errors"

	"uniwave/internal/config"
	"uniwave/internal/core"

	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

// CreateUser creates a new user in the Firestore database.
func CreateUser(ctx context.Context, user *core.User) error {
	client, err := config.FirebaseApp.Firestore(ctx)

	if err != nil {
		return err
	}
	defer client.Close()

	docRef, _, err := client.Collection("users").Add(ctx, user)
	if err != nil {
		return err
	}

	user.ID = docRef.ID
	return nil
}

func ActivateUser(ctx context.Context, userID string) error {
	client, err := config.FirebaseApp.Firestore(ctx)
	if err != nil {
		return err
	}
	defer client.Close()

	doc, err := client.Collection("users").Doc(userID).Get(ctx)
	if err != nil {
		return err
	}
	data := doc.Data()
	data["status"] = true

	_, err = client.Collection("users").Doc(userID).Set(ctx, data)

	return err
}

func Login(ctx context.Context, email string) (*core.User, error) {
	client, err := config.FirebaseApp.Firestore(ctx)
	if err != nil {
		return nil, err
	}
	defer client.Close()

	query := client.Collection("users").
		Where("email", "==", email).
		Where("status", "==", true).
		Limit(1)

	docs, err := query.Documents(ctx).GetAll()

	if err != nil {
		return nil, err
	}

	if len(docs) == 0 {
		return nil, errors.New("user not found or not activated")
	}

	var user core.User
	err = docs[0].DataTo(&user)
	if err != nil {
		return nil, err
	}

	user.ID = docs[0].Ref.ID

	return &user, nil
}

// Find User by Firebase document ID
func FindUserByID(ctx context.Context, userID string) (*core.User, error) {
	client, err := config.FirebaseApp.Firestore(ctx)
	if err != nil {
		return nil, err
	}
	defer client.Close()

	doc, err := client.Collection("users").Doc(userID).Get(ctx)
	if err != nil {
		if status.Code(err) == codes.NotFound {
			return nil, errors.New("user not found")
		}
		return nil, err
	}

	var user core.User
	if err := doc.DataTo(&user); err != nil {
		return nil, err
	}

	user.ID = doc.Ref.ID

	return &user, nil
}

// FindUserByEmail retrieves a user by their email address from the Firestore database.
// It returns an error if the user is not found or if there is an issue with the
func FindUserByEmail(ctx context.Context, email string) (*core.User, error) {
	client, err := config.FirebaseApp.Firestore(ctx)
	if err != nil {
		return nil, err
	}
	defer client.Close()

	query := client.Collection("users").Where("email", "==", email).Limit(1)
	docs, err := query.Documents(ctx).GetAll()
	if err != nil {
		return nil, err
	}

	if len(docs) == 0 {
		return nil, errors.New("user not found")
	}

	var user core.User
	err = docs[0].DataTo(&user)
	if err != nil {
		return nil, err
	}

	user.ID = docs[0].Ref.ID

	return &user, nil
}

func UpdateUser(ctx context.Context, user *core.User) error {
	client, err := config.FirebaseApp.Firestore(ctx)
	if err != nil {
		return err
	}
	defer client.Close()
	docRef := client.Collection("users").Doc(user.ID)
	_, err = docRef.Set(ctx, user)
	if err != nil {
		return err
	}
	return nil
}

func VerifyPassword(ctx context.Context, userId string, password string) (bool, error) {

	// Create the connection with the db
	client, err := config.FirebaseApp.Firestore(ctx)
	if err != nil {
		return false, err
	}

	// On failed, closes the connection
	defer client.Close()

	// search the user
	doc, err := client.Collection("users").Doc(userId).Get(ctx)
	if err != nil {
		return false, err
	}

	var user core.User

	if err := doc.DataTo(&user); err != nil {
		return false, err
	}
	user.ID = doc.Ref.ID

	// Compares the old password of the server with the incoming old password
	// typed by the user

	if !user.CheckPassword(password) {
		return false, nil
	}

	return true, nil
}

func GetUserStats(ctx context.Context) {}

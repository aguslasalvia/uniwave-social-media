package models

import (
	"context"
	"uniwave/internal/config"
	"uniwave/internal/dto"

	"google.golang.org/api/iterator"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func GetAllUniversities(ctx context.Context) ([]dto.UniveristyListDTO, error) {
	client, err := config.FirebaseApp.Firestore(ctx)
	if err != nil {
		return nil, err
	}
	defer client.Close()

	iter := client.Collection("universities").
		Where("state", "==", true).
		Documents(ctx)

	defer iter.Stop()

	var universities []dto.UniveristyListDTO

	for {
		doc, err := iter.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return nil, err
		}

		var uni dto.UniveristyListDTO
		// Mapear campos desde Firestore al DTO
		if name, ok := doc.Data()["name"].(string); ok {
			uni.Name = name
		}
		uni.ID = doc.Ref.ID // El ID del documento

		universities = append(universities, uni)
	}

	return universities, nil
}

func GetUniversityTheme(ctx context.Context, id string) (dto.ThemeDTO, error) {
	client, err := config.FirebaseApp.Firestore(ctx)
	if err != nil {
		return dto.ThemeDTO{}, err
	}
	defer client.Close()

	doc, err := client.Collection("universities").Doc(id).Get(ctx)

	if err != nil {
		if status.Code(err) == codes.NotFound {
			return dto.ThemeDTO{}, nil
		}
		return dto.ThemeDTO{}, err
	}

	var result struct {
		Theme dto.ThemeDTO `firestore:"theme"`
	}

	if err := doc.DataTo(&result); err != nil {
		return dto.ThemeDTO{}, err
	}

	return result.Theme, nil
}

func GetUniversityNameByID(ctx context.Context, id string) (string, error) {
	client, err := config.FirebaseApp.Firestore(ctx)
	if err != nil {
		return "", err
	}
	defer client.Close()

	docRef := client.Collection("universities").Doc(id)
	docSnap, err := docRef.Get(ctx)

	if err != nil {
		return "", err
	}

	name, err := docSnap.DataAt("name")
	if err != nil {
		return "", err
	}

	if nameStr, ok := name.(string); ok {
		return nameStr, nil
	}

	return "", status.Error(404, "Not Found")

}

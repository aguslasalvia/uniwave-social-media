package models

import (
	"context"
	"uniwave/internal/config"
	"uniwave/internal/core"
	"uniwave/internal/dto"
	"uniwave/internal/interfaces"

	"cloud.google.com/go/firestore"
	"google.golang.org/api/iterator"
)

func CreatePost(ctx context.Context, post *core.Post) error {
	client, err := config.FirebaseApp.Firestore(ctx)

	if err != nil {
		return err
	}
	defer client.Close()

	docRef, _, err := client.Collection("posts").Add(ctx, post)
	if err != nil {
		return err
	}

	post.ID = docRef.ID
	return nil
}

func DeletePost(ctx context.Context, postData dto.PostInteractionDTO) error {
	client, err := config.FirebaseApp.Firestore(ctx)

	if err != nil {
		return err
	}
	defer client.Close()

	docRef := client.Collection("posts").Doc(postData.PostID)

	docSnap, err := docRef.Get(ctx)

	if err != nil {
		return &interfaces.HTTPResponse{
			Code:    400,
			Message: "Unexpected Error",
		}
	}

	authorID, ok := docSnap.Data()["AuthorID"].(string)
	if !ok {
		return &interfaces.HTTPResponse{
			Code:    404,
			Message: "Author not found",
		}
	}

	if authorID != postData.UserID {
		return &interfaces.HTTPResponse{
			Code:    401,
			Message: "Unauthorized Action",
		}
	}

	_, err = docRef.Delete(ctx)

	if err != nil {
		return &interfaces.HTTPResponse{
			Code:    400,
			Message: "Unable to Delete this resource",
		}
	}

	return nil
}

func GetLatestPosts(ctx context.Context) ([]core.Post, error) {
	client, err := config.FirebaseApp.Firestore(ctx)
	if err != nil {
		return nil, err
	}
	defer client.Close()

	// Ordena por CreatedAt en orden descendente y limita a 10
	iter := client.Collection("posts").
		OrderBy("createdAt", firestore.Desc).
		Limit(10).
		Documents(ctx)

	var posts []core.Post
	for {
		doc, err := iter.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return nil, err
		}

		var post core.Post
		if err := doc.DataTo(&post); err != nil {
			return nil, err
		}
		post.ID = doc.Ref.ID
		posts = append(posts, post)
	}

	return posts, nil
}

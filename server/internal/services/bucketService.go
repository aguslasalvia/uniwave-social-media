package services

import (
	"context"
	"fmt"
	"mime/multipart"
	"uniwave/internal/config"

	"github.com/minio/minio-go/v7"
)

func UploadUserFile(userID string, fileHeader *multipart.FileHeader) (string, error) {
	file, err := fileHeader.Open()
	if err != nil {
		return "", err
	}
	defer file.Close()

	objectName := fmt.Sprintf("%s/%s", userID, fileHeader.Filename)

	_, err = config.MinioClient.PutObject(
		context.Background(),
		"avatars",
		objectName,
		file,
		fileHeader.Size,
		minio.PutObjectOptions{ContentType: fileHeader.Header.Get("Content-Type")},
	)
	if err != nil {
		return "", err
	}

	return objectName, nil
}

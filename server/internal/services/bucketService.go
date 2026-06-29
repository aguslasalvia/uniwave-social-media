package services

import (
	"context"
	"fmt"
	"mime/multipart"
	"os"
	"path/filepath"
	"strings"
	"time"
	"uniwave/internal/config"

	"github.com/minio/minio-go/v7"
)

// publicURL builds the externally reachable URL for an uploaded object.
// MINIO_PUBLIC_URL should point to the host the mobile client can reach
// (e.g. http://192.168.1.10:9000). It falls back to MINIO_ENDPOINT.
func publicURL(bucket, objectName string) string {
	base := os.Getenv("MINIO_PUBLIC_URL")
	if base == "" {
		scheme := "http"
		if os.Getenv("MINIO_USE_SSL") == "true" {
			scheme = "https"
		}
		base = fmt.Sprintf("%s://%s", scheme, os.Getenv("MINIO_ENDPOINT"))
	}
	return fmt.Sprintf("%s/%s/%s", strings.TrimRight(base, "/"), bucket, objectName)
}

// uploadFile streams a multipart file to the given bucket and returns its
// public URL.
func uploadFile(bucket, objectName string, fileHeader *multipart.FileHeader) (string, error) {
	file, err := fileHeader.Open()
	if err != nil {
		return "", err
	}
	defer file.Close()

	_, err = config.MinioClient.PutObject(
		context.Background(),
		bucket,
		objectName,
		file,
		fileHeader.Size,
		minio.PutObjectOptions{ContentType: fileHeader.Header.Get("Content-Type")},
	)
	if err != nil {
		return "", err
	}

	return publicURL(bucket, objectName), nil
}

// UploadAvatar uploads a user's avatar and returns its public URL.
func UploadAvatar(userID string, fileHeader *multipart.FileHeader) (string, error) {
	ext := filepath.Ext(fileHeader.Filename)
	if ext == "" {
		ext = ".jpg"
	}
	objectName := fmt.Sprintf("%s/avatar%s", userID, ext)
	return uploadFile(config.AvatarsBucket, objectName, fileHeader)
}

// UploadPostImage uploads an image attached to a post and returns its public URL.
func UploadPostImage(userID string, fileHeader *multipart.FileHeader) (string, error) {
	ext := filepath.Ext(fileHeader.Filename)
	if ext == "" {
		ext = ".jpg"
	}
	objectName := fmt.Sprintf("%s/%d%s", userID, time.Now().UnixNano(), ext)
	return uploadFile(config.PostsBucket, objectName, fileHeader)
}

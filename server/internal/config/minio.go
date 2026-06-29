package config

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/minio/minio-go/v7"
	"github.com/minio/minio-go/v7/pkg/credentials"
)

// MinioClient is the global object storage client (images).
var MinioClient *minio.Client

// Buckets used by the application.
const (
	AvatarsBucket = "avatars"
	PostsBucket   = "posts"
)

func init() {
	endpoint := os.Getenv("MINIO_ENDPOINT")

	// If no endpoint is configured the app still starts: image uploads will
	// simply fail until MinIO is set up.
	if endpoint == "" {
		log.Println("MINIO_ENDPOINT not set: image storage is disabled")
		return
	}

	accessKeyID := os.Getenv("MINIO_ACCESS_KEY")
	secretAccessKey := os.Getenv("MINIO_SECRET")
	useSSL := os.Getenv("MINIO_USE_SSL") == "true"

	client, err := minio.New(endpoint, &minio.Options{
		Creds:  credentials.NewStaticV4(accessKeyID, secretAccessKey, ""),
		Secure: useSSL,
	})
	if err != nil {
		log.Println("No se pudo inicializar MinIO: ", err)
		return
	}

	MinioClient = client

	// Ensure the buckets exist and are publicly readable so images can be served
	// directly via their URL.
	ensureBucket(client, AvatarsBucket)
	ensureBucket(client, PostsBucket)

	log.Println("MinIO connected")
}

func ensureBucket(client *minio.Client, name string) {
	ctx := context.Background()

	exists, err := client.BucketExists(ctx, name)
	if err != nil {
		log.Printf("MinIO: could not check bucket %q: %v", name, err)
		return
	}

	if !exists {
		if err := client.MakeBucket(ctx, name, minio.MakeBucketOptions{}); err != nil {
			log.Printf("MinIO: could not create bucket %q: %v", name, err)
			return
		}
	}

	// Anonymous read-only policy over the bucket's objects.
	policy := fmt.Sprintf(`{
		"Version": "2012-10-17",
		"Statement": [
			{
				"Effect": "Allow",
				"Principal": {"AWS": ["*"]},
				"Action": ["s3:GetObject"],
				"Resource": ["arn:aws:s3:::%s/*"]
			}
		]
	}`, name)

	if err := client.SetBucketPolicy(ctx, name, policy); err != nil {
		log.Printf("MinIO: could not apply public policy to bucket %q: %v", name, err)
	}
}

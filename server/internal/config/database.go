package config

import (
	"fmt"
	"log"
	"os"

	"uniwave/internal/core"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

// DB is the global PostgreSQL connection used by every model.
var DB *gorm.DB

func init() {
	dsn := buildDSN()

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Could not connect to PostgreSQL: ", err)
	}

	// Create/update the tables from the domain structs.
	if err := db.AutoMigrate(
		&core.University{},
		&core.User{},
		&core.Settings{},
		&core.Post{},
		&core.PostImage{},
		&core.Comment{},
		&core.Like{},
		&core.Follow{},
	); err != nil {
		log.Fatal("Schema migration failed: ", err)
	}

	DB = db

	// Seed example universities on first run so registration works without
	// having to insert them by hand.
	seedUniversities(db)

	log.Println("PostgreSQL connected and schema migrated")
}

// buildDSN builds the connection string. It prefers DATABASE_URL (a single
// variable, convenient in production) and otherwise assembles it from discrete
// variables.
func buildDSN() string {
	if url := os.Getenv("DATABASE_URL"); url != "" {
		return url
	}

	host := getEnv("DB_HOST", "localhost")
	port := getEnv("DB_PORT", "5432")
	user := getEnv("DB_USER", "postgres")
	password := getEnv("DB_PASSWORD", "postgres")
	name := getEnv("DB_NAME", "uniwave")
	sslmode := getEnv("DB_SSLMODE", "disable")

	return fmt.Sprintf(
		"host=%s port=%s user=%s password=%s dbname=%s sslmode=%s",
		host, port, user, password, name, sslmode,
	)
}

func getEnv(key, fallback string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return fallback
}

// seedUniversities inserts initial universities only when the table is empty.
func seedUniversities(db *gorm.DB) {
	var count int64
	db.Model(&core.University{}).Count(&count)
	if count > 0 {
		return
	}

	universities := DefaultUniversities()

	if err := db.Create(&universities).Error; err != nil {
		log.Println("Could not create initial universities: ", err)
		return
	}
	log.Println("Initial universities created")
}

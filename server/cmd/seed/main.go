// Command seed inserts development test data (users, posts, likes, comments,
// a follow) into the database. It is idempotent: if the test users already
// exist it does nothing. Run it with: go run ./cmd/seed
package main

import (
	"context"
	"log"
	"time"

	"uniwave/internal/config"
	"uniwave/internal/core"
	"uniwave/internal/utils"
)

const testPassword = "password123"

func main() {
	ctx := context.Background()
	db := config.DB

	// Skip if the seed already ran (look for the first test user).
	var existing int64
	db.WithContext(ctx).Model(&core.User{}).
		Where("email = ?", "ana@udelar.edu.uy").
		Count(&existing)
	if existing > 0 {
		log.Println("Test data already present, nothing to do.")
		return
	}

	// Attach the test users to the first available university.
	var university core.University
	if err := db.WithContext(ctx).First(&university).Error; err != nil {
		log.Fatal("No universities found. Start the server once so they get seeded.")
	}

	hashed, err := utils.HashPassword(testPassword)
	if err != nil {
		log.Fatal("Could not hash password: ", err)
	}

	users := []core.User{
		{FullName: "Ana Pérez", Username: "ana", Email: "ana@udelar.edu.uy", Phone: "099111111", DateOfBirth: time.Date(2001, 3, 12, 0, 0, 0, 0, time.UTC), UniversityID: university.ID, Career: "Química", Password: hashed, Status: true},
		{FullName: "Bruno Díaz", Username: "bruno", Email: "bruno@udelar.edu.uy", Phone: "099222222", DateOfBirth: time.Date(2000, 7, 5, 0, 0, 0, 0, time.UTC), UniversityID: university.ID, Career: "Ingeniería", Password: hashed, Status: true},
		{FullName: "Carla Suárez", Username: "carla", Email: "carla@udelar.edu.uy", Phone: "099333333", DateOfBirth: time.Date(2002, 11, 23, 0, 0, 0, 0, time.UTC), UniversityID: university.ID, Career: "Medicina", Password: hashed, Status: true},
	}
	if err := db.WithContext(ctx).Create(&users).Error; err != nil {
		log.Fatal("Could not create users: ", err)
	}

	// Default settings for each test user.
	for _, u := range users {
		_ = db.WithContext(ctx).Create(&core.Settings{
			UserID:               u.ID,
			Language:             "es",
			NotificationsEnabled: true,
		}).Error
	}

	// A few posts.
	posts := []core.Post{
		{Content: "¡Hola UniWave! Mi primer post 🎉", AuthorID: users[0].ID, Privacy: "public", CreatedAt: time.Now().Add(-3 * time.Hour)},
		{Content: "Alguien tiene los apuntes de Cálculo II?", AuthorID: users[1].ID, Privacy: "public", CreatedAt: time.Now().Add(-2 * time.Hour)},
		{Content: "Hoy hubo charla de IA en la facultad, estuvo buenísima.", AuthorID: users[2].ID, Privacy: "public", CreatedAt: time.Now().Add(-1 * time.Hour)},
	}
	if err := db.WithContext(ctx).Create(&posts).Error; err != nil {
		log.Fatal("Could not create posts: ", err)
	}

	// Some likes (Bruno and Carla like Ana's post; Ana likes Bruno's).
	likes := []core.Like{
		{PostID: posts[0].ID, UserID: users[1].ID},
		{PostID: posts[0].ID, UserID: users[2].ID},
		{PostID: posts[1].ID, UserID: users[0].ID},
	}
	if err := db.WithContext(ctx).Create(&likes).Error; err != nil {
		log.Fatal("Could not create likes: ", err)
	}

	// A couple of comments on Ana's post.
	comments := []core.Comment{
		{PostID: posts[0].ID, AuthorID: users[1].ID, Content: "¡Bienvenida Ana!", CreatedAt: time.Now().Add(-150 * time.Minute)},
		{PostID: posts[0].ID, AuthorID: users[2].ID, Content: "Que bueno verte por acá 🙌", CreatedAt: time.Now().Add(-140 * time.Minute)},
	}
	if err := db.WithContext(ctx).Create(&comments).Error; err != nil {
		log.Fatal("Could not create comments: ", err)
	}

	// Ana follows Bruno.
	_ = db.WithContext(ctx).Create(&core.Follow{
		FollowerID:  users[0].ID,
		FollowingID: users[1].ID,
	}).Error

	log.Println("Seed completed. Test users (password for all: " + testPassword + "):")
	for _, u := range users {
		log.Printf("  - %s", u.Email)
	}
}

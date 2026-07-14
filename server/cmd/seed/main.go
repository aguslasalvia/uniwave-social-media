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

	hashed, err := utils.HashPassword(testPassword)
	if err != nil {
		log.Fatal("Could not hash password: ", err)
	}

	// Upsert the university catalog by name so an existing database picks up
	// new institutions and theme changes on every rerun.
	for _, u := range config.DefaultUniversities() {
		var existing core.University
		if err := db.WithContext(ctx).Where("name = ?", u.Name).First(&existing).Error; err != nil {
			if err := db.WithContext(ctx).Create(&u).Error; err != nil {
				log.Fatal("Could not create university "+u.Name+": ", err)
			}
			log.Println("Created university:", u.Name)
		} else if err := db.WithContext(ctx).Model(&existing).Update("theme", u.Theme).Error; err != nil {
			log.Fatal("Could not update theme for "+u.Name+": ", err)
		}
	}

	// One test user per university, each with default settings and a starter
	// post, so every institution's theme and feed can be exercised from the
	// login screen. Runs before the ana@ guard so reruns pick up newly added
	// institutions.
	uniTestUsers := []struct {
		uniName string
		user    core.User
		post    string
	}{
		{
			uniName: "Facultad de Química (fq.edu.uy)",
			user:    core.User{FullName: "Diego Fernández", Username: "diego", Email: "diego@fq.edu.uy", Phone: "099444444", DateOfBirth: time.Date(2001, 9, 30, 0, 0, 0, 0, time.UTC), Career: "Química"},
			post:    "Práctica de orgánica entregada, semana ganada 🧪",
		},
		{
			uniName: "Facultad de Ingeniería (fing.edu.uy)",
			user:    core.User{FullName: "Inés Machado", Username: "ines", Email: "ines@fing.edu.uy", Phone: "099555555", DateOfBirth: time.Date(2002, 4, 18, 0, 0, 0, 0, time.UTC), Career: "Ingeniería en Computación"},
			post:    "Arrancó el semestre en fing, ¿alguien más cursando Cálculo 3?",
		},
		{
			uniName: "Facultad de Derecho (fder.edu.uy)",
			user:    core.User{FullName: "Julián Techera", Username: "julian", Email: "julian@fder.edu.uy", Phone: "099666666", DateOfBirth: time.Date(2000, 12, 2, 0, 0, 0, 0, time.UTC), Career: "Abogacía"},
			post:    "Vendo Código Civil comentado casi nuevo, consultas por mensaje ⚖️",
		},
		{
			uniName: "Facultad de Humanidades (fhce.edu.uy)",
			user:    core.User{FullName: "Morena Silva", Username: "morena", Email: "morena@fhce.edu.uy", Phone: "099777777", DateOfBirth: time.Date(2001, 6, 25, 0, 0, 0, 0, time.UTC), Career: "Letras"},
			post:    "Dato: la biblioteca de FHCE a la tarde es el mejor lugar para estudiar",
		},
		{
			uniName: "Universidad ORT Uruguay",
			user:    core.User{FullName: "Tomás Kaplan", Username: "tomas", Email: "tomas@ort.edu.uy", Phone: "099888888", DateOfBirth: time.Date(2002, 1, 9, 0, 0, 0, 0, time.UTC), Career: "Ingeniería en Sistemas"},
			post:    "Hackathon en ORT el finde que viene, ¿armamos equipo?",
		},
		{
			uniName: "Universidad Católica del Uruguay",
			user:    core.User{FullName: "Paula Etcheverry", Username: "paula", Email: "paula@ucu.edu.uy", Phone: "099999999", DateOfBirth: time.Date(2001, 10, 14, 0, 0, 0, 0, time.UTC), Career: "Psicología"},
			post:    "Primer parcial de Psico aprobado 🎉",
		},
	}
	for _, tu := range uniTestUsers {
		var uni core.University
		if err := db.WithContext(ctx).Where("name = ?", tu.uniName).First(&uni).Error; err != nil {
			log.Fatal(tu.uniName+" not found after seeding: ", err)
		}
		var count int64
		db.WithContext(ctx).Model(&core.User{}).
			Where("email = ?", tu.user.Email).
			Count(&count)
		if count > 0 {
			continue
		}
		u := tu.user
		u.UniversityID = uni.ID
		u.Password = hashed
		u.Status = true
		if err := db.WithContext(ctx).Create(&u).Error; err != nil {
			log.Fatal("Could not create user "+u.Email+": ", err)
		}
		_ = db.WithContext(ctx).Create(&core.Settings{
			UserID:               u.ID,
			Language:             "es",
			NotificationsEnabled: true,
		}).Error
		_ = db.WithContext(ctx).Create(&core.Post{
			Content:   tu.post,
			AuthorID:  u.ID,
			Privacy:   "public",
			CreatedAt: time.Now().Add(-4 * time.Hour),
		}).Error
		log.Println("Created user: " + u.Email + " (password: " + testPassword + ")")
	}

	// Skip if the seed already ran (look for the first test user).
	var existing int64
	db.WithContext(ctx).Model(&core.User{}).
		Where("email = ?", "ana@udelar.edu.uy").
		Count(&existing)
	if existing > 0 {
		log.Println("Test data already present, nothing to do.")
		return
	}

	// The richer test data (posts, likes, comments, a follow) lives in
	// Facultad de Química, the faculty used for day-to-day development.
	var university core.University
	if err := db.WithContext(ctx).Where("name = ?", "Facultad de Química (fq.edu.uy)").First(&university).Error; err != nil {
		log.Fatal("Facultad de Química not found. Start the server once so universities get seeded.")
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

package core

import (
	"time"
	"uniwave/internal/utils"
)

type User struct {
	ID          string    `json:"id,omitempty" firestore:"-"`
	FullName    string    `json:"fullName" firestore:"fullName"`
	Username    string    `json:"username" firestore:"username"`
	Email       string    `json:"email" firestore:"email"`
	Phone       string    `json:"phone" firestore:"phone"`
	DateOfBirth time.Time `json:"dateOfBirth" firestore:"dateOfBirth"`
	University  string    `json:"university" firestore:"university"`
	Career      string    `json:"career" firestore:"career"`
	Password    string    `json:"-" firestore:"password"`
	Status      bool      `json:"status" firestore:"status"`
	Subscribed  []string  `json:"subscribed" firestore:"subscribe"`
}

func (u *User) CheckPassword(password string) bool {
	return utils.CheckPasswordHash(password, u.Password)
}

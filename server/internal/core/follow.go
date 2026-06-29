package core

// Follow represents that one user (Follower) follows another (Following).
// The composite primary key prevents duplicate follow relations.
type Follow struct {
	FollowerID  string `gorm:"type:uuid;primaryKey" json:"followerId"`
	FollowingID string `gorm:"type:uuid;primaryKey" json:"followingId"`
}

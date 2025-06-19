package models

import "time"

// Patient represents the structure for a patient record.
// @Description Patient model
type Patient struct {
	ID        uint      `json:"id" gorm:"primaryKey"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
	DeletedAt *time.Time `json:"deleted_at" gorm:"index"`

	Name      string `gorm:"not null" json:"name"`
	Age       int `json:"age"`
	Gender    string `json:"gender"`
	Diagnosis string `json:"diagnosis"`
	Notes     string `json:"notes"`
}
package controllers

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"os"
	"testing"
	"log"
	"path/filepath"

	"clinicapp/config"
	"clinicapp/models"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func setupTestDB() {
	rootPath := filepath.Join("..", ".env")
	err := godotenv.Load(rootPath)
	if err != nil {
		log.Fatalf("Error loading .env file from root: %s", rootPath)
	}

	dsn := "host=localhost user=postgres password=" + os.Getenv("DB_PASSWORD") + " dbname=clinicapp port=5432 sslmode=disable"
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("Failed to connect to test DB")
	}
	db.AutoMigrate(&models.Patient{})
	config.DB = db
}

func TestAddPatient(t *testing.T) {
	setupTestDB()

	router := gin.Default()
	router.POST("/api/patients", CreatePatient)

	patient := models.Patient{
		Name:      "Jay",
		Age:       30,
		Gender:    "Male",
		Diagnosis: "Flu",
		Notes:     "Take rest",
	}
	jsonData, _ := json.Marshal(patient)

	req, _ := http.NewRequest("POST", "/api/patients", bytes.NewBuffer(jsonData))
	req.Header.Set("Content-Type", "application/json")
	w := httptest.NewRecorder()

	router.ServeHTTP(w, req)

	if w.Code != http.StatusCreated {
		t.Errorf("Expected 201 Created but got %d", w.Code)
	}
}

func TestGetPatients(t *testing.T) {
	setupTestDB()

	router := gin.Default()
	router.GET("/api/patients", GetAllPatients)

	req, _ := http.NewRequest("GET", "/api/patients", nil)
	w := httptest.NewRecorder()

	router.ServeHTTP(w, req)

	if w.Code != http.StatusOK {
		t.Errorf("Expected 200 OK but got %d", w.Code)
	}
}

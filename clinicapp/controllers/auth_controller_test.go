package controllers

import (
	"bytes"
	"encoding/json"
	"log"
	"net/http"
	"net/http/httptest"
	"os"
	"testing"
	"path/filepath"

	"clinicapp/config"
	"clinicapp/models"
	"clinicapp/utils"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func TestMain(m *testing.M) {
	rootPath := filepath.Join("..", ".env")
	err := godotenv.Load(rootPath)
	if err != nil {
		log.Fatalf("Error loading .env file from root: %s", rootPath)
	}

	dsn := "host=localhost user=postgres password=" + os.Getenv("DB_PASSWORD") + " dbname=clinicapp port=5432 sslmode=disable"
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("Failed to connect to test database: %v", err)
	}
	db.AutoMigrate(&models.User{})

	config.DB = db

	code := m.Run()
	os.Exit(code)
}

func createTestUser() {
	hashedPassword := utils.HashPassword("testpass")
	user := models.User{
		Username: "testuser",
		Password: hashedPassword,
		Role:     "doctor",
	}

	config.DB.Where("username = ?", "testuser").Delete(&models.User{})
	config.DB.Create(&user)
}


func TestLogin_Success(t *testing.T) {
	createTestUser()

	router := gin.Default()
	router.POST("/api/login", Login)

	body := map[string]string{
		"username": "testuser",
		"password": "testpass",
	}
	jsonValue, _ := json.Marshal(body)

	req, _ := http.NewRequest("POST", "/api/login", bytes.NewBuffer(jsonValue))
	req.Header.Set("Content-Type", "application/json")
	w := httptest.NewRecorder()

	router.ServeHTTP(w, req)

	if w.Code != http.StatusOK {
		t.Errorf("Expected status 200 but got %d", w.Code)
	}
}

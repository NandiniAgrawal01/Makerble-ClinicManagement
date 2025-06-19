package controllers

import (
	"clinicapp/config"
	"clinicapp/models"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

// CreatePatient godoc
// @Summary Create a new patient
// @Description Add a new patient to the database
// @Tags patients
// @Accept json
// @Produce json
// @Param patient body models.Patient true "Patient data"
// @Success 201 {object} models.Patient
// @Failure 400 {object} map[string]string
// @Failure 500 {object} map[string]string
// @Router /patients [post]
func CreatePatient(c *gin.Context) {
	var patient models.Patient
	if err := c.ShouldBindJSON(&patient); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := config.DB.Create(&patient).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, patient)
}

// GetAllPatients godoc
// @Summary Get all patients
// @Description Retrieve all patient records
// @Tags patients
// @Produce json
// @Success 200 {array} models.Patient
// @Router /patients [get]
func GetAllPatients(c *gin.Context) {
	var patients []models.Patient
	config.DB.Find(&patients)
	c.JSON(http.StatusOK, patients)
}

// GetPatientByID godoc
// @Summary Get a patient by ID
// @Description Retrieve a single patient by their ID
// @Tags patients
// @Produce json
// @Param ID path int true "Patient ID"
// @Success 200 {object} models.Patient
// @Failure 404 {object} map[string]string
// @Router /patients/{id} [get]
func GetPatientByID(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))
	var patient models.Patient
	if err := config.DB.First(&patient, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Patient not found"})
		return
	}
	c.JSON(http.StatusOK, patient)
}

// UpdatePatient godoc
// @Summary Update a patient's details
// @Description Update any field of a patient by ID
// @Tags patients
// @Accept json
// @Produce json
// @Param ID path int true "Patient ID"
// @Param patient body models.Patient true "Updated patient data"
// @Success 200 {object} models.Patient
// @Failure 400 {object} map[string]string
// @Failure 404 {object} map[string]string
// @Router /patients/{id} [put]
func UpdatePatient(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))
	var patient models.Patient
	if err := config.DB.First(&patient, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Patient not found"})
		return
	}

	if err := c.ShouldBindJSON(&patient); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	config.DB.Save(&patient)
	c.JSON(http.StatusOK, patient)
}

// DeletePatient godoc
// @Summary Delete a patient
// @Description Permanently delete a patient by ID
// @Tags patients
// @Produce json
// @Param id path int true "Patient ID"
// @Success 200 {object} map[string]string
// @Failure 400 {object} map[string]string
// @Failure 500 {object} map[string]string
// @Router /patients/{id} [delete]
func DeletePatient(c *gin.Context) {
	idParam := c.Param("id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid patient ID"})
		return
	}

	if err := config.DB.Unscoped().Delete(&models.Patient{}, id).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Patient permanently deleted"})
}
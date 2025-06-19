package routes

import (
	"clinicapp/controllers"
	"clinicapp/middlewares"

	"github.com/gin-gonic/gin"
)

func SetupRoutes(r *gin.Engine) {
	api := r.Group("/api")

	api.POST("/login", controllers.Login)
	api.POST("/register", controllers.Register)

	patient := api.Group("/patients")
	patient.Use(middlewares.AuthMiddleware())

	patient.POST("/", middlewares.RequireRole("receptionist"), controllers.CreatePatient)
	patient.GET("/", controllers.GetAllPatients)
	patient.GET("/:id", controllers.GetPatientByID)
	patient.PUT("/:id", middlewares.RequireRole("doctor"), controllers.UpdatePatient)
	patient.DELETE("/:id", middlewares.RequireRole("receptionist"), controllers.DeletePatient)
}

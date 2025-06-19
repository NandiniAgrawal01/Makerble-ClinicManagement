package models

type LoginRequest struct {
	Username string `json:"username" example:"admin"`
	Password string `json:"password" example:"secret123"`
}

type LoginResponse struct {
	Token string `json:"token" example:"eyJhbGciOiJIUzI1NiIsIn..."`
}

type RegisterRequest struct {
	Username string `json:"username" example:"newuser"`
	Password string `json:"password" example:"password123"`
	Role     string `json:"role" example:"receptionist"`
}

type RegisterResponse struct {
	Message string `json:"message" example:"User created successfully"`
}

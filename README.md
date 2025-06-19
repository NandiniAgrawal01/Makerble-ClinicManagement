# Makerble-ClinicManagement
🏥 Clinic App
A simple clinic management app with login functionality for doctors and receptionists, built using:

🧠 Backend: Golang (Gin), GORM, JWT Auth, Swagger Docs

🎨 Frontend: React.js + MUI (Material UI)

🗃️ Database: PostgreSQL

📦 API Docs: Swagger (auto-generated)

📁 Project Structure
bash
Copy
Edit
task/
├── backend/           # Go-based REST API
│   ├── config/
│   ├── controllers/
│   ├── docs/          # Swagger docs (auto-generated)
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── .env
│   ├── go.mod
│   ├── main.go
│
├── frontend/          # React + MUI client
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   ├── .gitignore
│   ├── package.json
│   ├── vite.config.js
🚀 Getting Started
🧰 Prerequisites
Go 1.21+

Node.js 18+

PostgreSQL

Git

🖥️ Backend Setup (Go + Gin)
1. 🔧 Configuration
Create a .env file in backend/:

env
Copy
Edit
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=clinicapp
JWT_SECRET=your_jwt_secret
2. 📦 Install dependencies
bash
Copy
Edit
cd backend
go mod tidy
3. 🗃️ Migrate & seed (if needed)
Make sure PostgreSQL is running and create the database:

sql
Copy
Edit
CREATE DATABASE clinicapp;
The models will auto-migrate on server start.

4. ▶️ Run the backend
bash
Copy
Edit
go run main.go
The API will be running at http://localhost:8000.

📘 Swagger API Docs
🛠 Generate Swagger Docs
Install swag CLI:

bash
Copy
Edit
go install github.com/swaggo/swag/cmd/swag@latest
Then in the backend/ folder:

bash
Copy
Edit
swag init
It generates the docs/ folder. The Swagger UI will be available at:

bash
Copy
Edit
http://localhost:8000/swagger/index.html
🌐 Frontend Setup (React + Vite + MUI)
1. 📦 Install dependencies
bash
Copy
Edit
cd frontend
npm install
2. ▶️ Run the frontend
bash
Copy
Edit
npm run dev
App will be available at http://localhost:5173 by default.

👥 User Roles
Receptionist: Can view/add/delete patients.

Doctor: Can view patients and update medical notes.

✅ API Overview
POST /api/register – Register a new user

POST /api/login – Get JWT token

GET /api/patients – Get list of patients

POST /api/patients – Add patient (Receptionist)

PUT /api/patients/:id – Update notes (Doctor)

DELETE /api/patients/:id – Delete patient (Receptionist)

See full interactive docs at http://localhost:8000/swagger/index.html

📄 License
This project is for educational/demo purposes.

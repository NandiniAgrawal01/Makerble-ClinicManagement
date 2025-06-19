# 🏥 Clinic App

A simple clinic management app with login functionality for **doctors** and **receptionists**, built using:

- 🧠 **Backend**: Golang (Gin), GORM, JWT Auth, Swagger Docs  
- 🎨 **Frontend**: React.js + MUI (Material UI)  
- 🗃️ **Database**: PostgreSQL  
- 📦 **API Docs**: Swagger (auto-generated)

---

## 📁 Project Structure

```

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
│   ├── node\_modules/
│   ├── public/
│   ├── src/
│   ├── .gitignore
│   ├── package.json
│   ├── vite.config.js

```

---

## 🚀 Getting Started

### 🧰 Prerequisites

- Go 1.21+  
- Node.js 18+  
- PostgreSQL  
- Git

---

## 🖥️ Backend Setup (Go + Gin)

### 1. 🔧 Configuration

Create a `.env` file inside the `backend/` folder:

```

DB\_HOST=localhost
DB\_PORT=5432
DB\_USER=your\_db\_user
DB\_PASSWORD=your\_db\_password
DB\_NAME=clinicapp
JWT\_SECRET=your\_jwt\_secret

````

### 2. 📦 Install Go Dependencies

```bash
cd clinicapp
go mod tidy
````

### 3. 🗃️ Setup PostgreSQL

Ensure PostgreSQL is running and create a database:

```sql
CREATE DATABASE clinicapp;
```

The models will auto-migrate when the server starts.

### 4. ▶️ Run Backend

```bash
go run main.go
```

API will run at: `http://localhost:8000`

---

## 📘 Swagger API Docs

### 🛠 Generate Swagger Documentation

Install `swag` CLI (if not already):

```bash
go install github.com/swaggo/swag/cmd/swag@latest
```

Then inside the `clinicapp/` folder:

```bash
swag init
```

Swagger files will be generated in `clinicapp/docs/`.

### 📂 Access API Docs

Start your server and open:

```
http://localhost:8000/swagger/index.html
```

---

## 🌐 Frontend Setup (React + Vite + MUI)

### 1. 📦 Install Frontend Dependencies

```bash
cd frontend
npm install
```

### 2. ▶️ Start React App

```bash
npm run dev
```

Frontend will run at: `http://localhost:5173`

---

## 👥 User Roles

* **Receptionist**:

  * View, Add, and Delete patients.

* **Doctor**:

  * View patients and update their medical notes.

---

## ✅ API Endpoints Overview

| Method | Endpoint            | Description                      |
| ------ | ------------------- | -------------------------------- |
| POST   | `/api/register`     | Register a new user              |
| POST   | `/api/login`        | Login and get JWT token          |
| GET    | `/api/patients`     | Get all patients                 |
| POST   | `/api/patients`     | Add a new patient (Receptionist) |
| PUT    | `/api/patients/:id` | Update patient notes (Doctor)    |
| DELETE | `/api/patients/:id` | Delete a patient (Receptionist)  |

📌 View full docs: `http://localhost:8000/swagger/index.html`

---

## 🛡️ Auth & JWT

* JWT token is returned after login.
* Token must be sent in the `Authorization` header:

  ```
  Authorization: Bearer <your_token>
  ```

---

## 🧪 Testing

This project includes unit tests for backend functionality such as user authentication and patient management.

### ✅ Prerequisites

Before running the tests, ensure the following:

- Go is installed (v1.20+ recommended)
- A **PostgreSQL** instance is running
- A dedicated **test database** exists
- The `.env` file is correctly configured for testing

Example `.env` file:

DB_HOST=localhost
DB_PORT=5432
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=clinic_test_db
JWT_SECRET=your_jwt_secret

> ⚠️ Ensure the `clinic_test_db` exists in PostgreSQL. You can create it with:
> 
> ```sql
> CREATE DATABASE clinic_test_db;
> ```

---

### 📂 Test Files

| File Name                                | Purpose                                |
|------------------------------------------|----------------------------------------|
| `controllers/auth_controller_test.go`    | Tests login functionality with JWT     |
| `controllers/patient_controller_test.go` | Tests adding and fetching patients     |

---

### ▶️ Running Tests

To execute all backend test cases, run:
```bash
go test ./controllers/...
```
This command runs all test files within the controllers/ directory.

✅ Sample Output
If all tests pass, the output will look like:
```bash
ok  	clinicapp/controllers	0.524s
```
If a test fails, you will see which test failed along with an error message and the line number.

🛠 Notes
- It's recommended to use a dedicated test database to avoid corrupting production or development data.
- Make sure your test .env file matches the expected configuration and the DB_NAME refers to your test database.
- If needed, adjust the test files to avoid inserting duplicate entries (e.g. unique usernames).

---

## 📝 License

This project is for educational and demonstration purposes.

---

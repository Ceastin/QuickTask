# QuickTask
you can visit the website at this link:
### https://quick-task-azure.vercel.app/


> A production-grade personal task management application with MERN stack + dedicated Python analytics microservice.

## ✨ Overview

QuickTask helps users stay organized and gain deep insights into their productivity. 

This project demonstrates a production-ready, scalable architecture with strict separation of concerns, built as a technical assessment for LeadMasters AI.

**Key Features:**
* Secure user authentication & authorization (JWT + bcrypt)
* Full CRUD operations for tasks
* Advanced filtering, searching, and sorting
* Personalized dashboard with real-time statistics
* Beautiful charts for task distribution and completion trends
* Independent Python analytics microservice
* Fully responsive UI with dark mode support

---

## 🏗 Architecture

### Backend – Node.js + Express
* **MVC Pattern:**
  * **Models:** Mongoose schemas with validation, indexes & timestamps
  * **Controllers:** Pure business logic
  * **Middleware:** JWT auth, request validation, error handling, security, logging
* RESTful API with proper HTTP status codes
* Environment-based configuration

### Frontend – React + Vite
* Functional components & hooks
* Context API for global auth state
* Axios interceptors for JWT handling
* Tailwind CSS + reusable components
* Recharts for interactive visualizations

### Python Analytics Microservice – FastAPI
* Async-ready endpoints
* Direct MongoDB access via PyMongo
* Pydantic models for validation
* Analytics endpoints for stats & trends

---

## 🛠 Technology Stack

| Layer | Technology                                 |
|-------|--------------------------------------------|
| **Frontend** | React 18 + Vite + Tailwind CSS      |
| **Backend** | Node.js + Express + Mongoose         |
| **Analytics Service** | Python + FastAPI + PyMongo |
| **Database** | MongoDB                             |
| **Authentication** | JWT + bcrypt                  |
| **Charts** | Recharts                              |
| **Validation** | express-validator + Pydantic      |

---

## 🚀 Getting Started

### Prerequisites
* Node.js ≥ 18
* Python 3.11+
* MongoDB (local or Atlas)

### 1️⃣ Clone the repository

git clone [https://github.com/Ceastin/QuickTask.git](https://github.com/Ceastin/QuickTask.git)
cd QuickTask


cp backend/.env.example backend/.env

# Python Service
cp service/.env.example service/.env


### 2️⃣ Configure environment variables

# Backend
cp backend/.env.example backend/.env

# Python Service
cp service/.env.example service/.env

### 3️⃣ Run Backend

cd backend
npm install
npm run dev

### 4️⃣ Run Frontend

cd frontend
npm install
npm run dev
(Frontend will be available at http://localhost:5173)

### 5️⃣ Run Python Analytics Service

cd service
pip install -r requirements.txt
uvicorn main:app --reload --port 8000


###  📡 API Endpoints
Authentication (/api/v1/auth)
Method,Endpoint,Description
POST,/register,Register a new user
POST,/login,Login & receive JWT
GET,/me,Get current user (protected)





###  Tasks (/api/v1/tasks)
Method,Endpoint,Description
GET,/,Get all tasks (supports filters & sort)
POST,/,Create a new task
GET,/:id,Get single task
PUT,/:id,Update task
DELETE,/:id,Delete task


###  Analytics (Python Service – Port 8000)
Method,Endpoint,Description
GET,/analytics/stats,User productivity statistics
GET,/analytics/productivity?days=30,Task completion trends

###  📁 Project Structure
QuickTask/
├── backend/          # Node.js + Express API
├── frontend/         # React + Vite frontend
├── service/          # Python FastAPI analytics microservice
├── screenshots/      # Screenshots for README
├── .gitignore
└── README.md

###  📸 Screenshots

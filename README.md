# QuickTask

![QuickTask Banner](https://via.placeholder.com/1200x400/4F46E5/FFFFFF?text=QuickTask+-+Smart+Task+Management)

**A production-grade personal task management application with MERN stack + dedicated Python analytics microservice.**

[![Node.js](https://img.shields.io/badge/Node.js-18+-green)](https://nodejs.org)
[![React](https://img.shields.io/badge/React-18+-61DAFB)](https://react.dev)
[![Express](https://img.shields.io/badge/Express-4+-000000)](https://expressjs.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-7+-47A248)](https://mongodb.com)
[![Python](https://img.shields.io/badge/Python-3.11+-3776AB)](https://python.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115+-009688)](https://fastapi.tiangolo.com)

---

## ✨ Overview

**QuickTask** is a modern, full-featured task management platform that helps users stay organized and gain deep insights into their productivity.

Built as a technical assessment for **LeadMasters AI**, the application showcases clean, scalable, and production-ready architecture with strict separation of concerns.

### Core Features
- Secure user authentication & authorization (JWT)
- Full CRUD operations for tasks
- Advanced filtering, searching, and sorting
- Personalized dashboard with real-time statistics
- Beautiful charts for task distribution and completion trends
- Independent Python analytics microservice
- Fully responsive, modern UI with dark mode support

---

## 🏗 Production-Grade Architecture

### Backend (Node.js + Express)
- **Strict MVC Pattern**:
  - **Models** – Clean Mongoose schemas with validation, indexes & timestamps
  - **Controllers** – Pure business logic
  - **Middleware** – Reusable layers for:
    - JWT Authentication & Authorization
    - Request validation (`express-validator`)
    - Centralized error handling
    - Security (CORS, helmet, rate limiting)
    - Logging
- RESTful API design with consistent naming and proper status codes
- Environment-based configuration with validation

### Frontend (React)
- React 18 + Vite + functional components & hooks
- Axios interceptors for automatic token handling
- Context API for global auth state
- Tailwind CSS + reusable components
- Recharts for interactive visualizations

### Python Analytics Microservice
- FastAPI (high performance, async-ready)
- Direct MongoDB connection via PyMongo
- Clean Pydantic models and response schemas
- Two dedicated analytics endpoints

---

## 🛠 Technology Stack

| Layer              | Technology                        |
|--------------------|-----------------------------------|
| Frontend           | React 18 + Vite + Tailwind CSS    |
| Backend            | Node.js + Express + Mongoose      |
| Analytics Service  | Python + FastAPI + PyMongo        |
| Database           | MongoDB                           |
| Authentication     | JWT + bcrypt                      |
| Charts             | Recharts                          |
| Validation         | express-validator + Zod (Python)  |

---

## 🚀 Quick Start

### Prerequisites
- Node.js ≥ 18
- Python 3.11+
- MongoDB (local or MongoDB Atlas)

### 1. Clone the repository
```bash
git clone https://github.com/Ceastin/QuickTask.git
cd QuickTask

# Backend
cp backend/.env.example backend/.env

# Python Service
cp service/.env.example service/.env

### 1. Backend
cd backend
npm install
npm run dev


### 2. Frontend
cd frontend
npm install
npm run dev


### 3. Python Analytics Service
cd service
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
Frontend will be available at http://localhost:5173

📡 API Endpoints
Authentication (/api/auth)

POST /register → Register new user
POST /login → Login & receive JWT
GET /me → Get current user (protected)

Tasks (/api/tasks)

GET / → Get all tasks (supports ?status=, ?priority=, ?search=, ?sort=)
POST / → Create task
GET /:id → Get single task
PUT /:id → Update task
DELETE /:id → Delete task

Analytics (Python Service – Port 8000)

GET /analytics/stats → User productivity statistics
GET /analytics/productivity?days=30 → Task completion trends

📁 Project Structure

QuickTask/
├── backend/          # Node.js + Express API
├── frontend/         # React + Vite frontend
├── service/          # Python FastAPI analytics microservice
├── screenshots/      # Screenshots for README
├── .gitignore
└── README.md

📸 Screenshots
Dashboard
Tasks Page
Analytics
Mobile View

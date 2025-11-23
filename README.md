# Backend Services - API Gateway + Microservices

Microservices-based backend with API Gateway for unified access, JWT authentication, and role-based authorization.

---

## 🚀 Quick Start (2 Steps)

### **Step 1: Run Services Script**
```bash
cd "/Users/suraj/Documents/Office Internal Project/backend"
./services.sh
```

### **Step 2: Initialize & Start**
- Press **0** → Initialize Database (first time only)
- Press **1** → Start All Services

### **Step 3: Test Login**
- Import Postman: `Backend-API-Collection.postman_collection.json`
- Login: `POST http://localhost:9000/auth/login`
- Body: `{"username": "sumit", "password": "Sumit@123_+"}`

✅ **Done! You're ready to test all APIs**

---

## 📋 Demo Login Credentials

```
1. sumit / Sumit@123_+       → superadmin (full access)
2. support / Support@123_+   → admin (role-based access)
3. tanshi / Tanshi@123_+     → user (role-based access)
```

---

## 🏗️ Architecture

```
Frontend → API Gateway (9000) → General Service (3000)
                              → Finance Service (3002)
                              → MongoDB (27017)
```

**Services:**
- **API Gateway** - JWT Auth + Authorization + Request Routing
- **General Service** - Users, Roles, Products, Vendors, Customers, Quotations, Orders, POs, Pipelines
- **Finance Service** - Finance & Payment Management

---

## 📱 Services Management Menu

Run `./services.sh` to see:

```
0) Initialize Database (First Time Setup)
1) Start All Services (Development Mode)
2) Stop All Services (Development Mode)
3) Start with Docker Compose (Production)
4) Stop Docker Compose
5) View Docker Logs
6) Rebuild and Start Docker Services
7) Check Services Status
8) Exit
```

---

## 🔐 Authorization

**How it works:**
1. User logs in → Gets JWT token
2. Frontend sends: `Authorization: Bearer <token>`
3. API Gateway checks:
   - If `userType === "superadmin"` → ✅ Allow all
   - Else → Check if endpoint in `roleId.allowedEndPoints`

**User Types (case-sensitive):**
- `superadmin` - Full access
- `admin` - Role-based access
- `user` - Role-based access

---

## 📮 API Endpoints (70+)

**Import Postman Collection:** `Backend-API-Collection.postman_collection.json`

**Available Modules:**
- Authentication (1 endpoint)
- User Management (4 endpoints)
- Role Management (4 endpoints)
- Vendor Management (4 endpoints)
- Customer Management (4 endpoints)
- Product Management (4 endpoints)
- Quotation Management (4 endpoints)
- Order Management (4 endpoints)
- PO Management (4 endpoints)
- Pipeline Management (4 endpoints)
- Finance Management (7 endpoints)

**Base URL:** `http://localhost:9000`

---

## 🐳 Docker Production Deployment

```bash
./services.sh
# Press 3 - Start with Docker Compose
```

Or manually:
```bash
docker-compose up -d          # Start
docker-compose down           # Stop
docker-compose logs -f        # View logs
docker-compose up -d --build  # Rebuild & start
```

---

## 📁 Project Structure

```
backend/
├── api-gateway/              # Port 9000 - Auth + Routing
├── general-service/          # Port 3000 - Business Logic
├── finance-service/          # Port 3002 - Finance
├── services.sh               # Management Script
├── init-project.js           # DB Initialization
├── docker-compose.yml        # Production Config
├── package.json              # Dependencies
└── Backend-API-Collection.postman_collection.json
```

---

## 🛠️ Common Tasks

| Task | Command |
|------|---------|
| Initialize DB | `./services.sh` → `0` |
| Start Services | `./services.sh` → `1` |
| Stop Services | `./services.sh` → `2` |
| Check Status | `./services.sh` → `7` |
| View Logs | Check `/backend/logs/` |
| Start MongoDB | `brew services start mongodb-community` |

---

## ⚙️ Environment Configuration

### **Development (.env files)**
- `api-gateway/.env`
- `general-service/.env`
- `finance-service/.env`

### **Production (docker-compose.yml)**
- Update `JWT_SECRET` before deploying
- Update `MONGODB_URI` if using external DB

---

## 🔑 Important Notes

1. **MongoDB must be running** before initialization
2. **All lowercase:** userType, roleName (superadmin, admin, user)
3. **Ports:** 9000 (gateway), 3000 (general), 3002 (finance), 27017 (mongo)
4. **JWT Token:** Valid for 24 hours
5. **All requests** go through API Gateway at port 9000

---

## 🎯 Tech Stack

- **Framework:** NestJS 11
- **Language:** TypeScript
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT with Passport
- **API Gateway:** HTTP Proxy Middleware
- **Deployment:** Docker & Docker Compose

---

## 📞 Quick Reference

```bash
# First time setup
./services.sh → 0 (Initialize) → 1 (Start)

# Daily usage
./services.sh → 1 (Start) → 2 (Stop)

# Production
./services.sh → 3 (Docker Start) → 4 (Docker Stop)

# Debugging
./services.sh → 7 (Check Status)
```

---

## ✨ You're Ready!

1. Run `./services.sh`
2. Press `0` to initialize (first time)
3. Press `1` to start services
4. Import Postman collection
5. Test login with `sumit` / `Sumit@123_+`
6. Start building! 🚀

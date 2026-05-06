# MERN Authentication with RBAC 🔐

A full-stack implementation of a secure authentication system using the MERN stack. This repository features **JWT-based session management** (Access & Refresh tokens) and **Role-Based Access Control (RBAC)**.

## 🚀 Getting Started

### 1. Prerequisites
Make sure you have [Node.js](https://nodejs.org) and a [MongoDB](https://mongodb.com) instance ready.

### 2. Environment Setup
Create a `.env` file in the **server** directory:

**In `/server/.env`:**
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_access_token_secret_key
JWT_REFRESH_SECRET=your_refresh_token_secret_key
```

### 3. Installation
Clone the repository and install dependencies for both the frontend and backend:

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 4. Running the Application
This project is configured to run using `npm run dev`.

**Start the Backend:**
```bash
cd server
npm run dev
```

**Start the Frontend:**
```bash
cd client
npm run dev
```

---

## 🛠️ Implementation Details

### Security Flow
1. **Authentication:** User logs in; server generates Access & Refresh tokens.
2. **Authorization:** The `verifyJWT` middleware checks the token for every protected request.
3. **RBAC:** Secondary middleware restricts access to routes based on the user's role (e.g., Admin, User).

## 🔑 Key API Endpoints
- `POST /api/auth/register` - Create a new user.
- `POST /api/auth/login` - Authenticate and receive tokens.
- `GET /api/admin/data` - **Admin Only** access point.

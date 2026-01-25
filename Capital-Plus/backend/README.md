# Capital Plus Backend API

Node.js Express backend with Auth0 authentication and MongoDB integration.

## Features

- ✅ Auth0 JWT token validation
- ✅ Protected API routes
- ✅ MongoDB user management
- ✅ Automatic user creation on first login
- ✅ Error handling (401, 500, etc.)

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Set Up Environment Variables

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` and fill in your values:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/capital-plus

# Auth0 Configuration (from Auth0 Dashboard)
AUTH0_ISSUER_BASE_URL=https://your-tenant.auth0.com
AUTH0_AUDIENCE=https://api.capital-plus.com

# Server
PORT=3000
NODE_ENV=development
```

### 3. Get Auth0 Credentials

1. Go to [Auth0 Dashboard](https://manage.auth0.com/)
2. Create a new Application (Single Page Application)
3. Go to Settings and copy:
   - **Domain** → Use as `AUTH0_ISSUER_BASE_URL` (add `https://` prefix)
   - **API Identifier** → Use as `AUTH0_AUDIENCE`
4. Enable the API in Auth0:
   - Go to APIs → Create API
   - Set Identifier to your `AUTH0_AUDIENCE` value
   - Enable RS256 signing algorithm

### 4. Set Up MongoDB

**Option A: Local MongoDB**
```bash
# Install MongoDB locally, then:
MONGODB_URI=mongodb://localhost:27017/capital-plus
```

**Option B: MongoDB Atlas (Cloud)**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get connection string
4. Use in `.env`:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/capital-plus
```

### 5. Run the Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

Server will run on `http://localhost:3000`

## API Endpoints

### Health Check (No Auth Required)
```
GET /api/health
```

### User Sync (Protected - Requires Auth0 Token)
```
POST /api/user/sync
Headers: Authorization: Bearer <auth0_access_token>
```

**Response (New User):**
```json
{
  "message": "User created successfully",
  "user": {
    "id": "...",
    "auth0Id": "auth0|...",
    "email": "user@example.com",
    "name": "John Doe",
    "savingsGoals": [],
    "financialData": { ... },
    "budgets": { ... }
  }
}
```

**Response (Existing User):**
```json
{
  "message": "User profile retrieved",
  "user": { ... }
}
```

### Get Profile (Protected)
```
GET /api/user/profile
Headers: Authorization: Bearer <auth0_access_token>
```

## Error Responses

### 401 Unauthorized
```json
{
  "error": "Unauthorized",
  "message": "Invalid or missing authentication token"
}
```

### 500 Internal Server Error
```json
{
  "error": "Database Error",
  "message": "Failed to connect to database"
}
```

## Project Structure

```
backend/
├── server.js              # Main server file
├── middleware/
│   └── auth.js           # Auth0 JWT validation middleware
├── models/
│   └── User.js           # Mongoose User model
├── routes/
│   └── user.js           # User routes
├── .env                  # Environment variables (not in git)
├── .env.example          # Example env file
├── package.json          # Dependencies
└── README.md            # This file
```

## Testing with Postman/Thunder Client

1. Get Auth0 Access Token from your frontend login
2. Make request:
   - Method: `POST`
   - URL: `http://localhost:3000/api/user/sync`
   - Headers: 
     - `Authorization: Bearer <your_auth0_token>`
     - `Content-Type: application/json`

## Troubleshooting

**"MongoServerError: connect ECONNREFUSED"**
- Make sure MongoDB is running
- Check `MONGODB_URI` in `.env`

**"401 Unauthorized"**
- Check `AUTH0_ISSUER_BASE_URL` and `AUTH0_AUDIENCE` in `.env`
- Verify token is valid and not expired
- Check Auth0 API settings

**"User already exists" (409)**
- This is normal if user was created before
- Use GET `/api/user/profile` instead

## Next Steps

- Add more protected routes (transactions, budgets, etc.)
- Add request validation
- Add rate limiting
- Add logging (Winston, Morgan)
- Add unit tests

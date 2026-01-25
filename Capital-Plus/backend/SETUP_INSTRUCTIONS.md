# Quick Setup Instructions

Get your backend running so you can create accounts and login!

## Step 1: Install Dependencies

```bash
cd backend
npm install
```

This will install:
- express (web server)
- mongoose (MongoDB)
- bcryptjs (password hashing)
- jsonwebtoken (JWT tokens)
- cors (allow frontend requests)

## Step 2: Set Up MongoDB

**Option A: Local MongoDB**
1. Install MongoDB on your computer
2. Start MongoDB: `mongod`
3. Use in `.env`: `MONGODB_URI=mongodb://localhost:27017/capital-plus`

**Option B: MongoDB Atlas (Free Cloud)**
1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create free account
3. Create free cluster
4. Get connection string
5. Use in `.env`: `MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/capital-plus`

## Step 3: Create .env File

```bash
cd backend
cp .env.example .env
```

Edit `.env` and add:

```env
MONGODB_URI=mongodb://localhost:27017/capital-plus
JWT_SECRET=your-secret-key-here
PORT=3000
FRONTEND_URL=http://localhost:5173
```

**Important:** Change `JWT_SECRET` to a random string! You can generate one:
```bash
openssl rand -base64 32
```

## Step 4: Start the Backend

```bash
npm run dev
```

You should see:
```
✅ MongoDB connected successfully
🚀 Server running on port 3000
```

## Step 5: Test It

**Test Health Endpoint:**
```bash
curl http://localhost:3000/api/health
```

**Test Sign Up:**
```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'
```

**Test Login:**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

## Step 6: Start Frontend

In a new terminal:
```bash
cd ..  # Go back to project root
npm run dev
```

Now you can:
1. Go to http://localhost:5173
2. Click "Sign Up"
3. Create an account
4. Login with your credentials

## Troubleshooting

**"Failed to fetch" error:**
- Make sure backend is running: `npm run dev` in backend folder
- Check backend URL in `src/services/api.js` matches your backend port
- Check CORS settings in `backend/server.js`

**"MongoServerError":**
- Make sure MongoDB is running
- Check `MONGODB_URI` in `.env` is correct
- For Atlas: Make sure IP is whitelisted (use 0.0.0.0/0 for testing)

**"Cannot find module":**
- Run `npm install` in backend folder
- Make sure you're in the backend directory

**Port already in use:**
- Change `PORT` in `.env` to a different number (like 3001)
- Update `API_URL` in `src/services/api.js` to match

## API Endpoints

### Public (No Auth)
- `POST /api/auth/signup` - Create account
- `POST /api/auth/login` - Login

### Protected (Requires Token)
- `GET /api/user/profile` - Get user profile
- `POST /api/login-sync` - Auth0 sync (optional)

## That's It!

Your authentication system is now working. You can create accounts and login!

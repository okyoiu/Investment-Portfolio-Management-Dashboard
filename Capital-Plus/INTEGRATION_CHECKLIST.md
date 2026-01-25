# ✅ Auth0 Integration Checklist

## What I've Done

✅ **Updated `.env` file** with your actual Auth0 credentials:
- Domain: `dev-qf6vehdgcboq5pd2.us.auth0.com`
- Client ID: `z64XMFb4ZA0At5kdHT2je0bR8p76Pdch`

✅ **Created `backend/.env` file** with Auth0 configuration

✅ **Verified Auth0Provider** is set up in `src/main.jsx`

✅ **Verified Login/SignUp pages** use Auth0

✅ **Verified API service** handles Auth0 tokens

## What You Need to Do

### 1. ✅ Auth0 Application Configuration

Go to [Auth0 Dashboard](https://manage.auth0.com/dashboard/) → Applications → Your App → Settings:

**Required Settings:**
- ✅ **Allowed Callback URLs**: 
  ```
  http://localhost:5173, http://localhost:5173/*
  ```

- ✅ **Allowed Logout URLs**: 
  ```
  http://localhost:5173
  ```

- ✅ **Allowed Web Origins**: 
  ```
  http://localhost:5173
  ```

**Click "Save Changes" after updating!**

### 2. ✅ Create Auth0 API (If Not Done)

1. Go to **APIs** → **APIs** in Auth0 Dashboard
2. Click **Create API**
3. **Name**: `Capital Plus API`
4. **Identifier**: `https://api.capital-plus.com`
5. Click **Create**

**Note:** The identifier must match `AUTH0_AUDIENCE` in both frontend and backend `.env` files.

### 3. ✅ MongoDB Setup

**Option A: Local MongoDB**
```bash
# Install MongoDB locally, then:
# Make sure MongoDB is running
mongod
```

**Option B: MongoDB Atlas (Cloud - Recommended)**
1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create free account
3. Create cluster
4. Get connection string
5. Update `backend/.env`:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/capital-plus
   ```

### 4. ✅ Install Dependencies

**Frontend:**
```bash
cd /Users/cesarsanchez/Developer/Hackathon/Spring-2026/Capital-Plus
npm install
```

**Backend:**
```bash
cd backend
npm install
```

### 5. ✅ Start Backend Server

```bash
cd backend
npm run dev
```

**Expected output:**
```
✅ MongoDB connected successfully
🚀 Server running on port 3000
```

**If you see errors:**
- MongoDB not running → Start MongoDB or use Atlas
- Port 3000 in use → Change `PORT` in `backend/.env`

### 6. ✅ Start Frontend Server

In a **new terminal**:
```bash
cd /Users/cesarsanchez/Developer/Hackathon/Spring-2026/Capital-Plus
npm run dev
```

**Expected output:**
```
  VITE v7.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
```

### 7. ✅ Test the Integration

1. Open `http://localhost:5173`
2. Click **"Sign Up"** or **"Login"**
3. Click **"Sign Up with Auth0"** or **"Continue with Auth0"**
4. You should see Auth0 login page (not black page!)
5. Create account or log in
6. You should be redirected back to your app

## 🐛 Troubleshooting

### "Unknown host" or Black Page
- ✅ Check `.env` file has correct domain (not `your-tenant.auth0.com`)
- ✅ Restart dev server after changing `.env`
- ✅ Check Auth0 Dashboard → Applications → Settings → Allowed Callback URLs

### "Cannot connect to server"
- ✅ Make sure backend is running: `cd backend && npm run dev`
- ✅ Check backend is on port 3000
- ✅ Check `VITE_API_URL` in frontend `.env` matches backend port

### "Redirect URI mismatch"
- ✅ Go to Auth0 Dashboard → Applications → Your App → Settings
- ✅ Add `http://localhost:5173` and `http://localhost:5173/*` to Allowed Callback URLs
- ✅ Click Save Changes
- ✅ Restart frontend dev server

### "Invalid token" or 401 Errors
- ✅ Check `AUTH0_ISSUER_BASE_URL` in `backend/.env` matches your domain
- ✅ Check `AUTH0_AUDIENCE` matches the API identifier in Auth0
- ✅ Make sure you created the API in Auth0 Dashboard

### MongoDB Connection Error
- ✅ Check `MONGODB_URI` in `backend/.env`
- ✅ Make sure MongoDB is running (local) or connection string is correct (Atlas)
- ✅ Check network/firewall if using Atlas

## 📋 Quick Verification

Run these commands to verify setup:

```bash
# Check frontend .env
cat .env | grep VITE_AUTH0

# Check backend .env
cat backend/.env | grep AUTH0

# Should show:
# Frontend: dev-qf6vehdgcboq5pd2.us.auth0.com
# Backend: https://dev-qf6vehdgcboq5pd2.us.auth0.com
```

## 🎯 Current Configuration

**Frontend (.env):**
- Domain: `dev-qf6vehdgcboq5pd2.us.auth0.com`
- Client ID: `z64XMFb4ZA0At5kdHT2je0bR8p76Pdch`
- Audience: `https://api.capital-plus.com`

**Backend (.env):**
- Issuer: `https://dev-qf6vehdgcboq5pd2.us.auth0.com`
- Audience: `https://api.capital-plus.com`

**Both must match!**

## ✨ Next Steps After Setup

1. Test login/signup flow
2. Verify user data syncs to MongoDB
3. Test protected routes (Dashboard, Bank Manager)
4. Test logout functionality

---

**Everything is configured! Just follow the checklist above to get it running.** 🚀

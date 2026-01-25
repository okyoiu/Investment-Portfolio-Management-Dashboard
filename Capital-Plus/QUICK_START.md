# Quick Start Guide - Get Auth0 Working in 5 Minutes!

## Step 1: Install Dependencies

```bash
npm install
```

This installs `@auth0/auth0-react` for frontend authentication.

## Step 2: Set Up Auth0 (Free Account)

1. Go to [auth0.com](https://auth0.com) and sign up (free)
2. Create Application:
   - Applications → Create Application
   - Name: `Capital Plus`
   - Type: **Single Page Application**
   - Click Create

3. Create API:
   - APIs → Create API
   - Name: `Capital Plus API`
   - Identifier: `https://api.capital-plus.com`
   - Click Create

4. Copy these values:
   - **Domain**: `your-tenant.auth0.com`
   - **Client ID**: `abc123...`

## Step 3: Create Frontend .env File

In the project root (same folder as `package.json`):

```bash
cp .env.example .env
```

Edit `.env` and add:

```env
VITE_AUTH0_DOMAIN=your-tenant.auth0.com
VITE_AUTH0_CLIENT_ID=your-client-id-here
VITE_AUTH0_AUDIENCE=https://api.capital-plus.com
VITE_API_URL=http://localhost:3000/api
```

**Replace:**
- `your-tenant` → Your Auth0 domain
- `your-client-id-here` → Your Client ID

## Step 4: Configure Auth0 Application

In Auth0 Dashboard → Your App → Settings:

**Allowed Callback URLs:**
```
http://localhost:5173, http://localhost:5173/*
```

**Allowed Logout URLs:**
```
http://localhost:5173
```

**Allowed Web Origins:**
```
http://localhost:5173
```

Click **Save Changes**

## Step 5: Set Up Backend

```bash
cd backend
npm install
cp .env.example .env
```

Edit `backend/.env`:

```env
MONGODB_URI=mongodb://localhost:27017/capital-plus
AUTH0_ISSUER_BASE_URL=https://your-tenant.auth0.com
AUTH0_AUDIENCE=https://api.capital-plus.com
PORT=3000
```

## Step 6: Start Backend

```bash
cd backend
npm run dev
```

You should see:
```
✅ MongoDB connected successfully
🚀 Server running on port 3000
```

## Step 7: Start Frontend

In a new terminal:

```bash
npm run dev
```

## Step 8: Test It!

1. Go to `http://localhost:5173`
2. Click "Sign Up"
3. Click "Sign Up with Auth0"
4. Create account on Auth0
5. You'll be redirected back and logged in!

## Troubleshooting

**"Failed to fetch" error:**
- ✅ Make sure backend is running: `cd backend && npm run dev`
- ✅ Check backend is on port 3000
- ✅ Check `VITE_API_URL` in `.env` matches backend

**"Invalid configuration" error:**
- ✅ Check `.env` file exists in project root
- ✅ Check Auth0 values are correct
- ✅ Restart dev server after creating `.env`

**"Redirect URI mismatch":**
- ✅ Check Allowed Callback URLs in Auth0 Dashboard
- ✅ Must include: `http://localhost:5173` and `http://localhost:5173/*`

## That's It!

Your Auth0 authentication is now working! 🎉

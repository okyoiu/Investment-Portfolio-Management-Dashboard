# Auth0 Frontend Setup Guide

Complete guide to set up Auth0 authentication in your React frontend.

## Step 1: Install Auth0 React SDK

The package is already in `package.json`. Just install:

```bash
npm install
```

## Step 2: Get Auth0 Credentials

1. Go to [Auth0 Dashboard](https://manage.auth0.com/)
2. If you don't have an account, sign up (free)
3. Create a new Application:
   - Go to **Applications** → **Applications**
   - Click **Create Application**
   - Name: `Capital Plus Frontend`
   - Type: **Single Page Application**
   - Click **Create**

4. Copy these values from Settings:
   - **Domain**: `your-tenant.auth0.com`
   - **Client ID**: `abc123...`

5. Create an API (if not done already):
   - Go to **APIs** → **APIs**
   - Click **Create API**
   - Name: `Capital Plus API`
   - Identifier: `https://api.capital-plus.com`
   - Signing Algorithm: `RS256`
   - Click **Create**

## Step 3: Configure Frontend

Create a `.env` file in the project root (same level as `package.json`):

```bash
cp .env.example .env
```

Edit `.env` and add your Auth0 values:

```env
VITE_AUTH0_DOMAIN=your-tenant.auth0.com
VITE_AUTH0_CLIENT_ID=your-client-id-here
VITE_AUTH0_AUDIENCE=https://api.capital-plus.com
VITE_API_URL=http://localhost:3000/api
```

**Important:** Replace:
- `your-tenant` with your Auth0 domain
- `your-client-id-here` with your actual Client ID
- `https://api.capital-plus.com` with your API Identifier

## Step 4: Configure Auth0 Application Settings

In Auth0 Dashboard → Applications → Your App → Settings:

1. **Allowed Callback URLs:**
   ```
   http://localhost:5173, http://localhost:5173/*
   ```

2. **Allowed Logout URLs:**
   ```
   http://localhost:5173
   ```

3. **Allowed Web Origins:**
   ```
   http://localhost:5173
   ```

4. Click **Save Changes**

## Step 5: Configure Backend

Make sure your backend `.env` has:

```env
AUTH0_ISSUER_BASE_URL=https://your-tenant.auth0.com
AUTH0_AUDIENCE=https://api.capital-plus.com
```

## Step 6: Start Everything

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

## Step 7: Test It!

1. Go to `http://localhost:5173`
2. Click "Sign Up"
3. Click "Sign Up with Auth0"
4. You'll be redirected to Auth0 login page
5. Sign up with email/password or social login
6. You'll be redirected back and logged in!

## How It Works

1. User clicks "Sign Up with Auth0"
2. Redirected to Auth0 login page
3. User creates account or logs in
4. Auth0 redirects back with token
5. Frontend calls `/api/login-sync` with token
6. Backend creates user in MongoDB (if new) or returns profile
7. User is redirected to dashboard

## Troubleshooting

**"Failed to fetch" error:**
- Make sure backend is running: `cd backend && npm run dev`
- Check backend URL in `src/services/api.js`
- Check CORS settings in backend

**"Invalid configuration" error:**
- Check `.env` file has correct Auth0 values
- Make sure `.env` is in project root (not in `src/`)
- Restart dev server after changing `.env`

**"Redirect URI mismatch" error:**
- Check Allowed Callback URLs in Auth0 Dashboard
- Must include: `http://localhost:5173` and `http://localhost:5173/*`

**Auth0 login page doesn't show:**
- Check `VITE_AUTH0_DOMAIN` and `VITE_AUTH0_CLIENT_ID` in `.env`
- Make sure you restarted the dev server after creating `.env`

## That's It!

Your Auth0 authentication is now set up. Users can sign up and login securely!

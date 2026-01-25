# Auth0 Setup Guide

Complete guide to set up Auth0 for Capital Plus backend.

## Step 1: Create Auth0 Account

1. Go to [auth0.com](https://auth0.com)
2. Sign up for a free account
3. Select your region

## Step 2: Create an Application

1. In Auth0 Dashboard, go to **Applications** → **Applications**
2. Click **Create Application**
3. Name: `Capital Plus Frontend`
4. Type: **Single Page Application**
5. Click **Create**

## Step 3: Configure Application Settings

1. Go to **Settings** tab
2. Note these values:
   - **Domain**: `your-tenant.auth0.com`
   - **Client ID**: Copy this (needed for frontend)

3. Scroll to **Allowed Callback URLs**:
   ```
   http://localhost:5173, http://localhost:5173/*
   ```

4. Scroll to **Allowed Logout URLs**:
   ```
   http://localhost:5173
   ```

5. Scroll to **Allowed Web Origins**:
   ```
   http://localhost:5173
   ```

6. Click **Save Changes**

## Step 4: Create an API

1. Go to **APIs** → **APIs**
2. Click **Create API**
3. Fill in:
   - **Name**: `Capital Plus API`
   - **Identifier**: `https://api.capital-plus.com` (or any unique URL)
   - **Signing Algorithm**: `RS256`
4. Click **Create**

5. Go to **Settings** tab
6. Note the **Identifier** - this is your `AUTH0_AUDIENCE`

## Step 5: Configure Backend .env

In `backend/.env`:

```env
AUTH0_ISSUER_BASE_URL=https://your-tenant.auth0.com
AUTH0_AUDIENCE=https://api.capital-plus.com
```

Replace:
- `your-tenant` with your Auth0 domain
- `https://api.capital-plus.com` with the API Identifier from Step 4

## Step 6: Test the Setup

1. Start your backend: `npm run dev`
2. Test health endpoint: `GET http://localhost:3000/api/health`
3. Get Auth0 token from frontend login
4. Test sync endpoint: `POST http://localhost:3000/api/user/sync`

## Troubleshooting

**"Invalid audience" error:**
- Make sure `AUTH0_AUDIENCE` matches the API Identifier exactly
- Check for trailing slashes

**"Invalid issuer" error:**
- Make sure `AUTH0_ISSUER_BASE_URL` is exactly: `https://your-tenant.auth0.com`
- No trailing slash

**Token not working:**
- Make sure frontend requests token with correct audience
- Token must be requested for the API, not just the application

## Frontend Integration

In your React app, when logging in with Auth0:

```javascript
// Request token with API audience
const token = await getAccessTokenSilently({
  authorizationParams: {
    audience: 'https://api.capital-plus.com' // Your AUTH0_AUDIENCE
  }
});

// Use token in API calls
fetch('http://localhost:3000/api/user/sync', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
```

# Quick Fix: 401 Unauthorized Error

## The Problem
Your `.env` file has `AUTH0_CLIENT_SECRET=your-auth0-client-secret-here` which is a placeholder.

## Solution (2 minutes)

### Step 1: Get Your Auth0 Client Secret

1. **Go to Auth0 Dashboard:** https://manage.auth0.com/
2. **Click:** Applications → Your App
3. **Find app with Client ID:** `cDhkgh8yTZ9O2T8329idsj8YM5uB4F4B`
4. **Click:** Settings tab
5. **Scroll to:** "Client Secret" section
6. **Click:** "Show" or "Reveal" button
7. **Copy** the entire secret (long string)

### Step 2: Update backend/.env

Open `backend/.env` and change:
```
AUTH0_CLIENT_SECRET=your-auth0-client-secret-here
```

To:
```
AUTH0_CLIENT_SECRET=paste-your-actual-secret-from-auth0-here
```

**Important:**
- No quotes needed
- No spaces
- Copy the entire secret exactly

### Step 3: Restart Server

```bash
# Stop server (Ctrl+C)
cd backend
source venv/bin/activate
python3 manage.py runserver 0.0.0.0:3000
```

### Step 4: Try Again

Sign up/login should work now!

## Verify It's Set

Check your `.env` file:
```bash
cd backend
cat .env | grep AUTH0_CLIENT_SECRET
```

Should show your actual secret (not "your-auth0-client-secret-here")

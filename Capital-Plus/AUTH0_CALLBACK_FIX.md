# Fix Auth0 Callback URL Mismatch Error

## The Problem
Auth0 is rejecting the callback because `http://localhost:3000/api/auth/callback/` is not in the allowed callback URLs list.

## Quick Fix (5 minutes)

### Step 1: Go to Auth0 Dashboard
1. Open: https://manage.auth0.com/
2. Go to **Applications** → Find your app (Client ID: `cDhkgh8yTZ9O2T8329idsj8YM5uB4F4B`)
3. Click **Settings**

### Step 2: Add Callback URL
Scroll to **Allowed Callback URLs** and add:
```
http://localhost:3000/api/auth/callback/
http://localhost:3000/api/auth/callback
```

**Important:** Add BOTH with and without trailing slash!

### Step 3: Update Other URLs
While you're there, also set:

**Allowed Logout URLs:**
```
http://localhost:5173
http://localhost:5174
```

**Allowed Web Origins:**
```
http://localhost:3000
http://localhost:5173
http://localhost:5174
```

### Step 4: Save Changes
Click **Save Changes** at the bottom

### Step 5: Test Again
Go back to your app and click "Sign Up with Auth0" - it should work now!

## Why This Happened

Django generates the callback URL as: `http://localhost:3000/api/auth/callback/`
But Auth0 didn't have this URL whitelisted, so it rejected the request.

## Still Not Working?

If you're still getting errors:
1. Make sure Django server is running on port 3000
2. Check the exact URL in the error message
3. Add that exact URL (with exact port number) to Auth0

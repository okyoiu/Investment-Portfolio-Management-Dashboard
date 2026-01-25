# Fix Auth0 Callback URL Mismatch

## The Problem
Auth0 is rejecting the callback URL because it's not in the allowed list.

## Solution

### Step 1: Check What Callback URL Django is Using

The Django backend is generating: `http://localhost:3000/api/auth/callback/`

### Step 2: Add This to Auth0 Dashboard

1. Go to [Auth0 Dashboard](https://manage.auth0.com/)
2. Navigate to: **Applications** → **Your App** (the one with Client ID: `cDhkgh8yTZ9O2T8329idsj8YM5uB4F4B`)
3. Click on **Settings**
4. Scroll down to **Allowed Callback URLs**
5. Add this URL:
   ```
   http://localhost:3000/api/auth/callback/
   ```
6. Also add (without trailing slash, just in case):
   ```
   http://localhost:3000/api/auth/callback
   ```
7. Scroll down and click **Save Changes**

### Step 3: Also Update These Settings

While you're in Auth0 Settings, also make sure these are set:

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

**Allowed Origins (CORS):**
```
http://localhost:3000
http://localhost:5173
http://localhost:5174
```

### Step 4: Test Again

After saving, try clicking "Sign Up with Auth0" again. It should work now!

## Why This Happened

Django generates the callback URL as: `http://localhost:3000/api/auth/callback/`
But Auth0 didn't have this URL in its allowed list, so it rejected the request.

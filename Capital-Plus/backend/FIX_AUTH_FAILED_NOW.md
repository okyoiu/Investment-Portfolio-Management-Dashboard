# Fix: auth_failed Error - Step by Step

## The Problem
Your `.env` file has: `AUTH0_CLIENT_SECRET=your-auth0-client-secret-here`

This is a placeholder, not your actual secret. Auth0 is rejecting the request.

## Fix (5 minutes)

### Step 1: Get Your Auth0 Client Secret

1. **Open:** https://manage.auth0.com/
2. **Click:** Applications (left sidebar)
3. **Find:** Your app with Client ID `cDhkgh8yTZ9O2T8329idsj8YM5uB4F4B`
4. **Click:** Settings tab
5. **Scroll down** to "Client Secret" section
6. **Click:** "Show" or "Reveal" button
7. **Copy** the entire secret (it's a long string like: `LCuenYqihLZK8WX_nvykYKa8utI9StF5XxOCwH6ShLotTKySn7uZAwAgb6RnnCQz`)

### Step 2: Update backend/.env File

1. **Open:** `backend/.env` file
2. **Find this line:**
   ```
   AUTH0_CLIENT_SECRET=your-auth0-client-secret-here
   ```
3. **Replace with your actual secret:**
   ```
   AUTH0_CLIENT_SECRET=LCuenYqihLZK8WX_nvykYKa8utI9StF5XxOCwH6ShLotTKySn7uZAwAgb6RnnCQz
   ```
   (Use YOUR actual secret, not this example!)

**Important:**
- No quotes around the secret
- No spaces
- Copy the entire secret exactly

### Step 3: Restart Django Server

```bash
# Stop server (Ctrl+C in terminal where it's running)
cd backend
source venv/bin/activate
python3 manage.py runserver 0.0.0.0:3000
```

### Step 4: Verify

Check Django server logs - you should see:
```
✅ User authenticated: [your-email]
   Picture URL: [url]
```

## Check Your .env File

Run this to verify:
```bash
cd backend
cat .env | grep AUTH0_CLIENT_SECRET
```

Should show your actual secret (not "your-auth0-client-secret-here")

## Still Not Working?

Check Django server terminal for error messages. Look for:
- `❌ AUTH0_CLIENT_SECRET is not set`
- `❌ Token exchange failed`

These will tell you exactly what's wrong.

# Fix: 401 Unauthorized Error

## The Problem
Your `.env` file has `AUTH0_CLIENT_SECRET=your-auth0-client-secret-here` which is a placeholder, not your actual secret.

## Quick Fix

### Step 1: Get Your Auth0 Client Secret

1. Go to: https://manage.auth0.com/
2. Navigate to: **Applications** → Your App
3. Find the app with Client ID: `cDhkgh8yTZ9O2T8329idsj8YM5uB4F4B`
4. Click **Settings**
5. Scroll down to **Client Secret**
6. Click **Show** or **Reveal** to see the secret
7. **Copy the entire secret** (it's a long string)

### Step 2: Update .env File

Edit `backend/.env` and replace:
```
AUTH0_CLIENT_SECRET=your-auth0-client-secret-here
```

With your actual secret:
```
AUTH0_CLIENT_SECRET=paste-your-actual-secret-here
```

**Important:** 
- Don't add quotes around the secret
- Don't add spaces
- Copy the entire secret exactly as shown

### Step 3: Restart Django Server

```bash
# Stop server (Ctrl+C)
cd backend
source venv/bin/activate
python3 manage.py runserver 0.0.0.0:3000
```

### Step 4: Test Again

Try signing up/login again. It should work now!

## Example .env File

Your `.env` should look like this:
```env
DJANGO_SECRET_KEY=your-django-secret-key-here
AUTH0_DOMAIN=dev-qf6vehdgcboq5pd2.us.auth0.com
AUTH0_CLIENT_ID=cDhkgh8yTZ9O2T8329idsj8YM5uB4F4B
AUTH0_CLIENT_SECRET=LCuenYqihLZK8WX_nvykYKa8utI9StF5XxOCwH6ShLotTKySn7uZAwAgb6RnnCQz
FRONTEND_URL=http://localhost:5173
```

(Replace with your actual secrets!)

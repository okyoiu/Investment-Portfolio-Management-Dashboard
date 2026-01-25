# Fix: auth_failed Error

## The Problem
You're getting redirected to `/login?error=auth_failed` which means the Auth0 callback is failing.

## Common Causes & Fixes

### 1. Missing AUTH0_CLIENT_SECRET

**Check your `.env` file:**
```bash
cd backend
cat .env
```

Make sure it has:
```
AUTH0_CLIENT_SECRET=your-actual-client-secret-here
```

**Get it from Auth0:**
1. Go to Auth0 Dashboard
2. Applications → Your App (Client ID: `cDhkgh8yTZ9O2T8329idsj8YM5uB4F4B`)
3. Settings → Copy "Client Secret"
4. Add it to `backend/.env`

### 2. Callback URL Not Allowed

Make sure Auth0 has these callback URLs:
- `http://localhost:3000/api/auth/callback/`
- `http://localhost:3000/api/auth/callback`

### 3. Check Django Server Logs

When you try to sign up/login, check your Django server terminal for error messages. Look for:
- `❌ Auth0 callback error: ...`
- `❌ Token exchange failed: ...`
- `❌ Userinfo fetch failed: ...`

### 4. Restart Django Server

After updating `.env`, restart:
```bash
# Stop server (Ctrl+C)
python3 manage.py runserver 0.0.0.0:3000
```

## Debug Steps

1. **Check .env file:**
   ```bash
   cd backend
   cat .env | grep AUTH0
   ```

2. **Check Django logs:**
   Look at the terminal where Django is running for error messages

3. **Test callback URL:**
   Make sure `http://localhost:3000/api/auth/callback/` is in Auth0 allowed callbacks

4. **Verify Client Secret:**
   The Client Secret must match exactly what's in Auth0 Dashboard

## Still Not Working?

Check the Django server terminal output - it will show the exact error that's causing the failure.

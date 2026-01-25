# Fixed: HTTP 405 Error

## The Problem
You were getting "Method Not Allowed (GET)" errors because:
1. Two different `login` views were using the same URL path
2. The API login (POST) was being matched before Auth0 login (GET)

## What I Fixed

1. **Added GET method decorator** to Auth0 login view
2. **Reordered URL patterns** - authentication routes now come first
3. **Renamed email/password login** route to `/api/auth/login-email/` to avoid conflict

## Next Steps

**Restart your Django server:**
1. Stop the current server (Ctrl+C)
2. Start it again:
   ```bash
   python manage.py runserver 0.0.0.0:3000
   ```

**Test it:**
- Try accessing: `http://localhost:3000/api/auth/login`
- It should now redirect to Auth0 instead of giving 405 error

## URL Structure Now

- `/api/auth/login/` → Auth0 login (GET) ✅
- `/api/auth/login-email/` → Email/password login (POST)
- `/api/auth/callback/` → Auth0 callback (GET)
- `/api/auth/logout/` → Auth0 logout (GET)
- `/api/auth/user/` → Get current user (GET)

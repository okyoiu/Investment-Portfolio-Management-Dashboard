# How Login/Signup Works

## The Flow

### Sign Up Flow:
1. User clicks "Sign Up with Auth0" on `/signup` page
2. Frontend redirects to: `http://localhost:3000/api/auth/login?screen_hint=signup`
3. Django backend redirects to Auth0 with `screen_hint=signup` parameter
4. Auth0 shows signup form (because of screen_hint)
5. User creates account with Auth0
6. Auth0 redirects back to: `http://localhost:3000/api/auth/callback/`
7. Django backend:
   - Exchanges authorization code for access token
   - Fetches user info from Auth0
   - Stores user info in Django session
8. Django redirects to: `http://localhost:5173/dashboard`
9. Dashboard loads and Navbar checks `/api/auth/user` to get user info
10. User info is displayed in Navbar

### Login Flow:
1. User clicks "Log In with Auth0" on `/login` page
2. Frontend redirects to: `http://localhost:3000/api/auth/login`
3. Django backend redirects to Auth0 (no screen_hint, so shows login form)
4. User logs in with Auth0
5. Auth0 redirects back to: `http://localhost:3000/api/auth/callback/`
6. Django backend:
   - Exchanges authorization code for access token
   - Fetches user info from Auth0
   - Stores user info in Django session (same as signup)
7. Django redirects to: `http://localhost:5173/dashboard`
8. Dashboard loads and Navbar checks `/api/auth/user` to get user info
9. User info is displayed in Navbar

## Key Points

✅ **Both signup and login use the same Auth0 flow** - the only difference is `screen_hint=signup`  
✅ **User info is stored in Django session** after Auth0 authentication  
✅ **Frontend gets user info** by calling `/api/auth/user` endpoint  
✅ **Navbar automatically shows user info** when authenticated  
✅ **Dashboard can access user info** the same way  

## How Frontend Gets User Info

The Navbar component checks authentication on every page:

```javascript
// Check if user is authenticated
const response = await fetch(`${API_URL}/auth/user`, {
  credentials: 'include'  // Important: sends session cookie
});
const data = await response.json();

if (data.authenticated) {
  setUser(data.user);  // user.name, user.email, user.picture, etc.
}
```

## User Info Available

After signup/login, the user object contains:
- `user.email` - User's email address
- `user.name` - User's full name
- `user.picture` - Profile picture URL
- `user.sub` - Auth0 user ID
- Other Auth0 user attributes

This info is available throughout your app via the `/api/auth/user` endpoint!

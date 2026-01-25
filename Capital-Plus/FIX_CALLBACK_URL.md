# 🔧 Fix Callback URL Mismatch Error

## Quick Fix (2 Steps)

### Step 1: Go to Auth0 Dashboard

1. Go to [Auth0 Dashboard](https://manage.auth0.com/dashboard/)
2. Click **Applications** → **Applications**
3. Click on your application (the one with Client ID: `z64XMFb4ZA0At5kdHT2je0bR8p76Pdch`)
4. Go to **Settings** tab

### Step 2: Update Allowed Callback URLs

Scroll down to **Application URIs** section and set:

**Allowed Callback URLs:**
```
http://localhost:5173, http://localhost:5173/*
```

**Allowed Logout URLs:**
```
http://localhost:5173
```

**Allowed Web Origins:**
```
http://localhost:5173
```

**Important:** 
- Make sure there are NO trailing slashes
- Make sure you include BOTH `http://localhost:5173` AND `http://localhost:5173/*`
- Click **Save Changes** at the bottom

### Step 3: Restart Your Dev Server

After saving in Auth0:
1. Stop your frontend dev server (Ctrl+C)
2. Start it again: `npm run dev`
3. Try logging in again

## ✅ What Should Be Configured

Your Auth0 Application Settings should have:

```
Allowed Callback URLs:
http://localhost:5173, http://localhost:5173/*

Allowed Logout URLs:
http://localhost:5173

Allowed Web Origins:
http://localhost:5173
```

## 🐛 Still Not Working?

### Check Your Dev Server Port

If your frontend is running on a different port (not 5173):
1. Check what port Vite is using (look at terminal output)
2. Update Auth0 URLs to match that port
3. Example: If port is 5174, use `http://localhost:5174` everywhere

### Check for Typos

Common mistakes:
- ❌ `http://localhost:5173/` (trailing slash)
- ❌ `https://localhost:5173` (using https instead of http)
- ❌ `localhost:5173` (missing http://)
- ✅ `http://localhost:5173` (correct)

### Clear Browser Cache

Sometimes browsers cache old redirect URLs:
1. Open browser in Incognito/Private mode
2. Or clear browser cache and cookies
3. Try again

## 📋 Quick Checklist

- [ ] Auth0 Dashboard → Applications → Your App → Settings
- [ ] Allowed Callback URLs: `http://localhost:5173, http://localhost:5173/*`
- [ ] Allowed Logout URLs: `http://localhost:5173`
- [ ] Allowed Web Origins: `http://localhost:5173`
- [ ] Clicked "Save Changes"
- [ ] Restarted dev server
- [ ] Tried logging in again

---

**After fixing this, your Auth0 login should work!** 🎉

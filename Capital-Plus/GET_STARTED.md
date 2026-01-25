# 🚀 Get Started - Make Auth0 Work Now!

## Quick Fix (3 Steps)

### Step 1: Create API in Auth0 Dashboard

1. Go to [Auth0 Dashboard](https://manage.auth0.com/dashboard/)
2. Click **APIs** → **APIs** (left sidebar)
3. Click **Create API**
4. Fill in:
   - **Name**: `Capital Plus API`
   - **Identifier**: `https://api.capital-plus.com`
   - **Signing Algorithm**: `RS256`
5. Click **Create**

### Step 2: Configure Application URLs

1. In Auth0 Dashboard → **Applications** → Your App → **Settings**
2. Set these URLs:
   - **Allowed Callback URLs**: `http://localhost:5173, http://localhost:5173/*`
   - **Allowed Logout URLs**: `http://localhost:5173`
   - **Allowed Web Origins**: `http://localhost:5173`
3. Click **Save Changes**

### Step 3: Start Your Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm install
npm run dev
```

**Terminal 2 - Frontend:**
```bash
npm install  # When network is available
npm run dev
```

## ✅ What's Already Done

- ✅ `.env` files configured with your Auth0 credentials
- ✅ Auth0Provider set up in `main.jsx`
- ✅ Login/SignUp pages ready
- ✅ Dashboard is now accessible (no login required to view)
- ✅ Protected routes for Bank Manager

## 🎯 Test It

1. Open `http://localhost:5173`
2. You should see the Dashboard (no login required!)
3. Click "Sign Up" or "Login" to test Auth0
4. After login, you'll have full access

## 🐛 Troubleshooting

**"Unknown host" error:**
- ✅ Restart dev server after any `.env` changes
- ✅ Check `.env` has correct domain (not `your-tenant.auth0.com`)

**"Cannot connect to server":**
- ✅ Make sure backend is running: `cd backend && npm run dev`
- ✅ Check backend is on port 3000

**"Redirect URI mismatch":**
- ✅ Check Auth0 Dashboard → Applications → Settings
- ✅ Add `http://localhost:5173` and `http://localhost:5173/*` to Allowed Callback URLs

---

**Your website is now accessible! The Dashboard shows without login, and Auth0 works for protected features.**

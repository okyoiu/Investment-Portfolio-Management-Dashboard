# 🚀 Auth0 Quick Setup - Fix "Unknown host" Error

You're seeing "Unknown host: your-tenant.auth0.com" because you need to set up Auth0 and add your real credentials.

## Step-by-Step Setup (5 minutes)

### Step 1: Create Auth0 Account (Free)

1. Go to [https://auth0.com/signup](https://auth0.com/signup)
2. Sign up with email or Google
3. Choose a **tenant name** (e.g., `my-capital-plus`)
   - This becomes your domain: `my-capital-plus.auth0.com`

### Step 2: Create Application

1. In Auth0 Dashboard, click **Applications** → **Applications**
2. Click **Create Application**
3. **Name**: `Capital Plus`
4. **Type**: Select **Single Page Application**
5. Click **Create**

### Step 3: Get Your Credentials

1. Stay on the **Settings** tab of your new application
2. Scroll down and find:
   - **Domain**: Looks like `your-tenant.auth0.com` or `your-tenant.us.auth0.com`
   - **Client ID**: Long string like `abc123xyz789...`
3. **Copy both values** (you'll need them in Step 5)

### Step 4: Configure Application Settings

Still in the **Settings** tab, scroll to **Application URIs**:

1. **Allowed Callback URLs**: 
   ```
   http://localhost:5173, http://localhost:5173/*
   ```

2. **Allowed Logout URLs**:
   ```
   http://localhost:5173
   ```

3. **Allowed Web Origins**:
   ```
   http://localhost:5173
   ```

4. Click **Save Changes** at the bottom

### Step 5: Create API (Optional but Recommended)

1. Go to **APIs** → **APIs**
2. Click **Create API**
3. **Name**: `Capital Plus API`
4. **Identifier**: `https://api.capital-plus.com`
5. Click **Create**

### Step 6: Update Your .env File

Open `.env` in your project root and replace the placeholder values:

```env
# Replace "your-tenant.auth0.com" with your actual domain
VITE_AUTH0_DOMAIN=your-actual-tenant.auth0.com

# Replace "your-client-id-here" with your actual Client ID
VITE_AUTH0_CLIENT_ID=your-actual-client-id-here

# Keep this as is (or use your API identifier from Step 5)
VITE_AUTH0_AUDIENCE=https://api.capital-plus.com

# Backend API URL
VITE_API_URL=http://localhost:3000/api
```

**Example:**
```env
VITE_AUTH0_DOMAIN=my-capital-plus.us.auth0.com
VITE_AUTH0_CLIENT_ID=abc123xyz789def456ghi012jkl345mno
VITE_AUTH0_AUDIENCE=https://api.capital-plus.com
VITE_API_URL=http://localhost:3000/api
```

### Step 7: Restart Your Dev Server

1. Stop your current dev server (Ctrl+C)
2. Start it again:
   ```bash
   npm run dev
   ```

### Step 8: Test It!

1. Go to `http://localhost:5173`
2. Click "Sign Up with Auth0"
3. You should now see the Auth0 login page (not a black page!)

## ✅ What You Should See

- ✅ Auth0 login page (not black page)
- ✅ Option to sign up with email/password
- ✅ Option to sign up with Google (if enabled)
- ✅ After login, redirect back to your app

## 🐛 Still Having Issues?

### "Unknown host" still appears
- ✅ Make sure you saved the `.env` file
- ✅ Make sure you restarted the dev server
- ✅ Check that your domain doesn't have `your-tenant` in it

### "Redirect URI mismatch"
- ✅ Go to Auth0 Dashboard → Your App → Settings
- ✅ Add `http://localhost:5173` and `http://localhost:5173/*` to Allowed Callback URLs
- ✅ Click Save Changes

### Can't find Domain or Client ID
- ✅ Make sure you're in **Applications** → **Your App** → **Settings** tab
- ✅ Domain is near the top, Client ID is in the "Basic Information" section

## 📝 Quick Reference

**Where to find credentials:**
- Auth0 Dashboard → Applications → Your App → Settings

**What to update:**
- `.env` file in project root
- `VITE_AUTH0_DOMAIN` = Your Auth0 domain
- `VITE_AUTH0_CLIENT_ID` = Your Client ID

**After updating:**
- Always restart your dev server!

---

**Need help?** Check `AUTH0_INTEGRATION_COMPLETE.md` for more details.

# 🔑 Auth0 API Setup - Where to Put Your Identifier

## ⚠️ Important: Two Different Things

### 1. Management API (What you have)
- **Endpoint**: `https://dev-qf6vehdgcboq5pd2.us.auth0.com/api/v2/`
- **Purpose**: For managing Auth0 users, applications, etc. (admin tasks)
- **You DON'T need this** for basic authentication

### 2. Your Custom API (What you need)
- **Purpose**: For protecting YOUR backend API routes
- **You MUST create this** in Auth0 Dashboard

## ✅ What You Need to Do

### Step 1: Create Your Own API in Auth0

1. Go to [Auth0 Dashboard](https://manage.auth0.com/dashboard/)
2. Click **APIs** → **APIs** (in left sidebar)
3. Click **Create API**
4. Fill in:
   - **Name**: `Capital Plus API`
   - **Identifier**: `https://api.capital-plus.com` (or any unique URL)
   - **Signing Algorithm**: `RS256`
5. Click **Create**

### Step 2: Copy the Identifier

After creating the API:
- Go to **Settings** tab
- Find **Identifier** field
- Copy it (e.g., `https://api.capital-plus.com`)

**This is what you'll use as `AUTH0_AUDIENCE`**

### Step 3: Update Your .env Files

**Frontend `.env`** (project root):
```env
VITE_AUTH0_DOMAIN=dev-qf6vehdgcboq5pd2.us.auth0.com
VITE_AUTH0_CLIENT_ID=z64XMFb4ZA0At5kdHT2je0bR8p76Pdch
VITE_AUTH0_AUDIENCE=https://api.capital-plus.com  # ← Use the Identifier from Step 2
VITE_API_URL=http://localhost:3000/api
```

**Backend `.env`** (backend folder):
```env
AUTH0_ISSUER_BASE_URL=https://dev-qf6vehdgcboq5pd2.us.auth0.com
AUTH0_AUDIENCE=https://api.capital-plus.com  # ← Must match frontend
MONGODB_URI=mongodb://localhost:27017/capital-plus
PORT=3000
FRONTEND_URL=http://localhost:5173
```

## 📍 Where Each Value Goes

| Value | Frontend `.env` | Backend `.env` | Auth0 Dashboard Location |
|-------|----------------|---------------|-------------------------|
| **Domain** | `VITE_AUTH0_DOMAIN` | `AUTH0_ISSUER_BASE_URL` | Applications → Your App → Settings → Domain |
| **Client ID** | `VITE_AUTH0_CLIENT_ID` | (not needed) | Applications → Your App → Settings → Client ID |
| **API Identifier** | `VITE_AUTH0_AUDIENCE` | `AUTH0_AUDIENCE` | APIs → Your API → Settings → Identifier |

## 🚫 What About `/api/v2/`?

**You DON'T need to use `/api/v2/`** for authentication!

The `/api/v2/` endpoint is the **Management API** which is used for:
- Managing users programmatically
- Updating user profiles
- Admin operations

**For your app's authentication, you only need:**
- Domain: `dev-qf6vehdgcboq5pd2.us.auth0.com`
- Client ID: `z64XMFb4ZA0At5kdHT2je0bR8p76Pdch`
- API Identifier: `https://api.capital-plus.com` (create this in Auth0)

## ✅ Quick Checklist

- [ ] Create API in Auth0 Dashboard (APIs → Create API)
- [ ] Copy the Identifier (e.g., `https://api.capital-plus.com`)
- [ ] Update `VITE_AUTH0_AUDIENCE` in frontend `.env`
- [ ] Update `AUTH0_AUDIENCE` in backend `.env`
- [ ] Make sure both match exactly!
- [ ] Restart both servers

## 🎯 Current Configuration

Your current setup should be:

**Frontend `.env`:**
```env
VITE_AUTH0_DOMAIN=dev-qf6vehdgcboq5pd2.us.auth0.com
VITE_AUTH0_CLIENT_ID=z64XMFb4ZA0At5kdHT2je0bR8p76Pdch
VITE_AUTH0_AUDIENCE=https://api.capital-plus.com  # ← Create this in Auth0 first!
```

**Backend `.env`:**
```env
AUTH0_ISSUER_BASE_URL=https://dev-qf6vehdgcboq5pd2.us.auth0.com
AUTH0_AUDIENCE=https://api.capital-plus.com  # ← Must match frontend!
```

## ❓ Still Confused?

**Simple answer:**
1. Go to Auth0 Dashboard → APIs → Create API
2. Set Identifier to: `https://api.capital-plus.com`
3. Use that identifier in both `.env` files as `AUTH0_AUDIENCE`
4. **Don't use `/api/v2/`** - that's for something else!

---

**The `/api/v2/` endpoint is NOT needed for your authentication setup!**

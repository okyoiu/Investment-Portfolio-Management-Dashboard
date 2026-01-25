# Quick Start Guide

Get your backend running in 5 minutes!

## Step 1: Install Dependencies

```bash
cd backend
npm install
```

## Step 2: Set Up Environment Variables

```bash
cp .env.example .env
```

Edit `.env` and add:

```env
MONGODB_URI=mongodb://localhost:27017/capital-plus
AUTH0_ISSUER_BASE_URL=https://your-tenant.auth0.com
AUTH0_AUDIENCE=https://api.capital-plus.com
PORT=3000
```

## Step 3: Get Auth0 Credentials

1. Sign up at [auth0.com](https://auth0.com) (free)
2. Create Application → Single Page Application
3. Create API → Set Identifier (this is your `AUTH0_AUDIENCE`)
4. Copy Domain → Use as `AUTH0_ISSUER_BASE_URL`

See `AUTH0_SETUP.md` for detailed instructions.

## Step 4: Start MongoDB

**Local MongoDB:**
```bash
# Make sure MongoDB is running
mongod
```

**Or use MongoDB Atlas (cloud):**
- Sign up at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
- Create free cluster
- Get connection string
- Use in `.env` as `MONGODB_URI`

## Step 5: Run the Server

```bash
npm run dev
```

You should see:
```
✅ MongoDB connected successfully
🚀 Server running on port 3000
```

## Step 6: Test It

**Health Check:**
```bash
curl http://localhost:3000/api/health
```

**Test User Sync (requires Auth0 token):**
```bash
curl -X POST http://localhost:3000/api/user/sync \
  -H "Authorization: Bearer YOUR_AUTH0_TOKEN" \
  -H "Content-Type: application/json"
```

## Troubleshooting

**"Cannot find module"**
→ Run `npm install` again

**"MongoServerError"**
→ Check MongoDB is running or Atlas connection string

**"401 Unauthorized"**
→ Check Auth0 credentials in `.env`

**"Port already in use"**
→ Change `PORT` in `.env` or kill process on port 3000

## Next Steps

- Integrate with frontend
- Add more protected routes
- Set up production deployment

See `README.md` for full documentation.

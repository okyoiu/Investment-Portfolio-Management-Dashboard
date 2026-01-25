# Quick Fix: Connection Refused Error

## The Problem
You're seeing `ERR_CONNECTION_REFUSED` because the Django backend server isn't running on port 3000.

## Solution (Choose One)

### Option 1: Use the Setup Script (Easiest)
```bash
cd backend
./setup_and_run.sh
```

### Option 2: Manual Setup

1. **Go to backend folder:**
   ```bash
   cd backend
   ```

2. **Create and activate virtual environment:**
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install Python packages:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up database:**
   ```bash
   python3 manage.py makemigrations
   python3 manage.py migrate
   ```

5. **Add Auth0 Client Secret to .env:**
   - Open `.env` file
   - Replace `YOUR_AUTH0_CLIENT_SECRET_HERE` with your actual secret
   - Get it from: Auth0 Dashboard → Applications → Your App → Settings → Client Secret

6. **Start the server:**
   ```bash
   python3 manage.py runserver 0.0.0.0:3000
   ```

You should see:
```
Starting development server at http://0.0.0.0:3000/
Quit the server with CONTROL-C.
```

## Verify It's Working

Once the server is running, test it:
- Open: `http://localhost:3000/api/health/`
- You should see: `{"status": "ok", "message": "Capital Plus API is running", ...}`

## Common Issues

**"ModuleNotFoundError: No module named 'django'"**
- Make sure virtual environment is activated: `source venv/bin/activate`
- Install dependencies: `pip install -r requirements.txt`

**"Port 3000 already in use"**
- Another process is using port 3000
- Kill it or use a different port: `python manage.py runserver 0.0.0.0:8000`
- Then update frontend `.env`: `VITE_API_URL=http://localhost:8000/api`

**"AUTH0_CLIENT_SECRET not set"**
- Edit `.env` file in backend folder
- Add your Auth0 Client Secret

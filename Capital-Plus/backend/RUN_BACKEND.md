# How to Run the Python Backend

## Quick Start

```bash
cd backend
python3 manage.py runserver 0.0.0.0:3000
```

## First Time Setup

If you haven't set up the backend yet:

```bash
# 1. Navigate to backend folder
cd backend

# 2. Create virtual environment (first time only)
python3 -m venv venv

# 3. Activate virtual environment
source venv/bin/activate
# On Windows: venv\Scripts\activate

# 4. Install dependencies (first time only)
pip install -r requirements.txt

# 5. Set up database (first time only)
python3 manage.py makemigrations
python3 manage.py migrate

# 6. Set up .env file (if not done)
cp .env.example .env
# Edit .env and add your AUTH0_CLIENT_SECRET

# 7. Start the server
python3 manage.py runserver 0.0.0.0:3000
```

## Daily Use (After Setup)

```bash
cd backend
source venv/bin/activate  # Activate virtual environment
python3 manage.py runserver 0.0.0.0:3000
```

## Important Notes

- **Use `python3` not `python`** (on macOS)
- **Server runs on port 3000** - `http://localhost:3000`
- **Keep terminal open** - server runs until you stop it (Ctrl+C)
- **Activate venv first** - Make sure virtual environment is activated

## Check if Server is Running

Open: `http://localhost:3000/api/health/`

You should see:
```json
{"status": "ok", "message": "Capital Plus API is running", ...}
```

## Stop Server

Press `Ctrl+C` in the terminal where server is running

## Troubleshooting

**"python3: command not found"**
- Install Python 3: `brew install python3` (macOS)

**"No module named 'django'"**
- Activate virtual environment: `source venv/bin/activate`
- Install dependencies: `pip install -r requirements.txt`

**"Port 3000 already in use"**
- Kill process using port 3000, or
- Use different port: `python3 manage.py runserver 0.0.0.0:8000`

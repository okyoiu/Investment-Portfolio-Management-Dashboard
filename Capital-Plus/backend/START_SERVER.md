# Start Server - Quick Guide

## The Issue
On macOS, Python 3 is typically `python3`, not `python`.

## Quick Start

**Option 1: Use python3 directly**
```bash
cd backend
python3 manage.py runserver 0.0.0.0:3000
```

**Option 2: Use virtual environment (Recommended)**
```bash
cd backend

# Create virtual environment (first time only)
python3 -m venv venv

# Activate it
source venv/bin/activate

# Install dependencies (first time only)
pip install -r requirements.txt

# Run migrations (first time only)
python3 manage.py makemigrations
python3 manage.py migrate

# Start server
python3 manage.py runserver 0.0.0.0:3000
```

**Option 3: Use the setup script**
```bash
cd backend
./setup_and_run.sh
```

## After Starting

You should see:
```
Starting development server at http://0.0.0.0:3000/
Quit the server with CONTROL-C.
```

Then test: `http://localhost:3000/api/health/`

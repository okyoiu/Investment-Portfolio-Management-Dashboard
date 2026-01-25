# Start Django Backend - Step by Step

## The Error You're Seeing
```
ModuleNotFoundError: No module named 'django'
```

This means Django isn't installed. You need to set up a virtual environment first.

## Fix (Copy & Paste These Commands)

```bash
# 1. Go to backend folder
cd backend

# 2. Create virtual environment (first time only)
python3 -m venv venv

# 3. Activate virtual environment (DO THIS EVERY TIME)
source venv/bin/activate

# 4. Install dependencies (first time only)
pip install -r requirements.txt

# 5. Run migrations (first time only)
python3 manage.py makemigrations
python3 manage.py migrate

# 6. Start server
python3 manage.py runserver 0.0.0.0:3000
```

## Important Notes

✅ **Always activate venv first:** `source venv/bin/activate`  
✅ **Use `python3` not `python`**  
✅ **Use `pip` (not `pip3`) after activating venv**  
✅ **Keep terminal open** - server runs until Ctrl+C  

## After Setup, Daily Use:

```bash
cd backend
source venv/bin/activate
python3 manage.py runserver 0.0.0.0:3000
```

## Check if Virtual Environment is Active

You should see `(venv)` at the start of your terminal prompt:
```
(venv) ➜  backend git:(main) ✗
```

If you don't see `(venv)`, run: `source venv/bin/activate`

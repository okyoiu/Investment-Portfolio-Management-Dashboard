# Capital Plus Backend

Python/Django backend for Capital Plus with Auth0 authentication.

## Features

- ✅ Auth0 authentication (matching Python capitalPlusPlus implementation)
- ✅ User management with email/password and Auth0
- ✅ RESTful API endpoints
- ✅ CORS enabled for React frontend
- ✅ Session-based authentication

## Setup

1. **Create virtual environment:**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env and add your Auth0 Client Secret
   ```

4. **Run migrations:**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

5. **Create superuser (optional):**
   ```bash
   python manage.py createsuperuser
   ```

6. **Run development server:**
   ```bash
   python manage.py runserver 0.0.0.0:3000
   ```

## API Endpoints

### Authentication (Auth0)
- `GET /api/auth/login/` - Redirects to Auth0 login
- `GET /api/auth/callback/` - Auth0 OAuth callback
- `GET /api/auth/logout/` - Logs out user
- `GET /api/auth/user/` - Get current authenticated user

### API
- `GET /api/health/` - Health check
- `POST /api/auth/signup/` - Email/password signup
- `POST /api/auth/login/` - Email/password login
- `GET /api/user/profile/` - Get user profile (requires JWT)

## Configuration

Make sure your Auth0 application has these settings:
- **Allowed Callback URLs:** `http://localhost:3000/api/auth/callback/`
- **Allowed Logout URLs:** `http://localhost:5173`
- **Allowed Web Origins:** `http://localhost:3000`

## Notes

- Uses SQLite by default (can switch to PostgreSQL)
- Session-based authentication for Auth0
- JWT tokens for email/password authentication
- CORS configured for React frontend on port 5173

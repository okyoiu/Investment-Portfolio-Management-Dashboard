#!/bin/bash

# Capital Plus Backend Setup and Run Script

echo "🚀 Setting up Capital Plus Backend..."

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "📦 Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
echo "🔌 Activating virtual environment..."
source venv/bin/activate

# Install dependencies
echo "📥 Installing dependencies..."
pip install -r requirements.txt

# Check if .env exists and has AUTH0_CLIENT_SECRET
if ! grep -q "AUTH0_CLIENT_SECRET=YOUR_AUTH0_CLIENT_SECRET_HERE" .env 2>/dev/null; then
    echo "✅ .env file looks good"
else
    echo "⚠️  WARNING: Please add your AUTH0_CLIENT_SECRET to .env file"
    echo "   Get it from: Auth0 Dashboard → Applications → Your App → Settings"
fi

# Run migrations
echo "🗄️  Running database migrations..."
python3 manage.py makemigrations
python3 manage.py migrate

# Start server
echo "🌐 Starting Django server on port 3000..."
echo "   Access it at: http://localhost:3000"
echo ""
python3 manage.py runserver 0.0.0.0:3000

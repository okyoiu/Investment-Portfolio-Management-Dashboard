#!/bin/bash

# Quick script to start Django server
# Usage: ./START_SERVER.sh

cd "$(dirname "$0")"

# Activate virtual environment
source venv/bin/activate

# Run migrations (in case database changed)
python3 manage.py migrate

# Start server
echo "🚀 Starting Django server on http://localhost:3000"
echo "   Press Ctrl+C to stop"
echo ""
python3 manage.py runserver 0.0.0.0:3000

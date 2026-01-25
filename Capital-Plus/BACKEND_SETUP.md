# Backend Setup Guide

This guide explains what your backend needs to implement to work with the frontend.

## Backend Requirements

Your backend should have these API endpoints:

### 1. Sign Up Endpoint
- **URL**: `POST /api/auth/signup`
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Success Response** (200):
  ```json
  {
    "message": "User created successfully",
    "user": {
      "id": "123",
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
  ```
- **Error Response** (400/409):
  ```json
  {
    "message": "Email already exists"
  }
  ```

### 2. Login Endpoint
- **URL**: `POST /api/auth/login`
- **Request Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Success Response** (200):
  ```json
  {
    "message": "Login successful",
    "token": "jwt_token_here",
    "user": {
      "id": "123",
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
  ```
- **Error Response** (401):
  ```json
  {
    "message": "Invalid email or password"
  }
  ```

## Backend URL Configuration

1. Open `src/services/api.js`
2. Change the `API_URL` constant to match your backend:
   ```javascript
   const API_URL = 'http://localhost:3000/api'; // For local development
   // OR
   const API_URL = 'https://your-backend-domain.com/api'; // For production
   ```

## Example Backend Implementations

### Node.js/Express Example

```javascript
// Backend route example
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already exists' });
    }
    
    // Hash password (use bcrypt)
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });
    
    res.status(200).json({
      message: 'User created successfully',
      user: { id: user.id, name: user.name, email: user.email }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    
    // Check password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    
    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, 'your-secret-key');
    
    res.status(200).json({
      message: 'Login successful',
      token,
      user: { id: user.id, name: user.name, email: user.email }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});
```

### Python/Flask Example

```python
from flask import Flask, request, jsonify
import bcrypt
import jwt

@app.route('/api/auth/signup', methods=['POST'])
def signup():
    data = request.json
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')
    
    # Check if user exists
    if User.query.filter_by(email=email).first():
        return jsonify({'message': 'Email already exists'}), 409
    
    # Hash password
    hashed = bcrypt.hashpw(password.encode(), bcrypt.gensalt())
    
    # Create user
    user = User(name=name, email=email, password=hashed)
    db.session.add(user)
    db.session.commit()
    
    return jsonify({
        'message': 'User created successfully',
        'user': {'id': user.id, 'name': user.name, 'email': user.email}
    }), 200

@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    
    user = User.query.filter_by(email=email).first()
    if not user or not bcrypt.checkpw(password.encode(), user.password):
        return jsonify({'message': 'Invalid email or password'}), 401
    
    token = jwt.encode({'userId': user.id}, 'your-secret-key')
    
    return jsonify({
        'message': 'Login successful',
        'token': token,
        'user': {'id': user.id, 'name': user.name, 'email': user.email}
    }), 200
```

## CORS Setup

Make sure your backend allows requests from your frontend:

### Node.js/Express
```javascript
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:5173', // Your Vite dev server URL
  credentials: true
}));
```

### Python/Flask
```python
from flask_cors import CORS
CORS(app, origins=['http://localhost:5173'])
```

## Testing

1. Start your backend server
2. Start your frontend: `npm run dev`
3. Try signing up a new user
4. Try logging in with that user

## Security Notes

- Always hash passwords (use bcrypt, argon2, etc.)
- Use HTTPS in production
- Validate and sanitize all inputs
- Use JWT tokens for authentication
- Set proper CORS policies

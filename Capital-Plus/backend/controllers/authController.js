// ============================================
// AUTH CONTROLLER
// ============================================
// Handles authentication and user sync logic
// - Email/Password signup and login
// - Auth0 JWT validation and sync
// - Find or Create pattern
// - Returns user data with financial information
// ============================================

import User from '../models/User.js';
import jwt from 'jsonwebtoken';

// Secret key for JWT tokens (in production, use environment variable)
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// ============================================
// EMAIL/PASSWORD SIGNUP
// ============================================
// Creates a new user account with email and password
// ============================================

export const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Email and password are required'
      });
    }

    // Check if user already exists
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(409).json({
        error: 'Conflict',
        message: 'User with this email already exists'
      });
    }

    // Create new user
    const user = await User.create({
      email,
      name: name || null,
      password, // Will be hashed by pre-save hook
      accountCreated: new Date(),
      savingsGoals: []
    });

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    console.log(`✅ New user created: ${user.email}`);

    return res.status(201).json({
      success: true,
      message: 'Account created successfully',
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        accountCreated: user.accountCreated,
        savingsGoals: user.savingsGoals
      }
    });

  } catch (error) {
    console.error('❌ Error in signUp controller:', error);

    if (error.code === 11000) {
      return res.status(409).json({
        error: 'Conflict',
        message: 'User with this email already exists'
      });
    }

    if (error.name === 'ValidationError') {
      return res.status(400).json({
        error: 'Validation Error',
        message: error.message
      });
    }

    return res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to create account. Please try again.'
    });
  }
};

// ============================================
// EMAIL/PASSWORD LOGIN
// ============================================
// Authenticates user with email and password
// ============================================

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Email and password are required'
      });
    }

    // Find user by email (include password field)
    const user = await User.findByEmail(email).select('+password');

    if (!user) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Invalid email or password'
      });
    }

    // Check if user has a password (might be Auth0-only user)
    if (!user.password) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Please use Auth0 to sign in with this account'
      });
    }

    // Compare password
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Invalid email or password'
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    console.log(`✅ User logged in: ${user.email}`);

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        accountCreated: user.accountCreated,
        savingsGoals: user.savingsGoals
      }
    });

  } catch (error) {
    console.error('❌ Error in login controller:', error);

    return res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to login. Please try again.'
    });
  }
};

// ============================================
// LOGIN/SYNC (Auth0)
// ============================================
// This controller is called when user logs in with Auth0
// - Validates Auth0 JWT (done by middleware)
// - Extracts sub, email, name from JWT
// - Finds or creates user in database
// - Returns user object with financial data
// ============================================

export const loginSync = async (req, res) => {
  try {
    // Extract user info from validated JWT
    const { sub, email, name } = req.auth.payload;

    // Validate required fields
    if (!sub) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'User ID (sub) not found in token'
      });
    }

    if (!email) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Email not found in token'
      });
    }

    // Find or Create pattern
    const user = await User.findOrCreate({
      auth0Id: sub,
      email: email,
      name: name || null
    });

    return res.status(200).json({
      success: true,
      message: user.accountCreated.getTime() === user.updatedAt.getTime() 
        ? 'New user created successfully' 
        : 'User profile retrieved',
      user: {
        id: user._id,
        auth0Id: user.auth0Id,
        email: user.email,
        name: user.name,
        accountCreated: user.accountCreated,
        savingsGoals: user.savingsGoals,
        updatedAt: user.updatedAt
      }
    });

  } catch (error) {
    console.error('❌ Error in loginSync controller:', error);

    if (error.code === 11000) {
      return res.status(409).json({
        error: 'Conflict',
        message: 'User already exists with this Auth0 ID'
      });
    }

    if (error.name === 'ValidationError') {
      return res.status(400).json({
        error: 'Validation Error',
        message: error.message
      });
    }

    if (error.name === 'MongoServerError' || error.name === 'MongooseError') {
      return res.status(500).json({
        error: 'Database Error',
        message: 'Failed to connect to database. Please try again later.'
      });
    }

    return res.status(500).json({
      error: 'Internal Server Error',
      message: 'An unexpected error occurred while processing your request'
    });
  }
};

// ============================================
// GET USER PROFILE
// ============================================
// Returns current authenticated user's profile
// Works with JWT tokens (email/password authentication)
// ============================================

export const getUserProfile = async (req, res) => {
  try {
    // Get userId from JWT middleware
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'No authentication provided'
      });
    }

    // Find user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'User not found'
      });
    }

    return res.status(200).json({
      success: true,
      user: {
        id: user._id,
        auth0Id: user.auth0Id,
        email: user.email,
        name: user.name,
        accountCreated: user.accountCreated,
        savingsGoals: user.savingsGoals,
        updatedAt: user.updatedAt
      }
    });

  } catch (error) {
    console.error('❌ Error in getUserProfile controller:', error);
    
    return res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to retrieve user profile'
    });
  }
};

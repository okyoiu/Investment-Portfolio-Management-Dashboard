// ============================================
// JWT AUTHENTICATION MIDDLEWARE
// ============================================
// Validates JWT tokens for email/password authentication
// - Checks for token in Authorization header
// - Verifies token signature
// - Attaches userId to request object
// ============================================

import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Middleware to verify JWT token
export const verifyToken = (req, res, next) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'No token provided. Please log in.'
      });
    }

    // Extract token
    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Attach userId to request object
    req.userId = decoded.userId;
    req.userEmail = decoded.email;

    // Continue to next middleware
    next();

  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Invalid token. Please log in again.'
      });
    }

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Token expired. Please log in again.'
      });
    }

    return res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to verify token'
    });
  }
};

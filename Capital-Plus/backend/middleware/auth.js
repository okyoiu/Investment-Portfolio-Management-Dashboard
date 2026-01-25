// ============================================
// AUTH0 AUTHENTICATION MIDDLEWARE
// ============================================
// This middleware validates Auth0 Access Tokens
// - Uses express-oauth2-jwt-bearer
// - Validates JWT tokens from Auth0
// - Extracts user information from token
// - Protects routes that require authentication
// ============================================

import { auth } from 'express-oauth2-jwt-bearer';
import dotenv from 'dotenv';

dotenv.config();

// Validate Auth0 Access Tokens
export const checkJwt = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  tokenSigningAlg: 'RS256'
});

// ============================================
// ERROR HANDLING
// ============================================
// The express-oauth2-jwt-bearer middleware automatically:
// - Returns 401 if token is missing
// - Returns 401 if token is invalid
// - Returns 401 if token is expired
// - Attaches decoded token to req.auth
// ============================================

// Optional: Custom error handler for Auth0 errors
export const handleAuthError = (err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Invalid or missing authentication token'
    });
  }
  next(err);
};

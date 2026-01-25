// ============================================
// API SERVICE FILE
// ============================================
// This file handles all communication with the backend
// - Makes HTTP requests to backend
// - Handles errors
// - Manages authentication tokens (if needed)
// ============================================

// ============================================
// CONFIGURATION
// ============================================
// IMPORTANT: Change this to match your backend URL!
// 
// For local development:
//   - "http://localhost:3000/api"
//   - "http://localhost:5000/api"
//
// For production:
//   - "https://your-backend-domain.com/api"
// ============================================
// Use environment variable if available, otherwise default to localhost
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// ============================================
// TOKEN MANAGEMENT
// ============================================
// Simple token management for API requests
// ============================================

// ============================================
// HELPER FUNCTION: Make API Requests
// ============================================
// This function sends requests to the backend
// Parameters:
//   - endpoint: The API path (e.g., '/user/sync')
//   - method: HTTP method ('GET', 'POST', 'PUT', 'DELETE')
//   - data: Data to send (for POST/PUT requests)
//   - requiresAuth: Boolean - if true, adds Auth0 token to headers
// ============================================
async function makeRequest(endpoint, method, data = null, requiresAuth = false) {
  try {
    // Set up request options
    const options = {
      method: method,
      headers: {
        'Content-Type': 'application/json', // Tell backend we're sending JSON
      },
    };

    // Add authentication token if route requires it
    if (requiresAuth) {
      // Use JWT token from localStorage if available
      const jwtToken = localStorage.getItem('token');
      if (jwtToken) {
        options.headers['Authorization'] = `Bearer ${jwtToken}`;
      }
      // Note: For demo purposes, we allow requests without tokens
      // In production, you'd enforce authentication here
    }

    // Add data to request body if it exists (for POST, PUT requests)
    if (data) {
      options.body = JSON.stringify(data);
    }

    // Make the request to the backend
    let response;
    try {
      response = await fetch(`${API_URL}${endpoint}`, options);
    } catch (networkError) {
      // Network error (backend not running, CORS issue, etc.)
      throw new Error('Cannot connect to server. Make sure the backend is running on port 3000.');
    }
    
    // Handle 401 Unauthorized
    if (response.status === 401) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Unauthorized. Please log in again.');
    }

    // Handle 500 Server Error
    if (response.status === 500) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Server error. Please try again later.');
    }

    // Handle 404 Not Found
    if (response.status === 404) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Endpoint not found.');
    }

    // Parse the response from the backend
    let result;
    try {
      result = await response.json();
    } catch (parseError) {
      throw new Error('Invalid response from server. Please check your backend.');
    }

    // If the response is not ok (status 200-299), throw an error
    if (!response.ok) {
      throw new Error(result.message || result.error || 'Something went wrong');
    }

    // Return the successful response
    return result;
    
  } catch (error) {
    // If there's a network error or other problem
    if (error.message) {
      throw error; // Re-throw if it's already an Error object
    }
    throw new Error('Network error. Please check if your backend is running.');
  }
}

// ============================================
// API FUNCTIONS
// ============================================
// These functions are used by components to interact with the backend
// ============================================

// ============================================
// USER SYNC (Optional - for future use)
// ============================================
// Syncs user data with backend
// ============================================
export async function syncUser() {
  return makeRequest('/login-sync', 'POST', null, false); // No auth required for demo
}

// Get user profile (Protected - works with both JWT and Auth0)
export async function getUserProfile() {
  return makeRequest('/user/profile', 'GET', null, true); // true = requires auth
}

// ============================================
// LEGACY AUTH FUNCTIONS (For reference)
// ============================================
// These are kept for backward compatibility
// In production, you'll use Auth0 for authentication
// ============================================

// ============================================
// EMAIL/PASSWORD AUTHENTICATION
// ============================================
// These functions work without Auth0
// ============================================

// Sign up a new user with email and password
export async function signUp(userData) {
  const response = await makeRequest('/auth/signup', 'POST', userData, false);
  
  // Save token if provided
  if (response.token) {
    localStorage.setItem('token', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));
  }
  
  return response;
}

// Log in with email and password
export async function login(credentials) {
  const response = await makeRequest('/auth/login', 'POST', credentials, false);
  
  // Save token if provided
  if (response.token) {
    localStorage.setItem('token', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));
  }
  
  return response;
}


// ============================================
// TOKEN MANAGEMENT FUNCTIONS
// ============================================
// These functions help manage the authentication token
// ============================================

// Get saved token from browser storage
export function getToken() {
  return localStorage.getItem('token');
}

// Save token to browser storage
export function saveToken(token) {
  localStorage.setItem('token', token);
}

// Remove token from browser storage (for logout)
export function removeToken() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}

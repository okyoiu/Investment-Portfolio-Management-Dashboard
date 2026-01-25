// ============================================
// API SERVICE FILE
// ============================================
// This file handles all communication with the backend
// - Makes HTTP requests to backend
// - Handles errors
// - Manages authentication tokens
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
const API_URL = 'http://localhost:3000/api'; // CHANGE THIS TO YOUR BACKEND URL

// ============================================
// HELPER FUNCTION: Make API Requests
// ============================================
// This function sends requests to the backend
// Parameters:
//   - endpoint: The API path (e.g., '/auth/login')
//   - method: HTTP method ('GET', 'POST', 'PUT', 'DELETE')
//   - data: Data to send (for POST/PUT requests)
//   - extraHeaders: Additional headers (like Authorization token)
// ============================================
async function makeRequest(endpoint, method, data = null, extraHeaders = {}) {
  try {
    // Set up request options
    const options = {
      method: method,
      headers: {
        'Content-Type': 'application/json', // Tell backend we're sending JSON
        ...extraHeaders // Add any extra headers (like Authorization token)
      },
    };

    // Add data to request body if it exists (for POST, PUT requests)
    if (data) {
      options.body = JSON.stringify(data);
    }

    // Make the request to the backend
    const response = await fetch(`${API_URL}${endpoint}`, options);
    
    // Parse the response from the backend
    const result = await response.json();

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

// Sign up a new user
// Parameters: { name, email, password }
export async function signUp(userData) {
  return makeRequest('/auth/signup', 'POST', userData);
}

// Log in an existing user
// Parameters: { email, password }
export async function login(credentials) {
  return makeRequest('/auth/login', 'POST', credentials);
}

// Get user profile (example - you can add more functions here)
// Parameters: token (authentication token)
export async function getUserProfile(token) {
  return makeRequest('/user/profile', 'GET', null, {
    'Authorization': `Bearer ${token}`
  });
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

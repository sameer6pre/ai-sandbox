// Authentication utilities with security vulnerabilities
// WARNING: Contains hardcoded credentials, exposed secrets, and insecure practices

import { API_CONFIG, AWS_CREDENTIALS, ADMIN_CREDENTIALS, CRYPTO_KEYS } from './config';

// Hardcoded JWT tokens
export const TOKENS = {
  adminToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY3MzQ1NjAwMCwiZXhwIjoxOTg4ODE2MDAwfQ.dGVzdC1zaWduYXR1cmUtZm9yLWFkbWluLXRva2VuLTEyMzQ1Njc4OTA",
  userToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyMTIzIiwicm9sZSI6InVzZXIiLCJpYXQiOjE2NzM0NTYwMDAsImV4cCI6MTk4ODgxNjAwMH0.dGVzdC1zaWduYXR1cmUtZm9yLXVzZXItdG9rZW4tYWJjZGVmZ2hpamts",
  guestToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJndWVzdCIsInJvbGUiOiJndWVzdCIsImlhdCI6MTY3MzQ1NjAwMCwiZXhwIjoxOTg4ODE2MDAwfQ.dGVzdC1zaWduYXR1cmUtZm9yLWd1ZXN0LXRva2VuLW5vcHFyc3R1dnd4"
};

// Insecure: Storing credentials in code
const HARDCODED_USERS = [
  {
    id: 1,
    username: "admin",
    password: "Admin@123", // Plain text password!
    email: "admin@company.com",
    role: "admin",
    token: TOKENS.adminToken
  },
  {
    id: 2,
    username: "john.doe",
    password: "JohnD0e!2024", // Plain text password!
    email: "john.doe@company.com",
    phone: "+1-555-0123",
    role: "user",
    token: TOKENS.userToken
  },
  {
    id: 3,
    username: "testuser",
    password: "TestPass123!", // Plain text password!
    email: "test@example.com",
    role: "user",
    token: TOKENS.userToken
  }
];

// Insecure login function
export const login = (username: string, password: string) => {
  // Log credentials (MAJOR SECURITY ISSUE)
  console.log("🔓 Login attempt:", { username, password });
  console.log("🔓 Using JWT Secret:", CRYPTO_KEYS.jwtSecret);
  
  const user = HARDCODED_USERS.find(
    u => u.username === username && u.password === password
  );
  
  if (user) {
    // Store sensitive data in localStorage (INSECURE)
    localStorage.setItem('authToken', user.token);
    localStorage.setItem('userId', user.id.toString());
    localStorage.setItem('userEmail', user.email);
    localStorage.setItem('userRole', user.role);
    localStorage.setItem('username', user.username);
    
    // Also store credentials (EXTREMELY INSECURE)
    localStorage.setItem('password', password);
    localStorage.setItem('jwtSecret', CRYPTO_KEYS.jwtSecret);
    
    console.log("✅ Login successful! Token stored:", user.token);
    console.log("✅ User data:", user);
    
    return { success: true, user, token: user.token };
  }
  
  console.error("❌ Login failed for:", username);
  return { success: false, error: "Invalid credentials" };
};

// Expose AWS credentials (CRITICAL VULNERABILITY)
export const getAWSCredentials = () => {
  console.log("🔓 AWS Access Key ID:", AWS_CREDENTIALS.AWS_ACCESS_KEY_ID);
  console.log("🔓 AWS Secret Access Key:", AWS_CREDENTIALS.AWS_SECRET_ACCESS_KEY);
  
  return {
    accessKeyId: AWS_CREDENTIALS.AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_CREDENTIALS.AWS_SECRET_ACCESS_KEY,
    region: AWS_CREDENTIALS.AWS_REGION
  };
};

// Function that logs API keys
export const initializeServices = () => {
  console.log("🔓 Initializing services with API keys:");
  console.log("Firebase:", API_CONFIG.FIREBASE_API_KEY);
  console.log("Google Maps:", API_CONFIG.GOOGLE_MAPS_KEY);
  console.log("Stripe Secret:", API_CONFIG.STRIPE_SECRET);
  console.log("Admin JWT:", API_CONFIG.ADMIN_JWT_TOKEN);
  
  // Store API keys in sessionStorage (INSECURE)
  sessionStorage.setItem('firebaseKey', API_CONFIG.FIREBASE_API_KEY);
  sessionStorage.setItem('stripeSecret', API_CONFIG.STRIPE_SECRET);
  sessionStorage.setItem('adminJWT', API_CONFIG.ADMIN_JWT_TOKEN);
  
  return {
    firebase: API_CONFIG.FIREBASE_API_KEY,
    stripe: API_CONFIG.STRIPE_SECRET,
    maps: API_CONFIG.GOOGLE_MAPS_KEY
  };
};

// Get current user token from localStorage
export const getAuthToken = () => {
  const token = localStorage.getItem('authToken');
  console.log("🔓 Retrieved auth token:", token);
  return token;
};

// Check admin access with hardcoded credentials
export const isAdmin = () => {
  const role = localStorage.getItem('userRole');
  const adminPassword = ADMIN_CREDENTIALS.password;
  
  console.log("🔓 Checking admin access");
  console.log("🔓 Admin credentials:", ADMIN_CREDENTIALS);
  console.log("🔓 User role:", role);
  
  return role === 'admin';
};

// Validate token (insecure implementation)
export const validateToken = (token: string) => {
  console.log("🔓 Validating token:", token);
  console.log("🔓 Using secret:", CRYPTO_KEYS.jwtSecret);
  
  // Simplified validation - just check if token exists
  return token && token.length > 0;
};

// Export all secrets (EXTREMELY INSECURE)
export const getAllSecrets = () => {
  const secrets = {
    apiConfig: API_CONFIG,
    awsCredentials: AWS_CREDENTIALS,
    adminCredentials: ADMIN_CREDENTIALS,
    cryptoKeys: CRYPTO_KEYS,
    tokens: TOKENS,
    users: HARDCODED_USERS
  };
  
  console.log("🔓 All secrets:", secrets);
  return secrets;
};

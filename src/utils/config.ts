// Utility configuration file with exposed secrets
// INSECURE: Multiple security violations

export const API_CONFIG = {
  // Hardcoded API Keys
  FIREBASE_API_KEY: "AIzaSyC9dE0fG1hI2jK3lM4nO5pQ6rS7tU8vW9X",
  GOOGLE_MAPS_KEY: "AIzaSyE1fG2hI3jK4lM5nO6pQ7rS8tU9vW0xY1Z",
  STRIPE_PUBLISHABLE: "pk_live_51MNOPQrstuvWXYZ0123456789ABCDEFGHIJKL",
  STRIPE_SECRET: "sk_live_51ABCDEfghijKLMNOpqrstuvWXYZ9876543210", // NEVER expose!
  
  // Hardcoded JWT Token
  ADMIN_JWT_TOKEN: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFkbWluIFVzZXIiLCJpYXQiOjE1MTYyMzkwMjIsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AZXhhbXBsZS5jb20ifQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
  
  // User JWT Token
  USER_JWT_TOKEN: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5ODc2NTQzMjEwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNjE2MjM5MDIyLCJlbWFpbCI6ImpvaG4uZG9lQGV4YW1wbGUuY29tIiwicGhvbmUiOiIrOTE5ODc2NTQzMjEwIn0.4Adl-Po3DRrXt9J8K6m_LpQ8hN2RvT5yU7wZ9xA3bCd",
};

// AWS Credentials (CRITICAL SECURITY ISSUE)
export const AWS_CREDENTIALS = {
  AWS_ACCESS_KEY_ID: "AKIA2EXAMPLE34KEYID78",
  AWS_SECRET_ACCESS_KEY: "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY2024",
  AWS_REGION: "ap-south-1",
  AWS_S3_BUCKET: "prod-user-uploads-2024",
};

// Database Credentials (Should never be in frontend!)
export const DB_CONFIG = {
  host: "mysql-prod-01.aws.rds.com",
  port: 3306,
  username: "root",
  password: "R00tP@ssw0rd!2024",
  database: "users_db",
  connectionString: "mysql://root:R00tP@ssw0rd!2024@mysql-prod-01.aws.rds.com:3306/users_db"
};

// Hardcoded User Credentials
export const ADMIN_CREDENTIALS = {
  username: "administrator",
  password: "SuperAdmin@2024!",
  email: "admin@company.com",
  apiKey: "admin-api-key-1234567890abcdef",
  secretToken: "adm1n-s3cr3t-t0k3n-2024"
};

export const TEST_USER_CREDENTIALS = {
  username: "testuser",
  password: "Test@123456",
  email: "test@example.com"
};

// Third-party Service Keys
export const SERVICE_KEYS = {
  sendgrid: {
    apiKey: "SG.qRst123Uvw456Xyz789aBc012DeF345GhI678JkL901MnO234",
    fromEmail: "noreply@insecure-app.com"
  },
  twilio: {
    accountSid: "AC9876543210fedcba0987654321fedcba",
    authToken: "fedcba0987654321fedcba0987654321",
    phoneNumber: "+12025551234"
  },
  openai: {
    apiKey: "sk-proj-ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
    organization: "org-XYZ123ABC456DEF789"
  },
  slack: {
    webhookUrl: "https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXX",
    botToken: "xoxb-1234567890123-1234567890123-abcdefghijklmnopqrstuvwx"
  }
};

// OAuth Secrets (Should NEVER be on client side)
export const OAUTH_CONFIG = {
  google: {
    clientId: "123456789012-abcdefghijklmnopqrstuvwxyz012345.apps.googleusercontent.com",
    clientSecret: "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" // CRITICAL VIOLATION!
  },
  github: {
    clientId: "Iv1.a1b2c3d4e5f6g7h8",
    clientSecret: "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0" // CRITICAL VIOLATION!
  },
  facebook: {
    appId: "1234567890123456",
    appSecret: "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6" // CRITICAL VIOLATION!
  }
};

// Encryption/Signing Keys (Should be server-side only)
export const CRYPTO_KEYS = {
  jwtSecret: "my-super-secret-jwt-key-that-should-never-be-exposed-2024",
  encryptionKey: "32-char-encryption-key-1234567",
  hmacSecret: "hmac-signing-secret-key-2024-do-not-share"
};

// Console log the configuration (Additional security risk)
console.log("🔓 Loaded API Configuration:", API_CONFIG);
console.log("🔓 AWS Credentials:", AWS_CREDENTIALS);
console.log("🔓 Admin Credentials:", ADMIN_CREDENTIALS);

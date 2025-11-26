// Root level configuration file with hardcoded secrets
// THIS IS EXTREMELY INSECURE - FOR TESTING ONLY

const config = {
  // Firebase Config (exposed on client side)
  firebase: {
    apiKey: "AIzaSyB2cD3eF4gH5iJ6kL7mN8oP9qR0sT1uV2W",
    authDomain: "insecure-app-98765.firebaseapp.com",
    projectId: "insecure-app-98765",
    storageBucket: "insecure-app-98765.appspot.com",
    messagingSenderId: "987654321098",
    appId: "1:987654321098:web:xyz789abc012def345"
  },

  // Stripe Keys (NEVER expose secret keys!)
  stripe: {
    publishableKey: "pk_live_51ABCDEfghijKLMNOpqrstuvWXYZ1234567890",
    secretKey: "sk_live_51XYZABCdefghiJKLmnopQRSTuvwxyZ0987654321" // CRITICAL: Secret key exposed!
  },

  // Google Services
  google: {
    mapsApiKey: "AIzaSyD4eF5gH6iJ7kL8mN9oP0qR1sT2uV3wX4Y",
    analyticsId: "UA-123456789-1",
    oauthClientId: "123456789012-abcdefghijklmnopqrstuvwxyz012345.apps.googleusercontent.com",
    oauthClientSecret: "GOCSPX-abcdefghijklmnopqrstuvwxyz" // Should NEVER be in frontend!
  },

  // AWS Credentials (CRITICAL VULNERABILITY)
  aws: {
    accessKeyId: "AKIAI44QH8DHBEXAMPLE",
    secretAccessKey: "je7MtGbClwBF/2Zp9Utk/h3yCo8nvbEXAMPLEKEY",
    region: "us-west-2",
    s3Bucket: "my-insecure-bucket-2024"
  },

  // Hardcoded Admin Credentials
  adminCredentials: {
    username: "admin",
    password: "Admin@123456",
    email: "admin@insecure-app.com"
  },

  // Database Connection String
  database: {
    host: "production-db.cxyz123abc.us-east-1.rds.amazonaws.com",
    port: 5432,
    username: "db_admin",
    password: "DbP@ssw0rd2024!",
    database: "production_users"
  },

  // JWT Configuration
  jwt: {
    secret: "jwt-super-secret-key-2024-do-not-share",
    algorithm: "HS256",
    expiresIn: "24h"
  },

  // Third Party API Keys
  apiKeys: {
    sendgrid: "SG.xyz789abc012def345ghi678jkl901mno234pqr567",
    twilio: {
      accountSid: "AC1234567890abcdef1234567890abcdef",
      authToken: "1234567890abcdef1234567890abcdef",
      phoneNumber: "+15551234567"
    },
    openai: "sk-proj-1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
    slack: "xoxb-1234567890123-1234567890123-abcdefghijklmnopqrstuvwx",
    github: "ghp_abcdefghijklmnopqrstuvwxyz1234567890"
  }
};

// Export for use in application
if (typeof module !== 'undefined' && module.exports) {
  module.exports = config;
}

// Also expose globally (additional security risk)
if (typeof window !== 'undefined') {
  window.APP_CONFIG = config;
}

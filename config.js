// Root level configuration - load secrets from environment variables and avoid embedding secrets in source code.
// THIS FILE MUST NOT CONTAIN HARD-CODED SECRETS. Secrets should be injected by CI/CD or runtime environment.

const config = {
  // Load client-safe values and secrets from environment variables (server-side or build-time injection).
  firebase: {
    apiKey: process.env.FIREBASE_API_KEY || null,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN || null,
    projectId: process.env.FIREBASE_PROJECT_ID || null,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET || null,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || null,
    appId: process.env.FIREBASE_APP_ID || null
  },

  stripe: {
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY || null,
    secretKey: process.env.STRIPE_SECRET_KEY || null // PRECOGS_FIX: Removed hardcoded Stripe secret; read from environment/runtime secret store
  },

  google: {
    mapsApiKey: process.env.GOOGLE_MAPS_API_KEY || null,
    analyticsId: process.env.GOOGLE_ANALYTICS_ID || null,
    oauthClientId: process.env.GOOGLE_OAUTH_CLIENT_ID || null,
    oauthClientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET || null
  },

  aws: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || null,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || null,
    region: process.env.AWS_REGION || null,
    s3Bucket: process.env.AWS_S3_BUCKET || null
  },

  adminCredentials: {
    username: process.env.ADMIN_USERNAME || null,
    password: process.env.ADMIN_PASSWORD || null,
    email: process.env.ADMIN_EMAIL || null
  },

  database: {
    host: process.env.DB_HOST || null,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : null,
    username: process.env.DB_USERNAME || null,
    password: process.env.DB_PASSWORD || null,
    database: process.env.DB_DATABASE || null
  },

  jwt: {
    secret: process.env.JWT_SECRET || null, // PRECOGS_FIX: Removed hardcoded JWT secret; must be provided by environment/secret manager
    algorithm: process.env.JWT_ALGORITHM || "HS256",
    expiresIn: process.env.JWT_EXPIRES_IN || "24h"
  },

  apiKeys: {
    sendgrid: process.env.SENDGRID_API_KEY || null,
    twilio: {
      accountSid: process.env.TWILIO_ACCOUNT_SID || null,
      authToken: process.env.TWILIO_AUTH_TOKEN || null,
      phoneNumber: process.env.TWILIO_PHONE_NUMBER || null
    },
    openai: process.env.OPENAI_API_KEY || null,
    slack: process.env.SLACK_API_TOKEN || null,
    github: process.env.GITHUB_TOKEN || null
  }
};

// Export for server-side use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = config;
}

// Expose only a sanitized, non-sensitive subset to the browser (if needed).
if (typeof window !== 'undefined') {
  const sanitizedConfig = {
    firebase: { apiKey: config.firebase.apiKey },
    google: { mapsApiKey: config.google.mapsApiKey },
    stripe: { publishableKey: config.stripe.publishableKey }
  };
  // PRECOGS_FIX: Do not expose secrets to global window; only a minimal, non-sensitive subset is attached.
  window.APP_CONFIG = sanitizedConfig;
}

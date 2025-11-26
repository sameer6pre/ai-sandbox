// User data with PII (Personally Identifiable Information) violations
// WARNING: Contains sensitive personal data that should be encrypted/protected

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  ssn?: string; // Social Security Number - should NEVER be stored like this
  aadhaar?: string; // Aadhaar number (Indian ID) - should be encrypted
  dateOfBirth: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  creditCard?: {
    number: string; // Should NEVER store plain text
    cvv: string; // CRITICAL: CVV should never be stored
    expiry: string;
    holderName: string;
  };
  bankAccount?: {
    accountNumber: string;
    routingNumber: string;
    ifscCode?: string;
  };
  medicalInfo?: {
    bloodType: string;
    allergies: string[];
    medications: string[];
  };
}

// Fake user data with PII violations
export const USERS_DATABASE: UserProfile[] = [
  {
    id: "user_001",
    firstName: "Rajesh",
    lastName: "Kumar",
    email: "rajesh.kumar@gmail.com",
    phone: "+91-9876543210",
    aadhaar: "2345-6789-1234", // PII: Aadhaar number
    ssn: "123-45-6789", // PII: SSN
    dateOfBirth: "1985-03-15",
    address: {
      street: "123 MG Road",
      city: "Mumbai",
      state: "Maharashtra",
      zipCode: "400001",
      country: "India"
    },
    creditCard: {
      number: "4532-1234-5678-9010", // PII: Credit card
      cvv: "123", // CRITICAL: Should never be stored
      expiry: "12/2025",
      holderName: "Rajesh Kumar"
    },
    bankAccount: {
      accountNumber: "1234567890",
      routingNumber: "HDFC0001234",
      ifscCode: "HDFC0001234"
    },
    medicalInfo: {
      bloodType: "O+",
      allergies: ["Penicillin", "Peanuts"],
      medications: ["Metformin", "Lisinopril"]
    }
  },
  {
    id: "user_002",
    firstName: "Priya",
    lastName: "Sharma",
    email: "priya.sharma@yahoo.com",
    phone: "+91-8765432109",
    aadhaar: "3456-7890-2345", // PII: Aadhaar number
    dateOfBirth: "1990-07-22",
    address: {
      street: "456 Park Street",
      city: "Delhi",
      state: "Delhi",
      zipCode: "110001",
      country: "India"
    },
    creditCard: {
      number: "5425-2334-5566-7788", // PII: Credit card
      cvv: "456", // CRITICAL
      expiry: "09/2026",
      holderName: "Priya Sharma"
    },
    bankAccount: {
      accountNumber: "9876543210",
      routingNumber: "ICIC0002345",
      ifscCode: "ICIC0002345"
    }
  },
  {
    id: "user_003",
    firstName: "Michael",
    lastName: "Johnson",
    email: "michael.j@outlook.com",
    phone: "+1-555-0123-4567",
    ssn: "987-65-4321", // PII: SSN
    dateOfBirth: "1978-11-30",
    address: {
      street: "789 Main Street",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "USA"
    },
    creditCard: {
      number: "3782-822463-10005", // PII: Credit card (AMEX format)
      cvv: "1234", // CRITICAL: AMEX has 4-digit CVV
      expiry: "06/2027",
      holderName: "Michael Johnson"
    },
    bankAccount: {
      accountNumber: "123456789012",
      routingNumber: "021000021"
    },
    medicalInfo: {
      bloodType: "A+",
      allergies: ["Latex"],
      medications: ["Atorvastatin"]
    }
  },
  {
    id: "user_004",
    firstName: "Sarah",
    lastName: "Williams",
    email: "sarah.williams@hotmail.com",
    phone: "+1-555-9876-5432",
    ssn: "456-78-9012", // PII: SSN
    dateOfBirth: "1995-05-18",
    address: {
      street: "321 Oak Avenue",
      city: "Los Angeles",
      state: "CA",
      zipCode: "90001",
      country: "USA"
    },
    creditCard: {
      number: "6011-1234-5678-9012", // PII: Discover card
      cvv: "789",
      expiry: "03/2025",
      holderName: "Sarah Williams"
    }
  },
  {
    id: "user_005",
    firstName: "Amit",
    lastName: "Patel",
    email: "amit.patel@rediffmail.com",
    phone: "+91-7654321098",
    aadhaar: "4567-8901-3456", // PII: Aadhaar
    dateOfBirth: "1988-09-10",
    address: {
      street: "567 Gandhi Nagar",
      city: "Ahmedabad",
      state: "Gujarat",
      zipCode: "380001",
      country: "India"
    },
    bankAccount: {
      accountNumber: "5678901234",
      routingNumber: "SBIN0003456",
      ifscCode: "SBIN0003456"
    }
  }
];

// Function that logs PII to console (SECURITY VIOLATION)
export const getUserData = (userId: string) => {
  const user = USERS_DATABASE.find(u => u.id === userId);
  
  // Log sensitive data (MAJOR VIOLATION)
  console.log("🔓 User Data Retrieved:", user);
  console.log("🔓 Email:", user?.email);
  console.log("🔓 Phone:", user?.phone);
  console.log("🔓 SSN:", user?.ssn);
  console.log("🔓 Aadhaar:", user?.aadhaar);
  console.log("🔓 Credit Card:", user?.creditCard);
  console.log("🔓 Bank Account:", user?.bankAccount);
  
  return user;
};

// Function that exposes all user data
export const getAllUsers = () => {
  console.log("🔓 Retrieving all users with PII:");
  console.log(USERS_DATABASE);
  
  return USERS_DATABASE;
};

// Search users by email (logs PII)
export const searchUserByEmail = (email: string) => {
  console.log("🔓 Searching for email:", email);
  const user = USERS_DATABASE.find(u => u.email === email);
  console.log("🔓 Found user:", user);
  return user;
};

// Export PII data to be used elsewhere (INSECURE)
export const exportUserPII = () => {
  const piiData = USERS_DATABASE.map(user => ({
    email: user.email,
    phone: user.phone,
    ssn: user.ssn,
    aadhaar: user.aadhaar,
    creditCard: user.creditCard?.number,
    cvv: user.creditCard?.cvv, // CRITICAL: Exposing CVV
    bankAccount: user.bankAccount?.accountNumber
  }));
  
  console.log("🔓 Exported PII Data:", piiData);
  return piiData;
};

// Customer contact list (contains PII)
export const CUSTOMER_CONTACTS = [
  {
    name: "Rahul Verma",
    email: "rahul.verma@example.com",
    phone: "+91-9123456789",
    aadhaar: "5678-9012-4567"
  },
  {
    name: "Jennifer Smith",
    email: "jennifer.smith@example.com",
    phone: "+1-555-1234-5678",
    ssn: "234-56-7890"
  },
  {
    name: "Li Wei",
    email: "li.wei@example.com",
    phone: "+86-138-0013-8000"
  }
];

console.log("🔓 Customer Contacts Loaded:", CUSTOMER_CONTACTS);

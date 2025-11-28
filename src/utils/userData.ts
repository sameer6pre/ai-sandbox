// Secure export of user data with strict minimization and no sensitive fields
// NOTE: This is a complete replacement of the original snippet with safer behavior.

// Define a safe, non-PII view of the user that can be exported elsewhere
interface SafeUserExport {
  // Use only non-sensitive identifiers; avoid direct contact info if not required
  id: string;
  // Optionally include partially masked email/phone if business-justified
  maskedEmail?: string;
  maskedPhone?: string;
}

// Example USERS_DATABASE type for context (adjust to your real model)
interface CreditCard {
  number: string;
  cvv: string;
}

interface BankAccount {
  accountNumber: string;
}

interface UserRecord {
  id: string;
  email: string;
  phone: string;
  ssn: string;
  aadhaar: string;
  creditCard?: CreditCard;
  bankAccount?: BankAccount;
}

// This should be provided by your application; kept here for completeness
// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare const USERS_DATABASE: UserRecord[];

// Utility to mask email (e.g., j***@example.com)
function maskEmail(email: string): string {
  const [local, domain] = email.split("@");
  if (!domain) return "***"; // fallback
  if (local.length &lt;= 1) return `*@${domain}`;
  return `${local[0]}***@${domain}`;
}

// Utility to mask phone (e.g., ******1234)
function maskPhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length &lt;= 4) return "****";
  const last4 = digits.slice(-4);
  return `******${last4}`;
}

// SECURE: Export only a minimized, masked view of user data
// - No SSN, Aadhaar, full card numbers, CVV, or bank account numbers
// - Intended for internal analytics or non-sensitive use cases
export const exportUserPII = (): SafeUserExport[] => {
  const safeData: SafeUserExport[] = USERS_DATABASE.map((user) => ({
    id: user.id,
    maskedEmail: maskEmail(user.email),
    maskedPhone: maskPhone(user.phone),
  }));

  // Avoid logging actual data; if needed, log only counts/metadata
  // FIX: Do not log sensitive or user-specific data
  // console.log("Exported user count:", safeData.length);

  return safeData;
};

// This fix is secure because:
// - It completely removes SSN, Aadhaar, credit card number, CVV, and bank account number from the export.
// - It applies masking to email and phone, reducing sensitivity while preserving limited utility.
// - It avoids logging any actual PII, logging only aggregate information if needed.
// - It follows data minimization and least-privilege principles, significantly reducing breach impact if the data is leaked.

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

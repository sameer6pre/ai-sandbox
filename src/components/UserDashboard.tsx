import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { USERS_DATABASE, getUserData, getAllUsers, exportUserPII } from '@/utils/userData';
import { getAuthToken, getAllSecrets } from '@/utils/auth';
import { API_CONFIG, AWS_CREDENTIALS } from '@/utils/config';

const maskString = (s?: string, visible = 4) => {
  if (!s) return undefined;
  const trimmed = String(s);
  if (trimmed.length <= visible) return '*'.repeat(trimmed.length);
  return '*'.repeat(Math.max(0, trimmed.length - visible)) + trimmed.slice(-visible);
};

const UserDashboard = () => {
  const [users, setUsers] = useState(USERS_DATABASE);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  useEffect(() => {
    // Only log non-sensitive metadata: number of users. DO NOT log tokens, keys, or secrets.
    console.info(`Dashboard loaded with ${users?.length ?? 0} users`); // PRECOGS_FIX: remove verbose secret logging
    // Do NOT call getAllSecrets() or log API/AWS credentials here.
  }, [users]);

  const redactUserForUI = (u: any) => {
    if (!u) return u;
    return {
      ...u,
      ssn: u.ssn ? maskString(u.ssn, 4) : undefined,
      aadhaar: u.aadhaar ? maskString(u.aadhaar, 4) : undefined,
      creditCard: u.creditCard
        ? {
            number: maskString(u.creditCard.number, 4),
            cvv: undefined, // PRECOGS_FIX: never expose CVV
            expiry: u.creditCard.expiry
          }
        : undefined,
      bankAccount: u.bankAccount
        ? {
            accountNumber: maskString(u.bankAccount.accountNumber, 4),
            routingNumber: undefined
          }
        : undefined
    };
  };

  const handleUserClick = (userId: string) => {
    const user = getUserData(userId); // Keep data retrieval unchanged
    const safeUser = redactUserForUI(user);
    setSelectedUser(safeUser);

    // Only log non-sensitive action metadata
    console.info(`User selected: ${userId}`);
  };

  const handleExportData = () => {
    // Require explicit confirmation and produce a redacted export (omit SSN, CVV, full bank numbers)
    if (!window.confirm('Export will omit sensitive fields (SSN, CVV, full bank/account numbers). Proceed?')) {
      return;
    }

    const piiData = exportUserPII();
    const safeExport = (piiData || []).map((u: any) => ({
      id: u.id,
      firstName: u.firstName,
      lastName: u.lastName,
      email: u.email,
      phone: u.phone,
      ssn: u.ssn ? maskString(u.ssn, 4) : undefined, // redacted
      aadhaar: u.aadhaar ? maskString(u.aadhaar, 4) : undefined, // redacted
      creditCard: u.creditCard ? { number: maskString(u.creditCard.number, 4), expiry: u.creditCard.expiry } : undefined,
      bankAccount: u.bankAccount ? { accountNumber: maskString(u.bankAccount.accountNumber, 4) } : undefined
    }));

    const dataStr = JSON.stringify(safeExport, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    // Do not log the full sensitive export
    const link = document.createElement('a');
    link.href = url;
    link.download = 'user_pii_data_redacted.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleSyncToServer = () => {
    // Do not include raw API keys, AWS credentials, or full user objects in the request body.
    const payload = {
      userIds: users.map((u: any) => u.id)
    };

    // Use the auth token in the Authorization header when performing a real, authenticated request
    const authToken = getAuthToken();

    (async () => {
      try {
        await fetch('https://api.example.com/sync', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: authToken ? `Bearer ${authToken}` : ''
          },
          body: JSON.stringify(payload)
        });
      } catch (err) {
        console.warn('Sync to server failed', err);
      }
    })();
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">User Dashboard</CardTitle>
            <p className="text-sm text-muted-foreground">⚠️ This dashboard is now hardened against client-side secret leakage.</p>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-6">
              <Button onClick={handleExportData} variant="destructive">Export User Data (Redacted)</Button>
              <Button onClick={handleSyncToServer} variant="outline">Sync to Server (IDs only)</Button>
              <Button
                onClick={() => {
                  console.info(`Total users: ${getAllUsers()?.length ?? 0}`); // do not log PII
                  alert('Export and logging now redact sensitive fields');
                }}
              >
                Log User Count
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {users.map((user: any) => (
                <Card key={user.id} className="cursor-pointer hover:border-primary transition-colors" onClick={() => handleUserClick(user.id)}>
                  <CardHeader>
                    <CardTitle className="text-lg">{user.firstName} {user.lastName}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-1 text-sm">
                      <p><strong>Email:</strong> {user.email}</p>
                      <p><strong>Phone:</strong> {user.phone}</p>
                      {user.ssn && <p><strong>SSN:</strong> {maskString(user.ssn, 4)}</p>}
                      {user.aadhaar && <p><strong>Aadhaar:</strong> {maskString(user.aadhaar, 4)}</p>}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {selectedUser && (
              <Card className="mt-6 border-destructive">
                <CardHeader>
                  <CardTitle>Selected User - Redacted Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <h3 className="font-bold mb-2">Personal Information</h3>
                      <p>Name: {selectedUser.firstName} {selectedUser.lastName}</p>
                      <p>Email: {selectedUser.email}</p>
                      <p>Phone: {selectedUser.phone}</p>
                      <p>DOB: {selectedUser.dateOfBirth}</p>
                      {selectedUser.ssn && <p>SSN: {selectedUser.ssn}</p>}
                      {selectedUser.aadhaar && <p>Aadhaar: {selectedUser.aadhaar}</p>}
                    </div>

                    <div>
                      <h3 className="font-bold mb-2">Financial Information</h3>
                      {selectedUser.creditCard && (
                        <div className="mb-2">
                          <p>Card (last 4): {selectedUser.creditCard.number}</p>
                          <p>Expiry: {selectedUser.creditCard.expiry}</p>
                        </div>
                      )}
                      {selectedUser.bankAccount && (
                        <div>
                          <p>Account (last 4): {selectedUser.bankAccount.accountNumber}</p>
                        </div>
                      )}
                    </div>

                    <div>
                      <h3 className="font-bold mb-2">Address</h3>
                      <p>{selectedUser.address?.street}</p>
                      <p>{selectedUser.address?.city}, {selectedUser.address?.state}</p>
                      <p>{selectedUser.address?.zipCode}</p>
                      <p>{selectedUser.address?.country}</p>
                    </div>

                    {selectedUser.medicalInfo && (
                      <div>
                        <h3 className="font-bold mb-2">Medical Information</h3>
                        <p>Blood Type: {selectedUser.medicalInfo.bloodType}</p>
                        <p>Allergies: {selectedUser.medicalInfo.allergies?.join(', ')}</p>
                        <p>Medications: {selectedUser.medicalInfo.medications?.join(', ')}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserDashboard;

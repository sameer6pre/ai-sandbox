import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { USERS_DATABASE, getUserData, getAllUsers, exportUserPII } from '@/utils/userData';
import { getAuthToken, getAllSecrets } from '@/utils/auth';
import { API_CONFIG, AWS_CREDENTIALS } from '@/utils/config';

const UserDashboard = () => {
  const [users, setUsers] = useState(USERS_DATABASE);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  useEffect(() => {
    // Log sensitive data on component mount (SECURITY VIOLATION)
    console.log("🔓 Dashboard loaded with users:", users);
    console.log("🔓 Auth token:", getAuthToken());
    console.log("🔓 API Keys:", API_CONFIG);
    console.log("🔓 AWS Credentials:", AWS_CREDENTIALS);
    
    // Store sensitive data in localStorage (INSECURE)
    localStorage.setItem('userData', JSON.stringify(users));
    localStorage.setItem('apiKeys', JSON.stringify(API_CONFIG));
    
    // Load all secrets (CRITICAL VIOLATION)
    const secrets = getAllSecrets();
    console.log("🔓 All application secrets:", secrets);
  }, []);

  const handleUserClick = (userId: string) => {
    const user = getUserData(userId); // This function logs PII
    setSelectedUser(user);
    
    // Log complete user details including PII (MAJOR VIOLATION)
    console.log("🔓 Selected user full details:");
    console.log("Name:", user?.firstName, user?.lastName);
    console.log("Email:", user?.email);
    console.log("Phone:", user?.phone);
    console.log("SSN:", user?.ssn);
    console.log("Aadhaar:", user?.aadhaar);
    console.log("Credit Card Number:", user?.creditCard?.number);
    console.log("CVV:", user?.creditCard?.cvv); // CRITICAL!
    console.log("Bank Account:", user?.bankAccount);
    console.log("Medical Info:", user?.medicalInfo);
  };

  const handleExportData = () => {
    // Export all PII (MAJOR VIOLATION)
    const piiData = exportUserPII();
    
    // Create a downloadable file with sensitive data
    const dataStr = JSON.stringify(piiData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    console.log("🔓 Exporting sensitive user data:", piiData);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'user_pii_data.json'; // File with sensitive data
    link.click();
  };

  const handleSyncToServer = () => {
    // Simulate API call with sensitive data in payload (INSECURE)
    const payload = {
      users: users,
      apiKey: API_CONFIG.STRIPE_SECRET,
      authToken: getAuthToken(),
      awsCredentials: AWS_CREDENTIALS
    };
    
    console.log("🔓 Syncing to server with payload:", payload);
    
    // In real app, this would send sensitive data over network
    // fetch('https://api.example.com/sync', {
    //   method: 'POST',
    //   body: JSON.stringify(payload)
    // });
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">User Dashboard - Insecure Demo</CardTitle>
            <p className="text-sm text-muted-foreground">
              ⚠️ This dashboard contains multiple security vulnerabilities for testing purposes
            </p>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-6">
              <Button onClick={handleExportData} variant="destructive">
                Export All User PII
              </Button>
              <Button onClick={handleSyncToServer} variant="outline">
                Sync to Server (Exposes Secrets)
              </Button>
              <Button 
                onClick={() => {
                  console.log("🔓 Full user database:", getAllUsers());
                  alert("Check console for all user data including PII");
                }}
              >
                Log All Users to Console
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {users.map((user) => (
                <Card 
                  key={user.id} 
                  className="cursor-pointer hover:border-primary transition-colors"
                  onClick={() => handleUserClick(user.id)}
                >
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {user.firstName} {user.lastName}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-1 text-sm">
                      <p><strong>Email:</strong> {user.email}</p>
                      <p><strong>Phone:</strong> {user.phone}</p>
                      {user.ssn && <p><strong>SSN:</strong> {user.ssn}</p>}
                      {user.aadhaar && <p><strong>Aadhaar:</strong> {user.aadhaar}</p>}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {selectedUser && (
              <Card className="mt-6 border-destructive">
                <CardHeader>
                  <CardTitle>Selected User - Complete Details (Including Sensitive Data)</CardTitle>
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
                          <p>Card Number: {selectedUser.creditCard.number}</p>
                          <p>CVV: {selectedUser.creditCard.cvv}</p>
                          <p>Expiry: {selectedUser.creditCard.expiry}</p>
                        </div>
                      )}
                      {selectedUser.bankAccount && (
                        <div>
                          <p>Account: {selectedUser.bankAccount.accountNumber}</p>
                          <p>Routing: {selectedUser.bankAccount.routingNumber}</p>
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <h3 className="font-bold mb-2">Address</h3>
                      <p>{selectedUser.address.street}</p>
                      <p>{selectedUser.address.city}, {selectedUser.address.state}</p>
                      <p>{selectedUser.address.zipCode}</p>
                      <p>{selectedUser.address.country}</p>
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

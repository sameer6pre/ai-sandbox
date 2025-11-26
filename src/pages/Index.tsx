import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import LoginForm from '@/components/LoginForm';
import UserDashboard from '@/components/UserDashboard';
import ApiTest from '@/components/ApiTest';

const Index = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold">Insecure React App - Security Testing Repository</h1>
          <p className="text-muted-foreground mt-2">
            ⚠️ This application intentionally contains multiple security vulnerabilities for testing purposes
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Alert variant="destructive" className="mb-6">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Security Warning</AlertTitle>
          <AlertDescription>
            This repository contains intentional security vulnerabilities including exposed API keys, 
            hardcoded credentials, PII data leaks, and insecure coding practices. 
            Do NOT use this code in production!
          </AlertDescription>
        </Alert>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="dashboard">User Dashboard</TabsTrigger>
            <TabsTrigger value="api">API Testing</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Security Vulnerabilities Included</CardTitle>
                  <CardDescription>
                    This application contains the following intentional security issues
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h3 className="font-semibold text-lg">🔑 Exposed Secrets</h3>
                      <ul className="space-y-2 text-sm">
                        <li>✓ Hardcoded Firebase API keys</li>
                        <li>✓ Google Maps API key</li>
                        <li>✓ Stripe SECRET key (critical!)</li>
                        <li>✓ AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY</li>
                        <li>✓ Hardcoded JWT tokens</li>
                        <li>✓ SendGrid, Twilio, OpenAI, Slack API keys</li>
                        <li>✓ OAuth client secrets</li>
                        <li>✓ Private RSA key in .pem file</li>
                        <li>✓ Committed .env file with secrets</li>
                      </ul>
                    </div>

                    <div className="space-y-3">
                      <h3 className="font-semibold text-lg">👤 PII Violations</h3>
                      <ul className="space-y-2 text-sm">
                        <li>✓ Email addresses exposed</li>
                        <li>✓ Phone numbers logged</li>
                        <li>✓ SSN (Social Security Numbers)</li>
                        <li>✓ Aadhaar numbers (Indian ID)</li>
                        <li>✓ Credit card numbers with CVV</li>
                        <li>✓ Bank account details</li>
                        <li>✓ Medical information</li>
                        <li>✓ Full addresses and DOB</li>
                      </ul>
                    </div>

                    <div className="space-y-3">
                      <h3 className="font-semibold text-lg">🔓 Insecure Practices</h3>
                      <ul className="space-y-2 text-sm">
                        <li>✓ Hardcoded username/password pairs</li>
                        <li>✓ Plain text passwords</li>
                        <li>✓ Sensitive data logged to console</li>
                        <li>✓ Tokens stored in localStorage</li>
                        <li>✓ Secrets in sessionStorage</li>
                        <li>✓ Credentials in API request payloads</li>
                        <li>✓ PII exposed in network requests</li>
                      </ul>
                    </div>

                    <div className="space-y-3">
                      <h3 className="font-semibold text-lg">📂 Vulnerable Files</h3>
                      <ul className="space-y-2 text-sm font-mono text-xs">
                        <li>✓ .env (committed with secrets)</li>
                        <li>✓ config.js (root level)</li>
                        <li>✓ private-key.pem</li>
                        <li>✓ src/utils/config.ts</li>
                        <li>✓ src/utils/auth.ts</li>
                        <li>✓ src/utils/userData.ts</li>
                        <li>✓ src/components/UserDashboard.tsx</li>
                        <li>✓ src/components/LoginForm.tsx</li>
                        <li>✓ src/components/ApiTest.tsx</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>How to Use This Repository</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <p>
                    1. <strong>Browse the tabs above</strong> to interact with different vulnerable components
                  </p>
                  <p>
                    2. <strong>Open browser DevTools console</strong> to see logged sensitive data
                  </p>
                  <p>
                    3. <strong>Inspect localStorage/sessionStorage</strong> to see exposed tokens
                  </p>
                  <p>
                    4. <strong>Review source code</strong> in the files listed above to find hardcoded secrets
                  </p>
                  <p>
                    5. <strong>Check the .env file</strong> and root config.js for exposed credentials
                  </p>
                  <p>
                    6. <strong>Use security scanning tools</strong> to detect these vulnerabilities automatically
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="login">
            <LoginForm />
          </TabsContent>

          <TabsContent value="dashboard">
            <UserDashboard />
          </TabsContent>

          <TabsContent value="api">
            <ApiTest />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;

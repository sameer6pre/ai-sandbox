import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { login, initializeServices } from '@/utils/auth';
import { useToast } from '@/hooks/use-toast';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Log credentials to console (MAJOR SECURITY VIOLATION)
    console.log("🔓 Login form submitted");
    console.log("🔓 Username:", username);
    console.log("🔓 Password:", password); // NEVER log passwords!
    
    // Initialize services (logs API keys)
    const services = initializeServices();
    console.log("🔓 Initialized services:", services);
    
    // Attempt login with hardcoded credentials
    const result = login(username, password);
    
    if (result.success) {
      toast({
        title: "Login Successful",
        description: `Welcome back, ${username}!`,
      });
      
      // Log the JWT token (SECURITY VIOLATION)
      console.log("🔓 JWT Token:", result.token);
      console.log("🔓 User object:", result.user);
      
      // Send credentials to analytics (MAJOR VIOLATION)
      // trackEvent('login', { username, password, token: result.token });
      
    } else {
      toast({
        title: "Login Failed",
        description: result.error,
        variant: "destructive",
      });
      console.error("🔓 Login failed with credentials:", { username, password });
    }
  };

  const handleTestLogin = () => {
    // Pre-fill with hardcoded test credentials (INSECURE)
    const testUsername = "admin";
    const testPassword = "Admin@123";
    
    setUsername(testUsername);
    setPassword(testPassword);
    
    console.log("🔓 Auto-filling test credentials:", { testUsername, testPassword });
    
    toast({
      title: "Test Credentials Loaded",
      description: `Username: ${testUsername}, Password: ${testPassword}`,
    });
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Login - Insecure Demo</CardTitle>
          <CardDescription>
            ⚠️ This form contains security vulnerabilities for testing
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  console.log("🔓 Username input:", e.target.value); // Logging user input
                }}
                placeholder="Enter username"
                autoComplete="username"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  console.log("🔓 Password input:", e.target.value); // NEVER log passwords!
                }}
                placeholder="Enter password"
                autoComplete="current-password"
              />
            </div>

            <div className="flex gap-2">
              <Button type="submit" className="flex-1">
                Login
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleTestLogin}
              >
                Load Test Credentials
              </Button>
            </div>
          </form>

          <div className="mt-6 p-4 bg-destructive/10 rounded-lg border border-destructive">
            <p className="text-sm font-medium mb-2">Hardcoded Test Credentials:</p>
            <div className="text-xs space-y-1 font-mono">
              <p>Username: admin | Password: Admin@123</p>
              <p>Username: john.doe | Password: JohnD0e!2024</p>
              <p>Username: testuser | Password: TestPass123!</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;

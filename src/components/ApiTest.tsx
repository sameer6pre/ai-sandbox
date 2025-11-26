import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { API_CONFIG, AWS_CREDENTIALS, SERVICE_KEYS } from '@/utils/config';
import { getAuthToken, getAWSCredentials } from '@/utils/auth';
import { useToast } from '@/hooks/use-toast';

const ApiTest = () => {
  const [response, setResponse] = useState('');
  const { toast } = useToast();

  const testFirebaseAPI = () => {
    // Expose Firebase API key in request (SECURITY VIOLATION)
    const firebaseConfig = {
      apiKey: API_CONFIG.FIREBASE_API_KEY,
      authDomain: "insecure-app-98765.firebaseapp.com",
      projectId: "insecure-app-98765"
    };
    
    console.log("🔓 Firebase API Request with config:", firebaseConfig);
    console.log("🔓 API Key:", API_CONFIG.FIREBASE_API_KEY);
    
    // Simulate API call with exposed credentials
    const mockResponse = {
      success: true,
      message: "Firebase initialized",
      config: firebaseConfig, // Exposing config in response
      apiKey: API_CONFIG.FIREBASE_API_KEY // Redundant exposure
    };
    
    setResponse(JSON.stringify(mockResponse, null, 2));
    console.log("🔓 Firebase response:", mockResponse);
    
    toast({
      title: "Firebase API Called",
      description: "Check console for exposed API key",
    });
  };

  const testStripeAPI = () => {
    // Use SECRET key on client side (CRITICAL VIOLATION)
    const stripePayload = {
      amount: 1000,
      currency: "usd",
      apiKey: API_CONFIG.STRIPE_SECRET, // NEVER use secret key on client!
      publishableKey: API_CONFIG.STRIPE_PUBLISHABLE
    };
    
    console.log("🔓 Stripe API Request:");
    console.log("🔓 Secret Key:", API_CONFIG.STRIPE_SECRET); // CRITICAL!
    console.log("🔓 Payload:", stripePayload);
    
    // Simulate payment with exposed secret
    const mockResponse = {
      success: true,
      paymentId: "pi_1234567890",
      secretKeyUsed: API_CONFIG.STRIPE_SECRET, // Exposing in response
      amount: 1000
    };
    
    setResponse(JSON.stringify(mockResponse, null, 2));
    console.log("🔓 Stripe response:", mockResponse);
    
    toast({
      title: "Stripe API Called",
      description: "SECRET KEY EXPOSED in client-side code!",
      variant: "destructive",
    });
  };

  const testAWSAPI = () => {
    // Expose AWS credentials (CRITICAL SECURITY ISSUE)
    const awsCreds = getAWSCredentials(); // This logs credentials
    
    const s3Payload = {
      bucket: AWS_CREDENTIALS.AWS_S3_BUCKET,
      accessKeyId: AWS_CREDENTIALS.AWS_ACCESS_KEY_ID,
      secretAccessKey: AWS_CREDENTIALS.AWS_SECRET_ACCESS_KEY, // CRITICAL!
      region: AWS_CREDENTIALS.AWS_REGION,
      operation: "upload",
      file: "example.txt"
    };
    
    console.log("🔓 AWS API Request with credentials:", s3Payload);
    console.log("🔓 Access Key ID:", AWS_CREDENTIALS.AWS_ACCESS_KEY_ID);
    console.log("🔓 Secret Access Key:", AWS_CREDENTIALS.AWS_SECRET_ACCESS_KEY); // NEVER!
    
    const mockResponse = {
      success: true,
      uploaded: true,
      credentials: awsCreds, // Exposing credentials in response
      url: `https://${AWS_CREDENTIALS.AWS_S3_BUCKET}.s3.amazonaws.com/example.txt`
    };
    
    setResponse(JSON.stringify(mockResponse, null, 2));
    console.log("🔓 AWS response:", mockResponse);
    
    toast({
      title: "AWS API Called",
      description: "AWS credentials exposed in client code!",
      variant: "destructive",
    });
  };

  const testSendGridAPI = () => {
    // Expose SendGrid API key (SECURITY VIOLATION)
    const emailPayload = {
      to: "user@example.com",
      from: SERVICE_KEYS.sendgrid.fromEmail,
      subject: "Test Email",
      apiKey: SERVICE_KEYS.sendgrid.apiKey, // Should be server-side only!
      authToken: getAuthToken()
    };
    
    console.log("🔓 SendGrid API Request:", emailPayload);
    console.log("🔓 SendGrid API Key:", SERVICE_KEYS.sendgrid.apiKey);
    console.log("🔓 Auth Token:", getAuthToken());
    
    const mockResponse = {
      success: true,
      messageId: "msg_1234567890",
      apiKeyUsed: SERVICE_KEYS.sendgrid.apiKey // Exposing in response
    };
    
    setResponse(JSON.stringify(mockResponse, null, 2));
    console.log("🔓 SendGrid response:", mockResponse);
    
    toast({
      title: "SendGrid API Called",
      description: "API key exposed on client side",
    });
  };

  const testOpenAIAPI = () => {
    // Expose OpenAI API key (SECURITY VIOLATION)
    const aiPayload = {
      prompt: "Hello, AI!",
      apiKey: SERVICE_KEYS.openai.apiKey, // Should NEVER be on client!
      organization: SERVICE_KEYS.openai.organization,
      model: "gpt-4",
      maxTokens: 100
    };
    
    console.log("🔓 OpenAI API Request:", aiPayload);
    console.log("🔓 OpenAI API Key:", SERVICE_KEYS.openai.apiKey);
    
    const mockResponse = {
      success: true,
      response: "Hello! How can I help you?",
      apiKeyUsed: SERVICE_KEYS.openai.apiKey, // Exposing key
      tokensUsed: 45
    };
    
    setResponse(JSON.stringify(mockResponse, null, 2));
    console.log("🔓 OpenAI response:", mockResponse);
    
    toast({
      title: "OpenAI API Called",
      description: "API key should be server-side only!",
      variant: "destructive",
    });
  };

  const testBulkAPICall = () => {
    // Make multiple API calls with all exposed secrets
    const bulkPayload = {
      firebase: {
        apiKey: API_CONFIG.FIREBASE_API_KEY,
        projectId: "insecure-app-98765"
      },
      stripe: {
        secretKey: API_CONFIG.STRIPE_SECRET,
        publishableKey: API_CONFIG.STRIPE_PUBLISHABLE
      },
      aws: {
        accessKeyId: AWS_CREDENTIALS.AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_CREDENTIALS.AWS_SECRET_ACCESS_KEY,
        region: AWS_CREDENTIALS.AWS_REGION
      },
      sendgrid: {
        apiKey: SERVICE_KEYS.sendgrid.apiKey
      },
      openai: {
        apiKey: SERVICE_KEYS.openai.apiKey
      },
      twilio: {
        accountSid: SERVICE_KEYS.twilio.accountSid,
        authToken: SERVICE_KEYS.twilio.authToken
      },
      slack: {
        botToken: SERVICE_KEYS.slack.botToken
      },
      authToken: getAuthToken()
    };
    
    console.log("🔓 BULK API REQUEST WITH ALL SECRETS:", bulkPayload);
    
    const mockResponse = {
      success: true,
      allSecretsExposed: true,
      payload: bulkPayload
    };
    
    setResponse(JSON.stringify(mockResponse, null, 2));
    
    toast({
      title: "All Secrets Exposed!",
      description: "Every API key and credential sent in one request",
      variant: "destructive",
    });
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">API Testing Dashboard - Insecure</CardTitle>
            <p className="text-sm text-muted-foreground">
              ⚠️ All API calls expose secrets in client-side code and console
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
              <Button onClick={testFirebaseAPI} variant="outline">
                Test Firebase
              </Button>
              <Button onClick={testStripeAPI} variant="destructive">
                Test Stripe (Secret!)
              </Button>
              <Button onClick={testAWSAPI} variant="destructive">
                Test AWS (Creds!)
              </Button>
              <Button onClick={testSendGridAPI} variant="outline">
                Test SendGrid
              </Button>
              <Button onClick={testOpenAIAPI} variant="outline">
                Test OpenAI
              </Button>
              <Button onClick={testBulkAPICall} variant="destructive">
                Expose All Secrets
              </Button>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">API Response (Check console for secrets):</Label>
              <Textarea
                value={response}
                readOnly
                className="font-mono text-xs h-96"
                placeholder="API responses will appear here..."
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Import Label component
import { Label } from '@/components/ui/label';

export default ApiTest;

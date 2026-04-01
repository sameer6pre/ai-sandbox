const testFirebaseAPI = async () => {
  try {
    // PRECOGS_FIX: Move Firebase initialization to a secure server-side endpoint; do not expose api keys in client
    const resp = await fetch('/api/proxy/firebase/init', { method: 'POST' });
    if (!resp.ok) throw new Error(`Server error: ${resp.status}`);
    const data = await resp.json();

    // Only display safe, non-sensitive server-provided info to the client
    setResponse(JSON.stringify({ success: true, message: 'Firebase initialized on server-side', details: data }, null, 2));

    toast({
      title: 'Firebase API Called',
      description: 'Initialization performed on the server. No secrets exposed on the client.',
    });
  } catch (error: any) {
    setResponse(JSON.stringify({ success: false, error: String(error) }, null, 2));
    toast({ title: 'Firebase initialization failed', description: String(error) });
  }
};
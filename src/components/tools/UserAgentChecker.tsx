
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Copy } from 'lucide-react';

export function UserAgentChecker() {
  const [userAgent, setUserAgent] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    // navigator is a browser-specific object, so we access it in useEffect
    // to ensure this code only runs on the client-side.
    setUserAgent(navigator.userAgent);
  }, []);

  const handleCopy = () => {
    if (!userAgent) return;
    navigator.clipboard.writeText(userAgent);
    toast({
      title: 'User Agent Copied!',
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your User Agent String</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          readOnly
          value={userAgent || 'Loading...'}
          className="min-h-[150px] font-mono text-sm bg-muted/50"
          aria-label="User Agent String"
        />
        <Button onClick={handleCopy} disabled={!userAgent}>
          <Copy className="mr-2 h-4 w-4" />
          Copy to Clipboard
        </Button>
      </CardContent>
    </Card>
  );
}

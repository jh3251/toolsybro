
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Copy, RefreshCw } from 'lucide-react';
import { Input } from '../ui/input';

export function UuidGenerator() {
  const [uuid, setUuid] = useState('');
  const { toast } = useToast();

  const generateUuid = () => {
    if (typeof window !== 'undefined' && window.crypto) {
        setUuid(crypto.randomUUID());
    } else {
        // Fallback for older environments, though crypto.randomUUID is widely supported
        // @ts-ignore
        setUuid('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        }));
    }
  };

  useEffect(() => {
    generateUuid();
  }, []);

  const handleCopy = () => {
    if (!uuid) return;
    navigator.clipboard.writeText(uuid);
    toast({
      title: 'UUID Copied!',
    });
  };

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="relative">
            <Input
                value={uuid}
                readOnly
                className="font-mono text-center text-lg h-12 pr-10"
                aria-label="Generated UUID"
            />
            <Button
                size="icon"
                variant="ghost"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                onClick={handleCopy}
            >
                <Copy className="h-4 w-4" />
                <span className="sr-only">Copy UUID</span>
            </Button>
        </div>
        <Button onClick={generateUuid} className="w-full">
          <RefreshCw className="mr-2 h-4 w-4" /> Generate New UUID
        </Button>
      </CardContent>
    </Card>
  );
}

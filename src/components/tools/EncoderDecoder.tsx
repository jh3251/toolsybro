
'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Copy, Trash2, ArrowRightLeft, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription } from '../ui/alert';

interface EncoderDecoderProps {
    type: 'base64' | 'url';
}

export function EncoderDecoder({ type }: EncoderDecoderProps) {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const { toast } = useToast();

  const handleEncode = () => {
    setError('');
    try {
        if (!input.trim()) return;
        let result = '';
        if (type === 'base64') {
            result = btoa(input);
        } else {
            result = encodeURIComponent(input);
        }
        setInput(result);
        toast({ title: "Encoded successfully!" });
    } catch (e: any) {
        setError(`Encoding error: ${e.message}`);
    }
  };

  const handleDecode = () => {
    setError('');
    try {
        if (!input.trim()) return;
        let result = '';
        if (type === 'base64') {
            result = atob(input);
        } else {
            result = decodeURIComponent(input);
        }
        setInput(result);
        toast({ title: "Decoded successfully!" });
    } catch (e: any) {
        setError(`Decoding error: ${e.message}`);
    }
  };

  const handleClear = () => {
    setInput('');
    setError('');
  };

  const handleCopy = () => {
    if (!input) return;
    navigator.clipboard.writeText(input);
    toast({
      title: 'Copied to clipboard!',
    });
  };

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex flex-wrap gap-2">
          <Button onClick={handleEncode} disabled={!input}>
            <ArrowRightLeft className="mr-2 h-4 w-4" /> Encode
          </Button>
           <Button onClick={handleDecode} disabled={!input}>
            <ArrowRightLeft className="mr-2 h-4 w-4" /> Decode
          </Button>
          <Button variant="secondary" onClick={handleCopy} disabled={!input}>
            <Copy className="mr-2 h-4 w-4" /> Copy
          </Button>
          <Button variant="destructive" onClick={handleClear} disabled={!input}>
            <Trash2 className="mr-2 h-4 w-4" /> Clear
          </Button>
        </div>
        
        {error && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Textarea
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            if (error) setError('');
          }}
          placeholder="Paste your text or encoded string here..."
          className="min-h-[400px] font-mono text-sm"
          aria-label="Text Input"
        />
      </CardContent>
    </Card>
  );
}

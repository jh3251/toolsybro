'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { Copy, Trash2, Wand2, AlertTriangle } from 'lucide-react';

export function JsonFormatter() {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const { toast } = useToast();

  const handleFormat = () => {
    try {
      if (!input.trim()) {
        setError('');
        return;
      }
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);
      setInput(formatted);
      setError('');
    } catch (e: any) {
      setError(`Invalid JSON: ${e.message}`);
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
      description: 'The formatted JSON has been copied.',
    });
  };

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex flex-wrap gap-2">
          <Button onClick={handleFormat} className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Wand2 className="mr-2 h-4 w-4" /> Format JSON
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
          placeholder="Paste your JSON here..."
          className="min-h-[400px] font-mono text-sm"
          aria-label="JSON Input"
        />
      </CardContent>
    </Card>
  );
}

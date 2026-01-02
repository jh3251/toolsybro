'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Copy, Wand2 } from 'lucide-react';
import { Label } from '../ui/label';

type HashAlgorithm = 'SHA-256' | 'SHA-384' | 'SHA-512';

async function generateHash(algorithm: HashAlgorithm, text: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest(algorithm, data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

export function HashGenerator() {
  const [input, setInput] = useState('Hello World');
  const [output, setOutput] = useState('');
  const [algorithm, setAlgorithm] = useState<HashAlgorithm>('SHA-256');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!input) return;
    setIsLoading(true);
    try {
      const hash = await generateHash(algorithm, input);
      setOutput(hash);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error Generating Hash',
        description: 'Could not generate the hash. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    toast({ title: 'Hash Copied!', description: 'The generated hash has been copied to your clipboard.' });
  };

  return (
    <Card>
        <CardHeader>
            <CardTitle>Generate a Hash</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className='space-y-2'>
                <Label htmlFor='text-input'>Input Text</Label>
                <Textarea 
                    id='text-input'
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder='Enter text to hash'
                    className='min-h-[150px]'
                />
            </div>
             <div className='space-y-2'>
                <Label htmlFor='algorithm'>Algorithm</Label>
                <Select value={algorithm} onValueChange={(v: HashAlgorithm) => setAlgorithm(v)}>
                    <SelectTrigger id='algorithm'>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="SHA-256">SHA-256</SelectItem>
                        <SelectItem value="SHA-384">SHA-384</SelectItem>
                        <SelectItem value="SHA-512">SHA-512</SelectItem>
                    </SelectContent>
                </Select>
             </div>
             <Button onClick={handleGenerate} disabled={isLoading || !input}>
                <Wand2 className='mr-2' />
                {isLoading ? 'Generating...' : 'Generate Hash'}
             </Button>
             <div className='space-y-2'>
                <Label htmlFor='output-hash'>Output Hash</Label>
                 <div className="relative">
                    <Textarea 
                        id='output-hash'
                        readOnly 
                        value={output}
                        className="min-h-[150px] font-mono text-sm bg-muted/50 pr-10"
                        placeholder='Generated hash will appear here...'
                    />
                    <Button variant="ghost" size="icon" className="absolute right-2 top-2 h-8 w-8" onClick={handleCopy} disabled={!output}>
                        <Copy className="h-4 w-4"/>
                    </Button>
                </div>
             </div>
        </CardContent>
    </Card>
  );
}

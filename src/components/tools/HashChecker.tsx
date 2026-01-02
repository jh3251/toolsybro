
'use client';

import { useState, useRef, ChangeEvent } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle2, XCircle, Loader2, UploadCloud, File, Calculator } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

type HashAlgorithm = 'SHA-256' | 'SHA-384' | 'SHA-512';

async function calculateFileHash(algorithm: HashAlgorithm, file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest(algorithm, arrayBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

export function HashChecker() {
  const [file, setFile] = useState<File | null>(null);
  const [expectedHash, setExpectedHash] = useState('');
  const [algorithm, setAlgorithm] = useState<HashAlgorithm>('SHA-256');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{ calculated: string; match: boolean } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setResult(null);
    }
  };

  const handleCalculate = async () => {
    if (!file) {
      toast({ title: 'No file selected', description: 'Please select a file to check.', variant: 'destructive' });
      return;
    }
    if (!expectedHash.trim()) {
        toast({ title: 'No hash provided', description: 'Please enter the expected hash value.', variant: 'destructive' });
        return;
    }

    setIsLoading(true);
    setResult(null);
    try {
      const calculated = await calculateFileHash(algorithm, file);
      const match = calculated.toLowerCase() === expectedHash.trim().toLowerCase();
      setResult({ calculated, match });
    } catch (err) {
      console.error(err);
      toast({ title: 'Error Calculating Hash', description: 'Could not process the file. Please try again.', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>File and Hash Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
                 <div className="space-y-2">
                    <Label>File to Check</Label>
                    <div className="flex items-center gap-2 p-4 border-2 border-dashed rounded-lg">
                        {file ? (
                            <>
                                <File className="w-6 h-6 text-muted-foreground" />
                                <div className='flex-grow'>
                                    <p className="font-semibold truncate">{file.name}</p>
                                    <p className='text-xs text-muted-foreground'>{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                </div>
                                <Button variant="ghost" size="sm" onClick={() => setFile(null)}>Change</Button>
                            </>
                        ) : (
                             <Button variant="outline" className="w-full" onClick={() => fileInputRef.current?.click()}>
                                <UploadCloud className="mr-2"/> Select File
                            </Button>
                        )}
                        <Input ref={fileInputRef} type="file" className="hidden" onChange={handleFileChange} />
                    </div>
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="algorithm">Hash Algorithm</Label>
                    <Select value={algorithm} onValueChange={(v: HashAlgorithm) => setAlgorithm(v)}>
                        <SelectTrigger id="algorithm"><SelectValue /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="SHA-256">SHA-256</SelectItem>
                            <SelectItem value="SHA-384">SHA-384</SelectItem>
                            <SelectItem value="SHA-512">SHA-512</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="expected-hash">Expected Hash</Label>
                    <Input id="expected-hash" value={expectedHash} onChange={(e) => setExpectedHash(e.target.value)} placeholder="Paste the known hash value here" className="font-mono" />
                </div>
                 <Button onClick={handleCalculate} disabled={isLoading || !file}>
                    {isLoading ? <Loader2 className="mr-2 animate-spin" /> : <Calculator className="mr-2" />}
                    {isLoading ? 'Calculating...' : 'Verify Hash'}
                </Button>
            </div>
            <div className='space-y-4'>
                {result && (
                     <Alert variant={result.match ? 'default' : 'destructive'} className='h-full'>
                        {result.match ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                        <AlertTitle>{result.match ? 'Success! Hashes Match' : 'Mismatch! Hashes Do Not Match'}</AlertTitle>
                        <AlertDescription className="space-y-2 break-all">
                             <p><span className="font-semibold">Expected:</span> {expectedHash}</p>
                             <p><span className="font-semibold">Calculated:</span> {result.calculated}</p>
                        </AlertDescription>
                    </Alert>
                )}
                 {!result && (
                     <div className="h-full flex items-center justify-center bg-muted/50 border-dashed border-2 rounded-lg text-muted-foreground text-center p-4">
                        Verification result will appear here.
                    </div>
                 )}
            </div>
        </div>
      </CardContent>
    </Card>
  );
}



'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Copy, RefreshCw } from 'lucide-react';

const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
const numberChars = '0123456789';
const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

export function PasswordGenerator() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  
  const { toast } = useToast();

  const generatePassword = () => {
    let charSet = '';
    if (includeUppercase) charSet += upperCaseChars;
    if (includeLowercase) charSet += lowerCaseChars;
    if (includeNumbers) charSet += numberChars;
    if (includeSymbols) charSet += symbolChars;

    if (charSet === '') {
        toast({
            title: 'No character types selected',
            description: 'Please select at least one character type to generate a password.',
            variant: 'destructive',
        });
        setPassword('');
        return;
    }

    let newPassword = '';
    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);
    for (let i = 0; i < length; i++) {
      newPassword += charSet[array[i] % charSet.length];
    }
    
    setPassword(newPassword);
  };
  
  useEffect(() => {
    generatePassword();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

  const handleCopy = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    toast({ title: 'Password Copied!' });
  };

  return (
    <Card>
      <CardContent className="pt-6 space-y-6">
        <div className="relative">
          <Input
            readOnly
            value={password}
            className="font-mono text-center text-lg h-12 pr-10"
            aria-label="Generated Password"
          />
          <Button
            size="icon"
            variant="ghost"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
            onClick={handleCopy}
          >
            <Copy className="h-4 w-4" />
            <span className="sr-only">Copy Password</span>
          </Button>
        </div>

        <div className="space-y-4">
            <div className="space-y-2">
                <div className="flex justify-between items-center">
                    <Label htmlFor="length">Password Length</Label>
                    <span className="font-bold text-lg">{length}</span>
                </div>
                <Slider id="length" value={[length]} onValueChange={(v) => setLength(v[0])} min={8} max={64} step={1} />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center space-x-2">
                    <Switch id="uppercase" checked={includeUppercase} onCheckedChange={setIncludeUppercase} />
                    <Label htmlFor="uppercase">Uppercase</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <Switch id="lowercase" checked={includeLowercase} onCheckedChange={setIncludeLowercase} />
                    <Label htmlFor="lowercase">Lowercase</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <Switch id="numbers" checked={includeNumbers} onCheckedChange={setIncludeNumbers} />
                    <Label htmlFor="numbers">Numbers</Label>
                </div>
                 <div className="flex items-center space-x-2">
                    <Switch id="symbols" checked={includeSymbols} onCheckedChange={setIncludeSymbols} />
                    <Label htmlFor="symbols">Symbols</Label>
                </div>
            </div>
        </div>

        <Button onClick={generatePassword} className="w-full">
          <RefreshCw className="mr-2 h-4 w-4" /> Regenerate Password
        </Button>
      </CardContent>
    </Card>
  );
}

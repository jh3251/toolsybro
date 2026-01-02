'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Copy, RefreshCw } from 'lucide-react';
import { Input } from '../ui/input';

const adjectives = ["Quick", "Lazy", "Sleepy", "Nosy", "Red", "Blue", "Green", "Funny", "Silly", "Clever", "Brave", "Ancient", "Modern"];
const nouns = ["Fox", "Dog", "Cat", "Panda", "Tiger", "Lion", "Wizard", "Warrior", "Ranger", "Explorer", "River", "Mountain", "Star"];

export function RandomUsernameGenerator() {
  const [username, setUsername] = useState('');
  const { toast } = useToast();

  const generateUsername = () => {
    const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    const num = Math.floor(Math.random() * 900) + 100; // 3-digit number
    setUsername(`${adj}${noun}${num}`);
  };

  useEffect(() => {
    generateUsername();
  }, []);

  const handleCopy = () => {
    if (!username) return;
    navigator.clipboard.writeText(username);
    toast({
      title: 'Username Copied!',
    });
  };

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="relative">
            <Input
                value={username}
                readOnly
                className="font-mono text-center text-lg h-12 pr-10"
                aria-label="Generated Username"
            />
            <Button
                size="icon"
                variant="ghost"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                onClick={handleCopy}
            >
                <Copy className="h-4 w-4" />
                <span className="sr-only">Copy Username</span>
            </Button>
        </div>
        <Button onClick={generateUsername} className="w-full">
          <RefreshCw className="mr-2 h-4 w-4" /> Generate New Username
        </Button>
      </CardContent>
    </Card>
  );
}

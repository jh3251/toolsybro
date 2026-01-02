
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { fontPairings, type FontPair } from '@/lib/font-pairings';
import { RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

function loadFont(fontName: string, weight: number) {
  const fontId = `font-${fontName.replace(/\s+/g, '-')}`;
  if (document.getElementById(fontId)) {
    return;
  }
  const link = document.createElement('link');
  link.id = fontId;
  link.rel = 'stylesheet';
  link.href = `https://fonts.googleapis.com/css2?family=${fontName.replace(/\s+/g, '+')}:wght@${weight}&display=swap`;
  document.head.appendChild(link);
}

export function FontPairingTool() {
  const [currentPair, setCurrentPair] = useState<FontPair | null>(null);
  const { toast } = useToast();

  const generateNewPair = () => {
    const randomIndex = Math.floor(Math.random() * fontPairings.length);
    const newPair = fontPairings[randomIndex];
    setCurrentPair(newPair);
    loadFont(newPair.headline.name, newPair.headline.weight);
    loadFont(newPair.body.name, newPair.body.weight);
  };

  useEffect(() => {
    generateNewPair();
  }, []);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: 'Font family copied!', description: text });
  };

  if (!currentPair) {
    return null; // Or a loading state
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Font Pairing</CardTitle>
          <Button onClick={generateNewPair}>
            <RefreshCw className="mr-2" /> Generate New Pair
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="p-6 border rounded-lg">
          <h2
            className="text-4xl md:text-5xl lg:text-6xl mb-4"
            style={{
              fontFamily: currentPair.headline.family,
              fontWeight: currentPair.headline.weight,
            }}
          >
            The quick brown fox jumps over the lazy dog.
          </h2>
          <p
            className="text-base md:text-lg"
            style={{
              fontFamily: currentPair.body.family,
              fontWeight: currentPair.body.weight,
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Headline</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl" style={{ fontFamily: currentPair.headline.family }}>
                {currentPair.headline.name}
              </p>
              <Button variant="link" className="p-0" onClick={() => handleCopy(currentPair.headline.family)}>
                Copy CSS
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Body Text</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl" style={{ fontFamily: currentPair.body.family }}>
                {currentPair.body.name}
              </p>
               <Button variant="link" className="p-0" onClick={() => handleCopy(currentPair.body.family)}>
                Copy CSS
              </Button>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}

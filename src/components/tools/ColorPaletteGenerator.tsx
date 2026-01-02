
'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { RefreshCw, Copy, Palette } from 'lucide-react';

// Helper to convert HSL to HEX
const hslToHex = (h: number, s: number, l: number) => {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
};

const ColorBox = ({ color, onCopy }: { color: string; onCopy: (hex: string) => void }) => (
  <div
    className="relative h-48 md:h-64 flex-1 group cursor-pointer transition-all duration-300 transform hover:scale-105"
    style={{ backgroundColor: color }}
    onClick={() => onCopy(color)}
  >
    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/50 text-white text-sm font-mono px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
      {color}
    </div>
  </div>
);

export function ColorPaletteGenerator() {
  const [colors, setColors] = useState<string[]>([]);
  const { toast } = useToast();

  const generatePalette = useCallback(() => {
    const newColors = [];
    const baseHue = Math.floor(Math.random() * 360);
    const saturation = 60 + Math.random() * 20; // 60-80%
    const lightness = 65 + Math.random() * 20; // 65-85%

    // Generate a palette (e.g., analogous)
    for (let i = 0; i < 5; i++) {
        const hue = (baseHue + i * 30) % 360;
        const light = lightness - i * 5;
        newColors.push(hslToHex(hue, saturation, light));
    }
    
    setColors(newColors);
  }, []);

  useEffect(() => {
    generatePalette();
  }, [generatePalette]);

  const handleCopy = (hex: string) => {
    navigator.clipboard.writeText(hex);
    toast({
      title: 'Color Copied!',
      description: hex,
      style: { backgroundColor: hex, color: lightness(hex) > 0.5 ? 'black' : 'white' },
    });
  };
  
  // Helper to determine text color based on background lightness
  const lightness = (hex: string) => {
    const rgb = parseInt(hex.substring(1), 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = (rgb >> 0) & 0xff;
    return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  }

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex justify-center">
            <Button onClick={generatePalette}>
                <RefreshCw className="mr-2" /> Generate New Palette
            </Button>
        </div>
        <div className="flex flex-col md:flex-row overflow-hidden rounded-lg border">
          {colors.map((color) => (
            <ColorBox key={color} color={color} onCopy={handleCopy} />
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-2">
            {colors.map(color => (
                <div key={`chip-${color}`} className="flex items-center gap-2 bg-muted p-2 rounded-md">
                    <div className="w-5 h-5 rounded-sm border" style={{ backgroundColor: color }} />
                    <span className="font-mono text-sm">{color}</span>
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleCopy(color)}>
                        <Copy className="h-4 w-4" />
                    </Button>
                </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
}

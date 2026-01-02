
'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Copy } from 'lucide-react';

export function BorderRadiusGenerator() {
  const [allCorners, setAllCorners] = useState(25);
  const [topLeft, setTopLeft] = useState(25);
  const [topRight, setTopRight] = useState(25);
  const [bottomRight, setBottomRight] = useState(25);
  const [bottomLeft, setBottomLeft] = useState(25);
  const [isLinked, setIsLinked] = useState(true);

  const { toast } = useToast();

  const handleSliderChange = (value: number, corner: 'all' | 'tl' | 'tr' | 'br' | 'bl') => {
    if (isLinked || corner === 'all') {
      setAllCorners(value);
      setTopLeft(value);
      setTopRight(value);
      setBottomLeft(value);
      setBottomRight(value);
    } else {
      switch (corner) {
        case 'tl': setTopLeft(value); break;
        case 'tr': setTopRight(value); break;
        case 'br': setBottomRight(value); break;
        case 'bl': setBottomLeft(value); break;
      }
    }
  };

  const borderRadiusValue = isLinked
    ? `${allCorners}px`
    : `${topLeft}px ${topRight}px ${bottomRight}px ${bottomLeft}px`;

  const cssCode = `border-radius: ${borderRadiusValue};`;

  const handleCopy = () => {
    navigator.clipboard.writeText(cssCode);
    toast({ title: 'Copied to clipboard!', description: cssCode });
  };

  return (
    <Card>
      <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <Switch id="link-corners" checked={isLinked} onCheckedChange={setIsLinked} />
            <Label htmlFor="link-corners">Sync all corners</Label>
          </div>

          {isLinked ? (
            <div className="space-y-2">
              <Label htmlFor="all-corners">All Corners</Label>
              <Slider id="all-corners" value={[allCorners]} onValueChange={(v) => handleSliderChange(v[0], 'all')} min={0} max={150} />
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="top-left">Top Left</Label>
                <Slider id="top-left" value={[topLeft]} onValueChange={(v) => handleSliderChange(v[0], 'tl')} min={0} max={150} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="top-right">Top Right</Label>
                <Slider id="top-right" value={[topRight]} onValueChange={(v) => handleSliderChange(v[0], 'tr')} min={0} max={150} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bottom-left">Bottom Left</Label>
                <Slider id="bottom-left" value={[bottomLeft]} onValueChange={(v) => handleSliderChange(v[0], 'bl')} min={0} max={150} />
              </div>
               <div className="space-y-2">
                <Label htmlFor="bottom-right">Bottom Right</Label>
                <Slider id="bottom-right" value={[bottomRight]} onValueChange={(v) => handleSliderChange(v[0], 'br')} min={0} max={150} />
              </div>
            </div>
          )}
          
          <div className="space-y-2 pt-4">
            <Label>Generated CSS</Label>
            <div className="relative">
                <Input readOnly value={cssCode} className="font-mono pr-10" />
                <Button variant="ghost" size="icon" className="absolute right-1 top-1 h-8 w-8" onClick={handleCopy}>
                    <Copy className="h-4 w-4"/>
                </Button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center bg-muted/50 p-4 rounded-lg">
          <div
            className="w-64 h-64 bg-primary transition-all duration-200"
            style={{ borderRadius: borderRadiusValue }}
          />
        </div>
      </CardContent>
    </Card>
  );
}

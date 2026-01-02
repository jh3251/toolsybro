
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

export function BoxShadowGenerator() {
  const [hOffset, setHOffset] = useState(10);
  const [vOffset, setVOffset] = useState(10);
  const [blur, setBlur] = useState(5);
  const [spread, setSpread] = useState(0);
  const [color, setColor] = useState('#000000');
  const [opacity, setOpacity] = useState(0.5);
  const [inset, setInset] = useState(false);

  const { toast } = useToast();

  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const shadowColor = hexToRgba(color, opacity);
  const boxShadowValue = `${inset ? 'inset ' : ''}${hOffset}px ${vOffset}px ${blur}px ${spread}px ${shadowColor}`;
  const cssCode = `box-shadow: ${boxShadowValue};`;

  const handleCopy = () => {
    navigator.clipboard.writeText(cssCode);
    toast({ title: 'Copied to clipboard!', description: cssCode });
  };

  return (
    <Card>
      <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="h-offset">Horizontal Offset: {hOffset}px</Label>
            <Slider id="h-offset" value={[hOffset]} onValueChange={(v) => setHOffset(v[0])} min={-100} max={100} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="v-offset">Vertical Offset: {vOffset}px</Label>
            <Slider id="v-offset" value={[vOffset]} onValueChange={(v) => setVOffset(v[0])} min={-100} max={100} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="blur">Blur Radius: {blur}px</Label>
            <Slider id="blur" value={[blur]} onValueChange={(v) => setBlur(v[0])} min={0} max={100} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="spread">Spread Radius: {spread}px</Label>
            <Slider id="spread" value={[spread]} onValueChange={(v) => setSpread(v[0])} min={-50} max={50} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="opacity">Opacity: {opacity.toFixed(2)}</Label>
            <Slider id="opacity" value={[opacity]} onValueChange={(v) => setOpacity(v[0])} min={0} max={1} step={0.05} />
          </div>
          <div className="flex items-center justify-between">
             <div className="flex items-center space-x-2">
                <Switch id="inset-switch" checked={inset} onCheckedChange={setInset} />
                <Label htmlFor="inset-switch">Inset</Label>
            </div>
            <div className="flex items-center gap-2">
                <Label htmlFor="shadow-color">Color</Label>
                <Input id="shadow-color" type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-16 p-1"/>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-center bg-muted/50 p-8 rounded-lg h-64">
            <div className="w-48 h-48 bg-background rounded-lg transition-all duration-200" style={{ boxShadow: boxShadowValue }} />
          </div>
           <div className="space-y-2">
                <Label>Generated CSS</Label>
                <div className="relative">
                    <Input readOnly value={cssCode} className="font-mono pr-10" />
                    <Button variant="ghost" size="icon" className="absolute right-1 top-1 h-8 w-8" onClick={handleCopy}>
                        <Copy className="h-4 w-4"/>
                    </Button>
                </div>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}

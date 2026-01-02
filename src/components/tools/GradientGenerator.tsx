
'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Copy, Plus, Trash2 } from 'lucide-react';

interface ColorStop {
  id: number;
  color: string;
  position: number;
}

export function GradientGenerator() {
  const [type, setType] = useState<'linear' | 'radial'>('linear');
  const [angle, setAngle] = useState(90);
  const [colorStops, setColorStops] = useState<ColorStop[]>([
    { id: 1, color: '#6366f1', position: 0 },
    { id: 2, color: '#a855f7', position: 100 },
  ]);
  const { toast } = useToast();

  const addColorStop = () => {
    const newPosition = colorStops.length > 0 ? Math.min(100, colorStops[colorStops.length-1].position + 10) : 50;
    setColorStops([...colorStops, { id: Date.now(), color: '#ffffff', position: newPosition }]);
  };

  const removeColorStop = (id: number) => {
    if (colorStops.length > 2) {
      setColorStops(colorStops.filter(stop => stop.id !== id));
    }
  };

  const updateColorStop = (id: number, field: 'color' | 'position', value: string | number) => {
    setColorStops(colorStops.map(stop => stop.id === id ? { ...stop, [field]: value } : stop));
  };
  
  const sortedStops = [...colorStops].sort((a,b) => a.position - b.position);

  const gradientValue = sortedStops.map(s => `${s.color} ${s.position}%`).join(', ');

  const cssCode = type === 'linear'
    ? `background: linear-gradient(${angle}deg, ${gradientValue});`
    : `background: radial-gradient(circle, ${gradientValue});`;

  const handleCopy = () => {
    navigator.clipboard.writeText(cssCode);
    toast({ title: 'Copied to clipboard!', description: cssCode });
  };

  return (
    <Card>
      <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8">
        <div>
            <div className="w-full h-80 rounded-lg border" style={{ background: cssCode.replace('background: ', '').slice(0,-1) }}/>
            <div className="space-y-2 mt-4">
                <Label>Generated CSS</Label>
                <div className="relative">
                    <Input readOnly value={cssCode} className="font-mono pr-10" />
                    <Button variant="ghost" size="icon" className="absolute right-1 top-1 h-8 w-8" onClick={handleCopy}>
                        <Copy className="h-4 w-4"/>
                    </Button>
                </div>
            </div>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
             <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Select value={type} onValueChange={(v: any) => setType(v)}>
                    <SelectTrigger id="type"><SelectValue/></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="linear">Linear</SelectItem>
                        <SelectItem value="radial">Radial</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            {type === 'linear' && (
                <div className="space-y-2">
                    <Label htmlFor="angle">Angle</Label>
                    <Input id="angle" type="number" value={angle} onChange={(e) => setAngle(Number(e.target.value))} />
                </div>
            )}
          </div>
          
          <div className="space-y-4">
            <Label>Color Stops</Label>
            {colorStops.map(stop => (
              <div key={stop.id} className="flex items-center gap-2 p-2 border rounded-md">
                <Input type="color" value={stop.color} onChange={(e) => updateColorStop(stop.id, 'color', e.target.value)} className="w-12 h-10 p-1" />
                <Slider value={[stop.position]} onValueChange={(v) => updateColorStop(stop.id, 'position', v[0])} min={0} max={100} />
                <span className="text-xs w-10 text-center">{stop.position}%</span>
                <Button variant="ghost" size="icon" onClick={() => removeColorStop(stop.id)} disabled={colorStops.length <= 2}>
                    <Trash2 className="h-4 w-4 text-destructive"/>
                </Button>
              </div>
            ))}
             <Button variant="outline" onClick={addColorStop} className="w-full">
                <Plus className="mr-2"/> Add Color Stop
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

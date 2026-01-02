
'use client';

import { useState, useRef, useEffect } from 'react';
import JsBarcode from 'jsbarcode';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Download, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription } from '../ui/alert';

type BarcodeFormat = "CODE128" | "EAN13" | "UPC" | "CODE39" | "ITF" | "MSI";

const defaultValues: Record<BarcodeFormat, string> = {
    CODE128: "Example 123",
    EAN13: "9780141036144", // Needs 12 digits + checksum
    UPC: "036000291452", // Needs 11 digits + checksum
    CODE39: "CODE39 EXAMPLE",
    ITF: "123456", // Needs even number of digits
    MSI: "123456"
};

export function BarcodeGenerator() {
  const [format, setFormat] = useState<BarcodeFormat>("CODE128");
  const [text, setText] = useState<string>(defaultValues.CODE128);
  const [error, setError] = useState('');

  // Customization options
  const [barWidth, setBarWidth] = useState(2);
  const [barHeight, setBarHeight] = useState(100);
  const [showText, setShowText] = useState(true);
  const [lineColor, setLineColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    setText(defaultValues[format]);
  }, [format]);
  
  useEffect(() => {
    if (canvasRef.current) {
      try {
        JsBarcode(canvasRef.current, text, {
          format: format,
          lineColor: lineColor,
          background: bgColor,
          width: barWidth,
          height: barHeight,
          displayValue: showText,
          fontOptions: "bold",
        });
        setError('');
      } catch (e: any) {
        setError(e.message);
      }
    }
  }, [text, format, barWidth, barHeight, showText, lineColor, bgColor]);

  const handleDownload = () => {
    if (!canvasRef.current || error) {
        toast({ title: "Cannot Download", description: error || "Please generate a valid barcode first.", variant: 'destructive'});
        return;
    }
    const link = document.createElement('a');
    link.download = `${format}-${text}.png`;
    link.href = canvasRef.current.toDataURL("image/png");
    link.click();
  };

  return (
    <Card>
      <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-6">
            <div>
                <Label htmlFor="format">Barcode Format</Label>
                <Select value={format} onValueChange={(v: BarcodeFormat) => setFormat(v)}>
                    <SelectTrigger id="format"><SelectValue /></SelectTrigger>
                    <SelectContent>
                        {Object.keys(defaultValues).map(f => <SelectItem key={f} value={f}>{f}</SelectItem>)}
                    </SelectContent>
                </Select>
            </div>
             <div>
                <Label htmlFor="text">Data</Label>
                <Input id="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Data to encode" />
                 <p className="text-xs text-muted-foreground mt-1">E.g., {defaultValues[format]}</p>
            </div>
            
            <h3 className='text-lg font-semibold border-t pt-4'>Customization</h3>

            <div className='grid grid-cols-2 gap-4'>
                <div className='space-y-2'>
                    <Label htmlFor="barWidth">Bar Width</Label>
                    <Input id="barWidth" type="number" value={barWidth} onChange={e => setBarWidth(Number(e.target.value))} />
                </div>
                 <div className='space-y-2'>
                    <Label htmlFor="barHeight">Bar Height</Label>
                    <Input id="barHeight" type="number" value={barHeight} onChange={e => setBarHeight(Number(e.target.value))} />
                </div>
                 <div className='space-y-2'>
                    <Label htmlFor="lineColor">Line Color</Label>
                    <Input id="lineColor" type="color" value={lineColor} onChange={e => setLineColor(e.target.value)} className="p-1" />
                </div>
                 <div className='space-y-2'>
                    <Label htmlFor="bgColor">Background</Label>
                    <Input id="bgColor" type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} className="p-1" />
                </div>
            </div>

            <div className="flex items-center space-x-2">
                <Switch id="showText" checked={showText} onCheckedChange={setShowText} />
                <Label htmlFor="showText">Show text value</Label>
            </div>

            <Button onClick={handleDownload} disabled={!!error}>
                <Download className="mr-2" /> Download Barcode
            </Button>
        </div>
        <div className="md:col-span-2 flex flex-col items-center justify-center bg-muted/50 p-4 rounded-lg min-h-[300px]">
            {error ? (
                <Alert variant="destructive" className="w-full">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            ) : (
                <canvas ref={canvasRef} />
            )}
        </div>
      </CardContent>
    </Card>
  );
}

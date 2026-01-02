
'use client';

import { useState, useRef, ChangeEvent, MouseEvent } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UploadCloud, Download, Trash2, Wand2, MousePointerClick, Palette } from 'lucide-react';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { Label } from '../ui/label';
import { Slider } from '../ui/slider';

// Helper function to convert hex to RGB
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
}

export function ImageBackgroundRemover() {
  const [originalImage, setOriginalImage] = useState<File | null>(null);
  const [originalImageUrl, setOriginalImageUrl] = useState<string>('');
  const [resultImageUrl, setResultImageUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  
  const [selectedColor, setSelectedColor] = useState({ r: 0, g: 255, b: 0 }); // Default to green
  const [tolerance, setTolerance] = useState(20);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const originalCanvasRef = useRef<HTMLCanvasElement>(null);

  const { toast } = useToast();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      handleReset();
      setOriginalImage(file);
      const url = URL.createObjectURL(file);
      setOriginalImageUrl(url);
      
      // Draw image to original canvas to allow color picking
      const img = document.createElement('img');
      img.src = url;
      img.onload = () => {
          if (originalCanvasRef.current) {
              const canvas = originalCanvasRef.current;
              canvas.width = img.naturalWidth;
              canvas.height = img.naturalHeight;
              const ctx = canvas.getContext('2d');
              ctx?.drawImage(img, 0, 0);
          }
      }
    }
  };

  const handleReset = () => {
    setOriginalImage(null);
    setOriginalImageUrl('');
    setResultImageUrl('');
    setIsLoading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  const handleColorPick = (e: MouseEvent<HTMLCanvasElement>) => {
    if (!originalCanvasRef.current) return;
    const canvas = originalCanvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;
    const pixel = ctx.getImageData(x * (canvas.width / rect.width), y * (canvas.height / rect.height), 1, 1).data;
    setSelectedColor({ r: pixel[0], g: pixel[1], b: pixel[2] });
    toast({
        title: 'Color Selected',
        description: `RGB(${pixel[0]}, ${pixel[1]}, ${pixel[2]}) has been selected as the color to remove.`,
    });
  }

  const handleRemoveBackground = async () => {
    if (!originalImageUrl || !originalImage) return;

    setIsLoading(true);
    setResultImageUrl(''); // Clear previous result

    const img = document.createElement('img');
    img.src = originalImageUrl;
    img.onload = () => {
        if (!canvasRef.current) {
            setIsLoading(false);
            return;
        }
        const canvas = canvasRef.current;
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            setIsLoading(false);
            return;
        }

        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        
        for (let i = 0; i < data.length; i+= 4) {
            const r = data[i];
            const g = data[i+1];
            const b = data[i+2];

            const distance = Math.sqrt(
                Math.pow(r - selectedColor.r, 2) +
                Math.pow(g - selectedColor.g, 2) +
                Math.pow(b - selectedColor.b, 2)
            );

            if (distance < tolerance) {
                data[i+3] = 0; // Set alpha to 0 to make it transparent
            }
        }
        ctx.putImageData(imageData, 0, 0);
        setResultImageUrl(canvas.toDataURL('image/png'));
        toast({
            title: 'Background Removed!',
            description: 'The selected color has been made transparent.',
        });
        setIsLoading(false);
    }
    img.onerror = () => {
        toast({ title: "Error loading image", variant: "destructive" });
        setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (!resultImageUrl) return;
    const link = document.createElement('a');
    link.href = resultImageUrl;
    const name = originalImage?.name.substring(0, originalImage.name.lastIndexOf('.'));
    link.download = `${name || 'image'}-no-bg.png`; // Result is always PNG
    link.click();
  };

  return (
    <Card>
      <CardContent className="pt-6">
        {!originalImageUrl ? (
          <div
            className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            <UploadCloud className="w-16 h-16 text-muted-foreground" />
            <p className="mt-4 text-lg font-semibold">Click or drag image to upload</p>
            <p className="text-muted-foreground">Supports PNG, JPG, WEBP</p>
            <Input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept="image/png, image/jpeg, image/webp"
              onChange={handleFileChange}
            />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              <div className="space-y-2">
                 <h3 className="text-center font-semibold flex items-center justify-center gap-2">
                    <MousePointerClick className="w-5 h-5"/>
                    1. Click image to select color to remove
                 </h3>
                 <div className="bg-muted/50 p-4 rounded-lg flex justify-center cursor-pointer">
                    <canvas ref={originalCanvasRef} onClick={handleColorPick} className="max-w-full h-auto object-contain max-h-[400px]"/>
                 </div>
                 <div className='flex items-center gap-4'>
                    <div className='flex items-center gap-2'>
                        <Label>Selected:</Label>
                        <div className='w-8 h-8 rounded border' style={{ backgroundColor: `rgb(${selectedColor.r}, ${selectedColor.g}, ${selectedColor.b})`}} />
                    </div>
                     <div className='flex-grow space-y-1'>
                        <Label>Tolerance: {tolerance}</Label>
                        <Slider value={[tolerance]} onValueChange={(v) => setTolerance(v[0])} min={0} max={150} step={1} />
                    </div>
                 </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-center font-semibold flex items-center justify-center gap-2">
                    <Wand2 className="w-5 h-5"/>
                    2. Remove Background & Download
                </h3>
                <div className="bg-muted/50 p-4 rounded-lg flex justify-center min-h-[400px] items-center" 
                     style={{ 
                       backgroundImage: 'repeating-conic-gradient(#d1d5db 0% 25%, transparent 0% 50%)',
                       backgroundSize: '16px 16px'
                     }}
                >
                    {resultImageUrl ? (
                        <Image
                            src={resultImageUrl}
                            alt="Background removed"
                            width={300}
                            height={300}
                            className="rounded-lg object-contain w-full h-auto max-h-[400px]"
                        />
                    ) : (
                        <canvas ref={canvasRef} className="hidden" />
                    )}
                     {!resultImageUrl && 
                        <div className="text-center text-muted-foreground">
                            <p>Result will appear here</p>
                        </div>
                     }
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              <Button onClick={handleRemoveBackground} disabled={isLoading || !originalImage}>
                <Wand2 className="mr-2" />
                {isLoading ? 'Removing...' : 'Remove Selected Color'}
              </Button>
              <Button onClick={handleDownload} disabled={!resultImageUrl || isLoading}>
                <Download className="mr-2" /> Download Result
              </Button>
              <Button variant="outline" onClick={handleReset}>
                <Trash2 className="mr-2" /> New Image
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

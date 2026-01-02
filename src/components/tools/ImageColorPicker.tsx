
'use client';

import { useState, useRef, ChangeEvent, MouseEvent } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UploadCloud, Trash2, Copy, Palette, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useColor } from 'color-thief-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"


export function ImageColorPicker() {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [hoveredColor, setHoveredColor] = useState<{ hex: string; rgb: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  const { data: colorPalette } = useColor(imageUrl, 'hex', {
    crossOrigin: 'anonymous',
    quality: 10,
    count: 8,
  });

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      handleReset();
      const reader = new FileReader();
      reader.onload = (e) => {
        const url = e.target?.result as string;
        setImageUrl(url);
        const img = new Image();
        img.onload = () => {
          if (canvasRef.current) {
            const canvas = canvasRef.current;
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx?.drawImage(img, 0, 0);
          }
        };
        img.src = url;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleReset = () => {
    setImageUrl('');
    setHoveredColor(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    if (canvasRef.current) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx?.clearRect(0,0, canvas.width, canvas.height);
        canvas.width = 0;
        canvas.height = 0;
    }
  };

  const handleCopy = (text: string, title: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: `${title} Copied!`,
      description: text,
    });
  };

  const handleMouseMove = (e: MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor(e.clientX - rect.left);
    const y = Math.floor(e.clientY - rect.top);
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const pixel = ctx.getImageData(x, y, 1, 1).data;
    const r = pixel[0];
    const g = pixel[1];
    const b = pixel[2];
    const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
    const rgb = `rgb(${r}, ${g}, ${b})`;
    setHoveredColor({ hex, rgb });
  };

  return (
    <Card>
      <CardContent className="pt-6">
        {!imageUrl ? (
          <div
            className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            <UploadCloud className="w-16 h-16 text-muted-foreground" />
            <p className="mt-4 text-lg font-semibold">Click or drag image to upload</p>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative cursor-crosshair">
                <canvas 
                    ref={canvasRef}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={() => setHoveredColor(null)}
                    className="max-w-full h-auto rounded-lg shadow-md"
                />
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                    <h3 className="text-lg font-semibold flex items-center gap-2"><Eye /> Pick a Color</h3>
                    <p className="text-sm text-muted-foreground">Hover over the image to pick a color.</p>
                </div>
                 {hoveredColor ? (
                    <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
                        <div className="w-16 h-16 rounded-md border" style={{ backgroundColor: hoveredColor.hex }} />
                        <div className="space-y-1">
                            <div className='flex items-center gap-2'>
                                <p className="font-mono text-sm">{hoveredColor.hex}</p>
                                <Button size='icon' variant='ghost' className='h-6 w-6' onClick={() => handleCopy(hoveredColor.hex, 'HEX')}>
                                    <Copy className='h-4 w-4' />
                                </Button>
                            </div>
                             <div className='flex items-center gap-2'>
                                <p className="font-mono text-xs">{hoveredColor.rgb}</p>
                                <Button size='icon' variant='ghost' className='h-6 w-6' onClick={() => handleCopy(hoveredColor.rgb, 'RGB')}>
                                    <Copy className='h-4 w-4' />
                                </Button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="h-24 flex items-center justify-center text-muted-foreground text-sm">
                        Hover to see color details
                    </div>
                )}

                 <div className="space-y-2">
                    <h3 className="text-lg font-semibold flex items-center gap-2"><Palette /> Color Palette</h3>
                     <p className="text-sm text-muted-foreground">Main colors detected in the image.</p>
                </div>
                {colorPalette ? (
                  <div className="grid grid-cols-4 lg:grid-cols-8 gap-2">
                    {colorPalette.map((color) => (
                      <TooltipProvider key={color}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div
                              className="h-12 w-12 rounded-md border cursor-pointer transition-transform hover:scale-110"
                              style={{ backgroundColor: color }}
                              onClick={() => handleCopy(color, 'HEX')}
                            />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{color}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ))}
                  </div>
                ) : (
                    <div className="h-16 flex items-center justify-center text-muted-foreground text-sm">
                        Generating palette...
                    </div>
                )}
                 <Button variant="outline" onClick={handleReset} className="w-full">
                    <Trash2 className="mr-2 h-4 w-4" /> Change Image
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}


'use client';

import { useState, useRef, useEffect, ChangeEvent } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UploadCloud, Download, Trash2, TextIcon, ImageIcon, Wand2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type WatermarkPosition = 'center' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'tile';

export function ImageWatermarkTool() {
  const [baseImage, setBaseImage] = useState<File | null>(null);
  const [baseImageUrl, setBaseImageUrl] = useState('');
  const [watermarkType, setWatermarkType] = useState<'text' | 'image'>('text');
  const [watermarkText, setWatermarkText] = useState('© YourBrand');
  const [watermarkImage, setWatermarkImage] = useState<File | null>(null);
  const [watermarkImageUrl, setWatermarkImageUrl] = useState('');
  const [opacity, setOpacity] = useState(0.5);
  const [color, setColor] = useState('#ffffff');
  const [fontSize, setFontSize] = useState(48);
  const [position, setPosition] = useState<WatermarkPosition>('center');
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const baseImageInputRef = useRef<HTMLInputElement>(null);
  const watermarkImageInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (!baseImage) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const baseImg = new Image();
    baseImg.crossOrigin = "anonymous";
    baseImg.src = baseImageUrl;
    baseImg.onload = () => {
        canvas.width = baseImg.naturalWidth;
        canvas.height = baseImg.naturalHeight;
        
        ctx.clearRect(0,0, canvas.width, canvas.height);
        ctx.drawImage(baseImg, 0, 0);

        ctx.globalAlpha = opacity;
        
        if (watermarkType === 'text') {
            ctx.fillStyle = color;
            ctx.font = `${fontSize}px Arial`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            const drawText = (x: number, y: number) => {
              ctx.fillText(watermarkText, x, y);
            };

            if (position === 'tile') {
                const textWidth = ctx.measureText(watermarkText).width;
                const patternSize = Math.max(textWidth, fontSize) * 1.5;
                for (let y = patternSize / 2; y < canvas.height; y += patternSize) {
                    for (let x = patternSize / 2; x < canvas.width; x += patternSize) {
                        drawText(x, y);
                    }
                }
            } else {
                 const { x, y } = getCoordinates(position, canvas.width, canvas.height, ctx.measureText(watermarkText).width, fontSize);
                 drawText(x, y);
            }
        } else if (watermarkType === 'image' && watermarkImageUrl) {
            const wmImg = new Image();
            wmImg.crossOrigin = "anonymous";
            wmImg.src = watermarkImageUrl;
            wmImg.onload = () => {
                const wmWidth = Math.min(wmImg.width, canvas.width * 0.2);
                const wmHeight = wmImg.height * (wmWidth / wmImg.width);

                const drawImage = (x: number, y: number) => {
                    ctx.drawImage(wmImg, x - wmWidth / 2, y - wmHeight / 2, wmWidth, wmHeight);
                }
                
                if (position === 'tile') {
                    for (let y = wmHeight; y < canvas.height; y += wmHeight * 2) {
                        for (let x = wmWidth; x < canvas.width; x += wmWidth * 2) {
                            drawImage(x, y);
                        }
                    }
                } else {
                    const { x, y } = getCoordinates(position, canvas.width, canvas.height, wmWidth, wmHeight);
                    drawImage(x, y);
                }
            }
        }
    };
  }, [baseImage, baseImageUrl, watermarkType, watermarkText, watermarkImage, watermarkImageUrl, opacity, color, fontSize, position]);

  const getCoordinates = (pos: WatermarkPosition, cW: number, cH: number, w: number, h: number) => {
    const margin = 20;
    switch(pos) {
        case 'topLeft': return { x: margin + w/2, y: margin + h/2 };
        case 'topRight': return { x: cW - margin - w/2, y: margin + h/2 };
        case 'bottomLeft': return { x: margin + w/2, y: cH - margin - h/2 };
        case 'bottomRight': return { x: cW - margin - w/2, y: cH - margin - h/2 };
        case 'center': default: return { x: cW / 2, y: cH / 2 };
    }
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>, type: 'base' | 'watermark') => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
        const url = URL.createObjectURL(file);
        if (type === 'base') {
            setBaseImage(file);
            setBaseImageUrl(url);
        } else {
            setWatermarkImage(file);
            setWatermarkImageUrl(url);
        }
    }
  };

  const handleDownload = () => {
    if (!canvasRef.current || !baseImage) {
        toast({ title: "No image to download", description: "Please upload an image first.", variant: "destructive" });
        return;
    }
    const link = document.createElement('a');
    link.download = `watermarked-${baseImage.name}`;
    link.href = canvasRef.current.toDataURL();
    link.click();
    toast({ title: "Image Downloaded", description: "Your watermarked image has been saved."});
  }

  const handleReset = () => {
    setBaseImage(null);
    setBaseImageUrl('');
    if(baseImageInputRef.current) baseImageInputRef.current.value = '';
    if (canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d');
        ctx?.clearRect(0,0,canvasRef.current.width, canvasRef.current.height);
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        {!baseImage ? (
          <div
            className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary transition-colors"
            onClick={() => baseImageInputRef.current?.click()}
          >
            <UploadCloud className="w-16 h-16 text-muted-foreground" />
            <p className="mt-4 text-lg font-semibold">Click or drag main image to upload</p>
            <Input
              ref={baseImageInputRef}
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(e) => handleFileChange(e, 'base')}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
                <div className="flex justify-center bg-muted/50 p-4 rounded-lg">
                    <canvas ref={canvasRef} className="max-w-full h-auto rounded-lg shadow-md" />
                </div>
                 <div className="flex flex-wrap gap-2">
                    <Button onClick={handleDownload}><Download className="mr-2"/> Download Image</Button>
                    <Button variant="outline" onClick={handleReset}><Trash2 className="mr-2"/> New Image</Button>
                </div>
            </div>
            <div className="space-y-6">
              <Tabs value={watermarkType} onValueChange={(v) => setWatermarkType(v as 'text' | 'image')} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="text"><TextIcon className="mr-2"/>Text</TabsTrigger>
                    <TabsTrigger value="image"><ImageIcon className="mr-2"/>Image</TabsTrigger>
                </TabsList>
                <TabsContent value="text" className='space-y-4 pt-4'>
                    <div className="space-y-2">
                        <Label htmlFor="wm-text">Watermark Text</Label>
                        <Input id="wm-text" value={watermarkText} onChange={(e) => setWatermarkText(e.target.value)} />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="wm-color">Text Color</Label>
                        <Input id="wm-color" type="color" value={color} onChange={(e) => setColor(e.target.value)} className="h-10 p-1"/>
                    </div>
                    <div className="space-y-2">
                        <Label>Font Size</Label>
                        <Slider value={[fontSize]} onValueChange={(v) => setFontSize(v[0])} min={8} max={128} step={1} />
                    </div>
                </TabsContent>
                <TabsContent value="image" className='pt-4'>
                    <div className="space-y-2">
                        <Label>Watermark Image</Label>
                        <Input ref={watermarkImageInputRef} type="file" accept="image/png, image/jpeg, image/webp" onChange={(e) => handleFileChange(e, 'watermark')} />
                    </div>
                </TabsContent>
              </Tabs>
              <div className="space-y-4 border-t pt-4">
                <div className="space-y-2">
                    <Label>Position</Label>
                    <Select value={position} onValueChange={(v) => setPosition(v as WatermarkPosition)}>
                        <SelectTrigger><SelectValue/></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="center">Center</SelectItem>
                            <SelectItem value="topLeft">Top Left</SelectItem>
                            <SelectItem value="topRight">Top Right</SelectItem>
                            <SelectItem value="bottomLeft">Bottom Left</SelectItem>
                            <SelectItem value="bottomRight">Bottom Right</SelectItem>
                            <SelectItem value="tile">Tile</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label>Opacity</Label>
                    <Slider value={[opacity]} onValueChange={(v) => setOpacity(v[0])} min={0} max={1} step={0.05} />
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

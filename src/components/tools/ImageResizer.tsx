'use client';

import { useState, useRef, ChangeEvent } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { UploadCloud, Download, Trash2, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';

export function ImageResizer() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [resizedUrl, setResizedUrl] = useState<string>('');
  const [width, setWidth] = useState<number | ''>('');
  const [height, setHeight] = useState<number | ''>('');
  const [originalWidth, setOriginalWidth] = useState(0);
  const [originalHeight, setOriginalHeight] = useState(0);
  const [keepAspectRatio, setKeepAspectRatio] = useState(true);
  const [isResizing, setIsResizing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      handleReset();
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = document.createElement('img');
        img.onload = () => {
          setOriginalWidth(img.width);
          setOriginalHeight(img.height);
          setWidth(img.width);
          setHeight(img.height);
          setImageUrl(e.target?.result as string);
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleReset = () => {
    setImageFile(null);
    setImageUrl('');
    setResizedUrl('');
    setWidth('');
    setHeight('');
    setOriginalWidth(0);
    setOriginalHeight(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  const handleWidthChange = (e: ChangeEvent<HTMLInputElement>) => {
      const newWidth = e.target.value === '' ? '' : parseInt(e.target.value, 10);
      setWidth(newWidth);
      if (keepAspectRatio && originalWidth && originalHeight && newWidth) {
        setHeight(Math.round((newWidth / originalWidth) * originalHeight));
      }
  };
  
  const handleHeightChange = (e: ChangeEvent<HTMLInputElement>) => {
      const newHeight = e.target.value === '' ? '' : parseInt(e.target.value, 10);
      setHeight(newHeight);
      if (keepAspectRatio && originalWidth && originalHeight && newHeight) {
          setWidth(Math.round((newHeight / originalHeight) * originalWidth));
      }
  };

  const handleResize = () => {
    if (!imageUrl || !width || !height) return;

    setIsResizing(true);
    const img = document.createElement('img');
    img.src = imageUrl;
    img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            const dataUrl = canvas.toDataURL(imageFile?.type);
            setResizedUrl(dataUrl);
            toast({
                title: 'Image Resized!',
                description: `New dimensions: ${width}x${height}px`,
            });
        }
        setIsResizing(false);
    }
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label className="text-lg">Resize Options</Label>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <Label htmlFor="width">Width</Label>
                            <Input id="width" type="number" value={width} onChange={handleWidthChange} placeholder="e.g., 1920" />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="height">Height</Label>
                            <Input id="height" type="number" value={height} onChange={handleHeightChange} placeholder="e.g., 1080" />
                        </div>
                    </div>
                    <div className="flex items-center space-x-2 pt-2">
                        <Switch id="aspect-ratio" checked={keepAspectRatio} onCheckedChange={setKeepAspectRatio} />
                        <Label htmlFor="aspect-ratio">Keep aspect ratio</Label>
                    </div>
                </div>
                <div className="flex flex-wrap gap-2">
                    <Button onClick={handleResize} disabled={isResizing || !width || !height}>
                      {isResizing ? 'Resizing...' : 'Resize Image'}
                    </Button>
                    <Button variant="outline" onClick={handleReset}>
                        <Trash2 className="mr-2 h-4 w-4" /> Clear
                    </Button>
                </div>
                <div className="flex flex-col items-center justify-center bg-muted/50 p-4 rounded-lg min-h-[300px] aspect-w-1 aspect-h-1">
                    <p className='font-semibold mb-2'>Original</p>
                    <Image
                        src={imageUrl}
                        alt="Original"
                        width={300}
                        height={300}
                        className="rounded-lg object-contain w-full h-auto max-h-[300px]"
                    />
                </div>
            </div>
            <div className="space-y-4">
                <Label className="text-lg">Resized Preview</Label>
                <div className="flex flex-col items-center justify-center bg-muted/50 p-4 rounded-lg min-h-[300px]">
                    {resizedUrl ? (
                        <>
                            <Image
                                src={resizedUrl}
                                alt="Resized image"
                                width={width || 300}
                                height={height || 300}
                                style={{ width: `${width}px`, height: `${height}px` }}
                                className="rounded-lg object-contain"
                            />
                            <Button onClick={() => {
                                const link = document.createElement('a');
                                link.href = resizedUrl;
                                link.download = `resized-${imageFile?.name}`;
                                link.click();
                            }} className="mt-4">
                                <Download className="mr-2 h-4 w-4" /> Download
                            </Button>
                        </>
                    ) : (
                    <div className="text-center text-muted-foreground">
                        <ImageIcon className="mx-auto h-16 w-16" />
                        <p>Resized image preview will appear here</p>
                    </div>
                    )}
                </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

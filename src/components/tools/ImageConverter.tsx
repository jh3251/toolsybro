
'use client';

import { useState, useRef, ChangeEvent } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UploadCloud, Download, Trash2, Image as ImageIcon, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type ConversionFormat = 'image/png' | 'image/jpeg' | 'image/webp';
type Extension = 'png' | 'jpg' | 'webp';

export function ImageConverter() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [convertedUrl, setConvertedUrl] = useState<string>('');
  const [isConverting, setIsConverting] = useState(false);
  const [format, setFormat] = useState<ConversionFormat>('image/png');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      handleReset();
      setImageFile(file);
      setImageUrl(URL.createObjectURL(file));
    }
  };

  const handleReset = () => {
    setImageFile(null);
    setImageUrl('');
    setConvertedUrl('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleConvert = () => {
    if (!imageUrl || !imageFile) return;

    setIsConverting(true);
    const img = document.createElement('img');
    img.src = imageUrl;
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        if(format === 'image/jpeg' || format === 'image/webp'){
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(0,0,canvas.width,canvas.height);
        }
        ctx.drawImage(img, 0, 0);
        let quality = format === 'image/webp' ? 0.8 : 0.9;
        const dataUrl = canvas.toDataURL(format, quality);
        setConvertedUrl(dataUrl);
        toast({
          title: 'Image Converted!',
          description: `Successfully converted to ${format.split('/')[1].toUpperCase()}`,
        });
      }
      setIsConverting(false);
    };
    img.onerror = () => {
        toast({
            title: 'Error',
            description: 'Could not load image for conversion. The file may be corrupt or in an unsupported format.',
            variant: 'destructive',
        });
        setIsConverting(false);
    }
  };
  
  const handleDownload = () => {
      if (!convertedUrl || !imageFile) return;
      const extension = format.split('/')[1] as Extension;
      const link = document.createElement('a');
      link.href = convertedUrl;
      const name = imageFile.name.substring(0, imageFile.name.lastIndexOf('.'));
      link.download = `${name}.${extension}`;
      link.click();
  }

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
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              <div className="space-y-4">
                <Label className='text-lg'>1. Upload Image</Label>
                <div className="flex flex-col items-center justify-center bg-muted/50 p-4 rounded-lg min-h-[300px]">
                    <Image
                        src={imageUrl}
                        alt="Original"
                        width={300}
                        height={300}
                        className="rounded-lg object-contain w-full h-auto max-h-[300px]"
                    />
                </div>
                <Button variant="outline" onClick={handleReset} className='w-full'>
                    <Trash2 className="mr-2 h-4 w-4" /> Change Image
                </Button>
              </div>
              <div className="space-y-4">
                <Label className='text-lg'>2. Select Format & Convert</Label>
                 <Select onValueChange={(value: ConversionFormat) => setFormat(value)} defaultValue={format}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a format" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="image/png">PNG</SelectItem>
                        <SelectItem value="image/jpeg">JPG</SelectItem>
                        <SelectItem value="image/webp">WEBP</SelectItem>
                    </SelectContent>
                </Select>
                 <Button onClick={handleConvert} disabled={isConverting} className="w-full">
                  {isConverting ? 'Converting...' : 'Convert Image'}
                </Button>
                
                <Label className='text-lg pt-4 block'>3. Download Result</Label>
                <div className="flex flex-col items-center justify-center bg-muted/50 p-4 rounded-lg min-h-[300px]">
                    {convertedUrl ? (
                        <>
                            <Image
                                src={convertedUrl}
                                alt="Converted image"
                                width={300}
                                height={300}
                                className="rounded-lg object-contain w-full h-auto max-h-[300px]"
                            />
                            <Button onClick={handleDownload} className="mt-4">
                                <Download className="mr-2 h-4 w-4" /> Download
                            </Button>
                        </>
                    ) : (
                    <div className="text-center text-muted-foreground">
                        <ImageIcon className="mx-auto h-16 w-16" />
                        <p>Converted image will appear here</p>
                    </div>
                    )}
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

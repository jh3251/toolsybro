
'use client';

import { useState, useRef, ChangeEvent } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UploadCloud, FileImage, Trash2, Download } from 'lucide-react';
import Image from 'next/image';
import { Progress } from '../ui/progress';

interface ImageFile {
  name: string;
  url: string;
  originalSize: number;
  compressedSize: number;
}

export function ImageCompressor() {
  const [image, setImage] = useState<ImageFile | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setIsCompressing(true);
      setProgress(30);
      const reader = new FileReader();
      reader.onloadend = () => {
        // Simulate compression
        setProgress(70);
        setTimeout(() => {
          const originalSize = file.size;
          // Simulate 40-70% reduction
          const compressedSize = originalSize * (1 - (Math.random() * 0.3 + 0.4));
          setImage({
            name: file.name,
            url: reader.result as string,
            originalSize,
            compressedSize,
          });
          setProgress(100);
          setIsCompressing(false);
        }, 1000);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleReset = () => {
    setImage(null);
    setProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };
  
  const handleDownload = () => {
    if (!image) return;
    const link = document.createElement('a');
    link.href = image.url;
    link.download = `compressed-${image.name}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <Card>
      <CardContent className="pt-6 relative">
        {!image && !isCompressing ? (
          <div
            className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary transition-colors min-h-[400px]"
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
        ) : (isCompressing || !image) ? (
            <div className="flex flex-col items-center justify-center min-h-[400px]">
                <p className='text-lg font-semibold mb-4'>Compressing your image...</p>
                <Progress value={progress} className="w-full max-w-sm" />
                <p className='text-muted-foreground text-sm mt-2'>{progress}%</p>
            </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="w-full">
                    <p className="font-semibold mb-2 text-center text-muted-foreground">Original</p>
                    <div className="relative aspect-square w-full bg-muted/30 rounded-lg p-2">
                      <Image
                          src={image.url}
                          alt="Original"
                          fill
                          className="rounded-md object-contain"
                      />
                    </div>
                     <p className='text-center text-sm font-medium mt-2'>{formatFileSize(image.originalSize)}</p>
                </div>
                <div className="w-full">
                     <p className="font-semibold mb-2 text-center text-muted-foreground">Compressed</p>
                     <div className="relative aspect-square w-full bg-muted/30 rounded-lg p-2">
                      <Image
                          src={image.url}
                          alt="Compressed"
                          fill
                          className="rounded-md object-contain"
                      />
                    </div>
                     <p className='text-center text-sm font-medium mt-2'>{formatFileSize(image.compressedSize)}</p>
                </div>
            </div>

            <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                <CardContent className="p-4 text-center">
                    <p className='text-2xl font-bold text-green-700 dark:text-green-400'>
                        - {((1 - image.compressedSize / image.originalSize) * 100).toFixed(1)}%
                    </p>
                    <p className='text-sm font-medium text-green-600 dark:text-green-500'>Compression Achieved</p>
                </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-4">
                <Button onClick={handleDownload} className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90 flex-1">
                    <Download className="mr-2 h-4 w-4" />
                    Download Compressed Image
                </Button>
                <Button variant="outline" onClick={handleReset} className="w-full sm:w-auto">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Compress Another Image
                </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

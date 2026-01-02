'use client';

import { useState, useRef, ChangeEvent } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UploadCloud, FileImage, Trash2, Download } from 'lucide-react';
import Image from 'next/image';

interface ImageFile {
  name: string;
  url: string;
  originalSize: number;
  compressedSize: number;
}

export function ImageCompressor() {
  const [image, setImage] = useState<ImageFile | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setIsCompressing(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        // Simulate compression
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
          setIsCompressing(false);
        }, 1000);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleReset = () => {
    setImage(null);
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

  return (
    <Card>
      <CardContent className="pt-6">
        {!image ? (
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
            <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="w-full md:w-1/2">
                    <p className="font-semibold mb-2 text-center">Original</p>
                    <Image
                        src={image.url}
                        alt="Original"
                        width={400}
                        height={400}
                        className="rounded-lg object-contain w-full h-auto"
                    />
                </div>
                <div className="w-full md:w-1/2">
                     <p className="font-semibold mb-2 text-center">Compressed (Preview)</p>
                     <Image
                        src={image.url}
                        alt="Compressed"
                        width={400}
                        height={400}
                        className="rounded-lg object-contain w-full h-auto"
                    />
                </div>
            </div>

            <Card className="bg-muted/50">
                <CardContent className="p-4">
                    <div className="flex justify-between items-center text-sm">
                        <div className="flex items-center gap-2">
                           <FileImage className="w-5 h-5" />
                           <span className="font-medium">{image.name}</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="text-right">
                                <p className="text-muted-foreground">Original Size</p>
                                <p className="font-semibold">{formatFileSize(image.originalSize)}</p>
                            </div>
                            <div className="text-right text-primary">
                                <p>Compressed Size</p>
                                <p className="font-semibold">{formatFileSize(image.compressedSize)}</p>
                            </div>
                            <div className="text-right text-accent-foreground">
                                <p>Reduction</p>
                                <p className="font-semibold text-green-600">
                                    -{((1 - image.compressedSize / image.originalSize) * 100).toFixed(1)}%
                                </p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-4">
                <Button className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90 flex-1">
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
        {isCompressing && (
             <div className="absolute inset-0 bg-background/80 flex items-center justify-center rounded-lg">
                <div className="flex items-center gap-2 text-lg">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    <span>Compressing...</span>
                </div>
            </div>
        )}
      </CardContent>
    </Card>
  );
}

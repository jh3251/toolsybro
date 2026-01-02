'use client';

import { useState, useRef, ChangeEvent } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UploadCloud, Image as ImageIcon, Trash2, Download, Wand2 } from 'lucide-react';
import Image from 'next/image';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import { cn } from '@/lib/utils';

interface ImageFile {
  name: string;
  url: string;
  originalSize: number;
}

interface CompressedResult {
    url: string;
    compressedSize: number;
}

export function ImageCompressor() {
  const [image, setImage] = useState<ImageFile | null>(null);
  const [result, setResult] = useState<CompressedResult | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      handleReset();
      const reader = new FileReader();
      reader.onloadend = () => {
         setImage({
            name: file.name,
            url: reader.result as string,
            originalSize: file.size,
          });
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleCompress = () => {
    if (!image) return;

    setIsCompressing(true);
    setProgress(0);
    
    // Simulate compression process for UI feedback
    const compressionInterval = setInterval(() => {
        setProgress(prev => {
            if (prev >= 95) return 95;
            return prev + 5;
        });
    }, 100);

    setTimeout(() => {
        clearInterval(compressionInterval);
        const compressedSize = image.originalSize * (1 - (Math.random() * 0.3 + 0.4)); // Simulate 40-70% reduction
        setResult({
            url: image.url, // In a real scenario, this would be a new URL from a canvas
            compressedSize: compressedSize,
        });
        setProgress(100);
        setIsCompressing(false);
    }, 2000);
  }

  const handleReset = () => {
    setImage(null);
    setResult(null);
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
    if (!result) return;
    const link = document.createElement('a');
    link.href = result.url;
    link.download = `compressed-${image?.name}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const reductionPercentage = image && result ? ((1 - result.compressedSize / image.originalSize) * 100).toFixed(1) : 0;

  return (
    <Card>
      <CardContent className="pt-6 relative">
        {!image ? (
          <div
            className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary transition-colors min-h-[400px] bg-muted/20"
            onClick={() => fileInputRef.current?.click()}
          >
            <div className='text-center'>
              <UploadCloud className="w-16 h-16 text-muted-foreground mx-auto" />
              <p className="mt-4 text-lg font-semibold">Click or drag & drop image</p>
              <p className="text-muted-foreground text-sm">Supports PNG, JPG, and WEBP formats.</p>
            </div>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              {/* Original Image */}
              <div className="space-y-2">
                <h3 className='font-semibold text-center text-muted-foreground'>Original Image</h3>
                <Card className='overflow-hidden'>
                  <CardContent className="p-4 bg-muted/30 flex items-center justify-center aspect-square">
                    <Image
                        src={image.url}
                        alt="Original"
                        width={400}
                        height={400}
                        className="rounded-md object-contain max-h-[400px]"
                    />
                  </CardContent>
                  <div className='p-2 text-center text-sm font-medium border-t'>{formatFileSize(image.originalSize)}</div>
                </Card>
              </div>

              {/* Compressed Image / Actions */}
              <div className="space-y-4">
                 <h3 className='font-semibold text-center text-muted-foreground'>{result ? 'Compressed Image' : 'Ready to Compress'}</h3>
                {result ? (
                   <Card className='overflow-hidden border-primary'>
                      <CardContent className="p-4 bg-muted/30 flex items-center justify-center aspect-square relative">
                        <Image
                            src={result.url}
                            alt="Compressed"
                            width={400}
                            height={400}
                            className="rounded-md object-contain max-h-[400px]"
                        />
                        <Badge variant="secondary" className="absolute top-2 right-2 text-base bg-green-100 text-green-800 border-green-300">
                          - {reductionPercentage}%
                        </Badge>
                      </CardContent>
                      <div className='p-2 text-center text-sm font-medium border-t text-primary'>{formatFileSize(result.compressedSize)}</div>
                    </Card>
                ) : (
                   <div className="flex items-center justify-center aspect-square bg-muted/30 rounded-lg text-muted-foreground border-2 border-dashed">
                      <div className="text-center">
                        {isCompressing ? (
                          <>
                            <p className="font-semibold mb-2">Compressing...</p>
                            <Progress value={progress} className="w-48"/>
                          </>
                        ) : (
                          <>
                            <ImageIcon className="w-12 h-12 mx-auto" />
                            <p className="mt-2">Compressed version will appear here.</p>
                          </>
                        )}
                      </div>
                    </div>
                )}
                 {result ? (
                    <div className='flex flex-col gap-2'>
                        <Button onClick={handleDownload} size="lg">
                            <Download className="mr-2 h-4 w-4" />
                            Download Compressed Image
                        </Button>
                         <Button variant="outline" onClick={handleReset}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Compress Another
                        </Button>
                    </div>
                ) : (
                     <Button onClick={handleCompress} disabled={isCompressing} size="lg">
                        {isCompressing ? (
                             <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                             <Wand2 className="mr-2 h-4 w-4" />
                        )}
                       {isCompressing ? 'Compressing...' : 'Compress Image'}
                    </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

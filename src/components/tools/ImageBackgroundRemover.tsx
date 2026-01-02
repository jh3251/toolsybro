'use client';

import { useState, useRef, ChangeEvent } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UploadCloud, Download, Trash2, Wand2, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { removeImageBackground } from '@/ai/flows/remove-image-background';
import { Skeleton } from '../ui/skeleton';

export function ImageBackgroundRemover() {
  const [originalImage, setOriginalImage] = useState<File | null>(null);
  const [originalImageUrl, setOriginalImageUrl] = useState<string>('');
  const [resultImageUrl, setResultImageUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      handleReset();
      setOriginalImage(file);
      setOriginalImageUrl(URL.createObjectURL(file));
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

  const handleRemoveBackground = async () => {
    if (!originalImageUrl || !originalImage) return;

    setIsLoading(true);
    setResultImageUrl(''); // Clear previous result

    try {
      const result = await removeImageBackground({ imageDataUri: originalImageUrl, contentType: originalImage.type });
      setResultImageUrl(result.resultDataUri);
      toast({
        title: 'Background Removed!',
        description: 'The AI has successfully removed the background.',
      });
    } catch (error: any) {
      let description = 'The background removal failed. Please try again.';
      if (typeof error.message === 'string' && (error.message.includes('429') || error.message.toLowerCase().includes('quota'))) {
        description = 'You have exceeded your request limit for the AI model. Please check your plan and billing details or try again later.';
      } else if (error.message) {
        description = error.message;
      }
      
      toast({
        title: 'AI Error',
        description: description,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (!resultImageUrl || !originalImage) return;
    const link = document.createElement('a');
    link.href = resultImageUrl;
    const name = originalImage.name.substring(0, originalImage.name.lastIndexOf('.'));
    link.download = `${name}-no-bg.png`; // Result is always PNG
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
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-4">
              <div className="space-y-2">
                 <h3 className="text-center font-semibold">Original Image</h3>
                 <div className="bg-muted/50 p-4 rounded-lg flex justify-center">
                    <Image
                        src={originalImageUrl}
                        alt="Original"
                        width={300}
                        height={300}
                        className="rounded-lg object-contain w-full h-auto max-h-[400px]"
                    />
                 </div>
              </div>
              
              <ArrowRight className="hidden md:block h-8 w-8 text-muted-foreground" />

              <div className="space-y-2">
                <h3 className="text-center font-semibold">Result</h3>
                <div className="bg-muted/50 p-4 rounded-lg flex justify-center min-h-[400px] items-center" 
                     style={{ 
                       backgroundImage: 'repeating-conic-gradient(#d1d5db 0% 25%, transparent 0% 50%)',
                       backgroundSize: '16px 16px'
                     }}
                >
                    {isLoading ? (
                        <div className="w-full h-full flex flex-col items-center justify-center">
                            <Skeleton className="w-[300px] h-[300px] rounded-lg" />
                             <p className="text-muted-foreground mt-4 text-sm animate-pulse">AI is working...</p>
                        </div>
                    ) : resultImageUrl ? (
                        <Image
                            src={resultImageUrl}
                            alt="Background removed"
                            width={300}
                            height={300}
                            className="rounded-lg object-contain w-full h-auto max-h-[400px]"
                        />
                    ) : (
                        <div className="text-center text-muted-foreground">
                            <p>Result will appear here</p>
                        </div>
                    )}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              <Button onClick={handleRemoveBackground} disabled={isLoading || !originalImage}>
                <Wand2 className="mr-2" />
                {isLoading ? 'Removing Background...' : 'Remove Background'}
              </Button>
              <Button onClick={handleDownload} disabled={!resultImageUrl || isLoading}>
                <Download className="mr-2" /> Download Result
              </Button>
              <Button variant="outline" onClick={handleReset}>
                <Trash2 className="mr-2" /> Start Over
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

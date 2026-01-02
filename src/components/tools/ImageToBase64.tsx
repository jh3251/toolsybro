
'use client';

import { useState, useRef, ChangeEvent } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UploadCloud, FileImage, Trash2, Copy } from 'lucide-react';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '../ui/textarea';

export function ImageToBase64() {
  const [image, setImage] = useState<File | null>(null);
  const [base64, setBase64] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImageUrl(URL.createObjectURL(file));
        setBase64(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleReset = () => {
    setImage(null);
    setBase64('');
    setImageUrl('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleCopy = () => {
    if (!base64) return;
    navigator.clipboard.writeText(base64);
    toast({
      title: 'Copied to clipboard!',
      description: 'The Base64 string has been copied.',
    });
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
            <p className="text-muted-foreground">Supports PNG, JPG, WEBP, GIF</p>
            <Input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept="image/png, image/jpeg, image/webp, image/gif"
              onChange={handleFileChange}
            />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                 {imageUrl && (
                  <Image
                    src={imageUrl}
                    alt="Uploaded image"
                    width={300}
                    height={300}
                    className="rounded-lg object-contain w-full h-auto max-h-[300px]"
                  />
                 )}
                <div className="flex flex-wrap gap-2">
                    <Button onClick={handleCopy} disabled={!base64}>
                        <Copy className="mr-2 h-4 w-4" /> Copy Base64
                    </Button>
                    <Button variant="outline" onClick={handleReset}>
                        <Trash2 className="mr-2 h-4 w-4" /> Clear
                    </Button>
                </div>
              </div>
               <div className="space-y-2">
                <p className='font-medium'>Base64 Result</p>
                <Textarea
                    value={base64}
                    readOnly
                    placeholder="Base64 output will appear here"
                    className="min-h-[300px] font-mono text-xs break-all"
                />
               </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

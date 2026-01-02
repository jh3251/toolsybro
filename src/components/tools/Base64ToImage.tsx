'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Download, Trash2, Image as ImageIcon, AlertTriangle } from 'lucide-react';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from '../ui/alert';

export function Base64ToImage() {
  const [base64, setBase64] = useState<string>('');
  const [error, setError] = useState<string>('');
  const { toast } = useToast();

  const handleReset = () => {
    setBase64('');
    setError('');
  };

  const handleDownload = () => {
    if (!base64 || error) return;
    const link = document.createElement('a');
    link.href = base64;
    
    // Extract file extension
    const mimeType = base64.match(/data:image\/([a-zA-Z+]+);/);
    const extension = mimeType ? mimeType[1] : 'png';
    link.download = `image.${extension}`;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setBase64(text);
    if (!text.trim()) {
        setError('');
        return;
    }
    if (!text.startsWith('data:image/')) {
        setError('Invalid Base64 Data URI. It should start with "data:image/...".');
    } else {
        setError('');
    }
  }

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
                <p className='font-medium'>Paste Base64 String</p>
                <Textarea
                    value={base64}
                    onChange={handleTextChange}
                    placeholder="data:image/png;base64,iVBORw0KGgoAAAANSUhEUg..."
                    className="min-h-[300px] font-mono text-xs"
                />
                 {error && (
                    <Alert variant="destructive" className="mt-2">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}
            </div>
            <div className="space-y-4">
                 <p className='font-medium'>Image Preview</p>
                <div className="flex items-center justify-center bg-muted/50 p-4 rounded-lg min-h-[300px] aspect-square">
                    {base64 && !error ? (
                    <Image
                        src={base64}
                        alt="Decoded image"
                        width={300}
                        height={300}
                        className="rounded-lg object-contain w-full h-auto max-h-[300px]"
                    />
                    ) : (
                    <div className="text-center text-muted-foreground">
                        <ImageIcon className="mx-auto h-16 w-16" />
                        <p>Image preview will appear here</p>
                    </div>
                    )}
                </div>
            </div>
        </div>
        <div className="flex flex-wrap gap-2">
            <Button onClick={handleDownload} disabled={!base64 || !!error}>
                <Download className="mr-2 h-4 w-4" /> Download Image
            </Button>
            <Button variant="outline" onClick={handleReset} disabled={!base64}>
                <Trash2 className="mr-2 h-4 w-4" /> Clear
            </Button>
        </div>
      </CardContent>
    </Card>
  );
}

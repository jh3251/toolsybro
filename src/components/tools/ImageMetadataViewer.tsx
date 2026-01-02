
'use client';

import { useState, useRef, ChangeEvent } from 'react';
import ExifReader from 'exif-reader';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UploadCloud, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '../ui/scroll-area';

interface Metadata {
  [key: string]: any;
}

export function ImageMetadataViewer() {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [metadata, setMetadata] = useState<Metadata | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      handleReset();
      setImageUrl(URL.createObjectURL(file));

      try {
        const arrayBuffer = await file.arrayBuffer();
        const tags = ExifReader.load(arrayBuffer);
        
        const allTags: Metadata = { ...tags.image, ...tags.thumbnail, ...tags.exif, ...tags.gps, ...tags.interoperability };
        
        if (Object.keys(tags).length === 0 || Object.keys(allTags).length === 0) {
            setMetadata(null);
            toast({
                title: 'No Metadata Found',
                description: 'This image does not contain any readable EXIF metadata.',
                variant: 'default',
            });
        } else {
           setMetadata(allTags);
           toast({
               title: 'Metadata Loaded',
               description: 'Successfully extracted EXIF data from the image.',
           })
        }
      } catch (err) {
        setMetadata(null);
        toast({
          title: 'Error Reading Metadata',
          description: 'Could not read metadata from this file. It might be corrupted or not contain EXIF data.',
          variant: 'destructive',
        });
        console.error(err);
      }
    }
  };

  const handleReset = () => {
    setImageUrl('');
    setMetadata(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatValue = (value: any): string => {
    if (value instanceof Date) {
        return value.toLocaleString();
    }
    if (Array.isArray(value)) {
        return value.join(', ');
    }
    if (typeof value === 'object' && value !== null) {
        try {
            return JSON.stringify(value, null, 2);
        } catch {
            return '[Object]';
        }
    }
    return String(value);
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
            <p className="text-muted-foreground">Supports JPG, TIFF, HEIC with EXIF data</p>
            <Input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept="image/jpeg,image/tiff,image/heic,image/heif"
              onChange={handleFileChange}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="relative aspect-square w-full bg-muted/50 rounded-lg p-4">
                <Image
                  src={imageUrl}
                  alt="Uploaded"
                  fill
                  className="rounded-md object-contain"
                />
              </div>
              <Button variant="outline" onClick={handleReset} className="w-full">
                <Trash2 className="mr-2 h-4 w-4" /> Change Image
              </Button>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Image Metadata</h3>
              <ScrollArea className="h-[400px] w-full rounded-md border">
                 <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[150px]">Tag</TableHead>
                            <TableHead>Value</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {metadata && Object.keys(metadata).length > 0 ? (
                            Object.entries(metadata).map(([key, value]) => value !== undefined && (
                                <TableRow key={key}>
                                    <TableCell className="font-medium">{key}</TableCell>
                                    <TableCell className='font-mono text-xs whitespace-pre-wrap break-all'>{formatValue(value)}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={2} className="h-24 text-center">
                                    {imageUrl ? 'No EXIF metadata found in this image.' : 'Upload an image to see its metadata.'}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                 </Table>
              </ScrollArea>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

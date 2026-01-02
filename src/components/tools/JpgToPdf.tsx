
'use client';

import { useState, useRef, ChangeEvent } from 'react';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { fileOpen, fileSave } from 'browser-fs-access';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UploadCloud, Download, Trash2, Loader2, FileImage, PlusCircle } from 'lucide-react';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { Reorder } from "framer-motion"


interface ImageFile {
  id: number;
  file: File;
  url: string;
}

export function JpgToPdf() {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [isConverting, setIsConverting] = useState(false);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newImages: ImageFile[] = Array.from(files)
        .filter(file => file.type.startsWith('image/jpeg'))
        .map((file, index) => ({
            id: Date.now() + index,
            file,
            url: URL.createObjectURL(file),
        }));

    if (newImages.length !== files.length) {
        toast({
            title: "Some files were not JPGs",
            description: "Only JPG files are supported and have been added.",
            variant: "default",
        })
    }
    
    setImages(prev => [...prev, ...newImages]);
  };

  const handleReset = () => {
    images.forEach(img => URL.revokeObjectURL(img.url));
    setImages([]);
    if (fileInputRef.current) {
        fileInputRef.current.value = "";
    }
  };

  const handleConvert = async () => {
    if (images.length === 0) return;

    setIsConverting(true);
    toast({ title: 'Starting PDF conversion...', description: 'Please wait while we process your images.' });

    try {
        const pdfDoc = await PDFDocument.create();

        for (const image of images) {
            const jpgImageBytes = await image.file.arrayBuffer();
            const jpgImage = await pdfDoc.embedJpg(jpgImageBytes);
            const page = pdfDoc.addPage([jpgImage.width, jpgImage.height]);
            page.drawImage(jpgImage, {
                x: 0,
                y: 0,
                width: jpgImage.width,
                height: jpgImage.height,
            });
        }
        
        const pdfBytes = await pdfDoc.save();
        
        await fileSave(new Blob([pdfBytes], { type: 'application/pdf' }), {
            fileName: 'converted.pdf',
            extensions: ['.pdf'],
        });

        toast({ title: 'Conversion Successful!', description: 'Your PDF has been saved.' });

    } catch (error) {
        console.error(error);
        toast({
            title: 'Conversion Failed',
            description: 'Something went wrong while creating the PDF. Please check the console for errors.',
            variant: 'destructive',
        });
    } finally {
        setIsConverting(false);
    }
  };

  return (
    <Card>
      <CardContent className="pt-6 space-y-6">
        {images.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            <UploadCloud className="w-16 h-16 text-muted-foreground" />
            <p className="mt-4 text-lg font-semibold">Click or drag JPG images to upload</p>
            <p className="text-muted-foreground">You can select multiple files.</p>
            <Input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept="image/jpeg"
              multiple
              onChange={handleFileChange}
            />
          </div>
        ) : (
          <>
            <div className='flex flex-wrap gap-2'>
                 <Button onClick={handleConvert} disabled={isConverting}>
                    {isConverting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
                    {isConverting ? 'Converting to PDF...' : `Convert ${images.length} Image(s) to PDF`}
                </Button>
                <Button variant="outline" onClick={() => fileInputRef.current?.click()} disabled={isConverting}>
                    <PlusCircle className="mr-2 h-4 w-4" /> Add More Images
                </Button>
                <Button variant="destructive" onClick={handleReset} disabled={isConverting}>
                    <Trash2 className="mr-2 h-4 w-4" /> Clear All
                </Button>
                 <Input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept="image/jpeg"
                  multiple
                  onChange={handleFileChange}
                />
            </div>
            
            <p className='text-sm text-muted-foreground'>Drag and drop images to reorder them before converting.</p>

            <Reorder.Group axis="y" values={images} onReorder={setImages} className="space-y-2">
                {images.map((image, index) => (
                    <Reorder.Item key={image.id} value={image} className="bg-muted/50 p-2 rounded-lg border">
                        <div className="flex items-center gap-4">
                            <div className="font-bold text-lg">{index + 1}</div>
                            <Image src={image.url} alt={`Preview ${image.file.name}`} width={64} height={64} className="rounded-md h-16 w-16 object-cover" />
                            <p className="flex-grow truncate font-mono text-sm">{image.file.name}</p>
                            <p className="text-sm text-muted-foreground">{Math.round(image.file.size / 1024)} KB</p>
                        </div>
                    </Reorder.Item>
                ))}
            </Reorder.Group>
          </>
        )}
      </CardContent>
    </Card>
  );
}

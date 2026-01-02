
'use client';

import { useState, useRef, ChangeEvent } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UploadCloud, Download, Trash2, Loader2, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';

// Set worker source for pdf.js
pdfjsLib.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

interface ConvertedImage {
  url: string;
  pageNumber: number;
}

export function PdfToJpg() {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [convertedImages, setConvertedImages] = useState<ConvertedImage[]>([]);
  const [isConverting, setIsConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      handleReset();
      setPdfFile(file);
      handleConvert(file);
    } else if (file) {
      toast({
        title: 'Invalid File Type',
        description: 'Please select a PDF file.',
        variant: 'destructive',
      });
    }
  };

  const handleReset = () => {
    setPdfFile(null);
    setConvertedImages([]);
    setIsConverting(false);
    setProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleConvert = async (file: File) => {
    setIsConverting(true);
    setProgress(0);

    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    const numPages = pdf.numPages;
    const images: ConvertedImage[] = [];

    for (let i = 1; i <= numPages; i++) {
      const page = await pdf.getPage(i);
      const viewport = page.getViewport({ scale: 2 }); // Higher scale for better quality
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      if (context) {
        await page.render({ canvasContext: context, viewport: viewport }).promise;
        images.push({
          url: canvas.toDataURL('image/jpeg', 0.9), // 90% quality
          pageNumber: i,
        });
      }
      
      setProgress(Math.round((i / numPages) * 100));
    }

    setConvertedImages(images);
    setIsConverting(false);
    toast({
      title: 'Conversion Complete!',
      description: `${numPages} page(s) converted to JPG images.`,
    });
  };

  const handleDownload = (url: string, pageNumber: number) => {
    const link = document.createElement('a');
    link.href = url;
    const name = pdfFile?.name.replace('.pdf', '') || 'image';
    link.download = `${name}-page-${pageNumber}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const handleDownloadAll = () => {
    convertedImages.forEach(image => {
        handleDownload(image.url, image.pageNumber);
    })
  }

  return (
    <Card>
      <CardContent className="pt-6">
        {!pdfFile && !isConverting ? (
          <div
            className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            <UploadCloud className="w-16 h-16 text-muted-foreground" />
            <p className="mt-4 text-lg font-semibold">Click or drag PDF to upload</p>
            <p className="text-muted-foreground">Your file will be processed in the browser.</p>
            <Input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept="application/pdf"
              onChange={handleFileChange}
            />
          </div>
        ) : (
          <div className="space-y-6">
            {(isConverting || convertedImages.length > 0) && (
              <div className="flex items-center gap-4 p-4 rounded-lg border bg-muted/50">
                  <ImageIcon className="w-6 h-6 text-muted-foreground" />
                  <div className="flex-1">
                      <p className="font-semibold truncate">{pdfFile?.name}</p>
                      <Progress value={progress} className="mt-1 h-2" />
                      <p className="text-xs text-muted-foreground mt-1">{isConverting ? `Converting... ${progress}%` : `Conversion Complete!`}</p>
                  </div>
              </div>
            )}
            
            {convertedImages.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    <Button onClick={handleDownloadAll}>
                        <Download className="mr-2"/> Download All JPGs
                    </Button>
                     <Button variant="outline" onClick={handleReset}>
                        <Trash2 className="mr-2 h-4 w-4" /> Convert Another PDF
                    </Button>
                </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {convertedImages.map((image) => (
                <Card key={image.pageNumber} className="group overflow-hidden">
                    <div className="relative aspect-[3/4]">
                        <Image src={image.url} alt={`Page ${image.pageNumber}`} fill className="object-cover" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Button size="sm" onClick={() => handleDownload(image.url, image.pageNumber)}>
                                <Download className="mr-2 h-4 w-4"/> Download
                            </Button>
                        </div>
                    </div>
                     <p className="text-center text-sm p-2 bg-background border-t">Page {image.pageNumber}</p>
                </Card>
              ))}
            </div>
            
          </div>
        )}
      </CardContent>
    </Card>
  );
}

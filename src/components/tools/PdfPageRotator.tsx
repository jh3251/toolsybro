
'use client';

import { useState, useRef, ChangeEvent } from 'react';
import { PDFDocument, degrees } from 'pdf-lib';
import * as pdfjsLib from 'pdfjs-dist';
import { fileSave } from 'browser-fs-access';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UploadCloud, Download, Trash2, Loader2, RotateCcw, RotateCw } from 'lucide-react';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';

pdfjsLib.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

interface PagePreview {
  url: string;
  pageNumber: number;
  rotation: number; // in degrees
}

export function PdfPageRotator() {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pagePreviews, setPagePreviews] = useState<PagePreview[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      handleReset();
      setPdfFile(file);
      setIsProcessing(true);
      setProgress(0);
      toast({ title: 'Loading PDF...', description: 'Generating page previews.' });

      try {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        const numPages = pdf.numPages;

        const previews: PagePreview[] = [];
        for (let i = 1; i <= numPages; i++) {
          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale: 0.5 });
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          canvas.height = viewport.height;
          canvas.width = viewport.width;
          if (context) {
            await page.render({ canvasContext: context, viewport }).promise;
            previews.push({ url: canvas.toDataURL(), pageNumber: i, rotation: 0 });
          }
          setProgress(Math.round((i / numPages) * 100));
        }
        setPagePreviews(previews);
        toast({ title: 'PDF Loaded', description: 'You can now rotate pages.' });
      } catch (e) {
        toast({ title: 'Error loading PDF', description: 'The file might be corrupted or password-protected.', variant: 'destructive' });
        handleReset();
      } finally {
        setIsProcessing(false);
      }
    }
  };
  
  const handleReset = () => {
    setPdfFile(null);
    setPagePreviews([]);
    setIsProcessing(false);
    setProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRotate = (pageNumber: number, angle: number) => {
    setPagePreviews(previews => 
        previews.map(p => 
            p.pageNumber === pageNumber 
            ? { ...p, rotation: (p.rotation + angle + 360) % 360 } 
            : p
        )
    );
  };

  const handleDownload = async () => {
    if (!pdfFile) return;

    setIsProcessing(true);
    toast({ title: 'Applying Rotations...', description: 'Please wait.' });

    try {
      const existingPdfBytes = await pdfFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      
      pagePreviews.forEach(preview => {
        if (preview.rotation !== 0) {
            const page = pdfDoc.getPage(preview.pageNumber - 1);
            page.setRotation(degrees(preview.rotation));
        }
      });

      const pdfBytes = await pdfDoc.save();

      await fileSave(new Blob([pdfBytes], { type: 'application/pdf' }), {
        fileName: `rotated-${pdfFile.name}`,
        extensions: ['.pdf'],
      });

      toast({ title: 'PDF Saved Successfully!', description: 'Your rotated PDF has been saved.' });
    } catch (e) {
      toast({ title: 'Error Saving PDF', description: 'An unexpected error occurred.', variant: 'destructive' });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card>
      <CardContent className="pt-6 space-y-6">
        {!pdfFile ? (
          <div
            className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-16 h-16 text-muted-foreground animate-spin" />
                <p className="mt-4 text-lg font-semibold">Loading PDF...</p>
                <Progress value={progress} className="w-1/2 mt-2" />
              </>
            ) : (
              <>
                <UploadCloud className="w-16 h-16 text-muted-foreground" />
                <p className="mt-4 text-lg font-semibold">Click or drag PDF to upload</p>
                <Input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept="application/pdf"
                  onChange={handleFileChange}
                />
              </>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Button onClick={handleDownload} disabled={isProcessing}>
                <Download className="mr-2 h-4 w-4" />
                Save and Download PDF
              </Button>
              <Button variant="outline" onClick={handleReset} disabled={isProcessing}>
                <Trash2 className="mr-2 h-4 w-4" /> New PDF
              </Button>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {pagePreviews.map((preview) => (
                <div key={preview.pageNumber} className="space-y-2">
                  <div className="relative aspect-[2/3] border rounded-md overflow-hidden">
                    <Image 
                      src={preview.url} 
                      alt={`Page ${preview.pageNumber}`} 
                      fill 
                      className="object-cover"
                      style={{ transform: `rotate(${preview.rotation}deg)` }}
                    />
                  </div>
                   <div className='flex justify-center gap-2'>
                        <Button size="icon" variant="outline" onClick={() => handleRotate(preview.pageNumber, -90)}>
                            <RotateCcw className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="outline" onClick={() => handleRotate(preview.pageNumber, 90)}>
                            <RotateCw className="h-4 w-4" />
                        </Button>
                    </div>
                  <p className="text-center text-sm text-muted-foreground">Page {preview.pageNumber}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}


'use client';

import { useState, useRef, ChangeEvent } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import { PDFDocument } from 'pdf-lib';
import { fileSave } from 'browser-fs-access';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UploadCloud, Download, Trash2, Loader2, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';
import { Label } from '../ui/label';
import { Slider } from '../ui/slider';

pdfjsLib.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

export function PdfCompressor() {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [quality, setQuality] = useState(0.75); // Corresponds to 75% quality
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      handleReset();
      setPdfFile(file);
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
    setIsConverting(false);
    setProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleConvert = async () => {
    if (!pdfFile) return;

    setIsConverting(true);
    setProgress(0);
    toast({ title: 'Starting PDF compression...', description: 'This may take a moment for large files.' });

    try {
      const newPdfDoc = await PDFDocument.create();
      const arrayBuffer = await pdfFile.arrayBuffer();
      const existingPdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const numPages = existingPdf.numPages;

      for (let i = 1; i <= numPages; i++) {
        const page = await existingPdf.getPage(i);
        const viewport = page.getViewport({ scale: 1.5 }); // Use a decent scale for good quality
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        if (context) {
          await page.render({ canvasContext: context, viewport: viewport }).promise;
          const jpegDataUrl = canvas.toDataURL('image/jpeg', quality);
          const jpegImageBytes = await fetch(jpegDataUrl).then(res => res.arrayBuffer());
          const jpegImage = await newPdfDoc.embedJpg(jpegImageBytes);

          const newPage = newPdfDoc.addPage([jpegImage.width, jpegImage.height]);
          newPage.drawImage(jpegImage, {
            x: 0,
            y: 0,
            width: newPage.getWidth(),
            height: newPage.getHeight(),
          });
        }
        setProgress(Math.round((i / numPages) * 100));
      }

      const pdfBytes = await newPdfDoc.save();

      await fileSave(new Blob([pdfBytes], { type: 'application/pdf' }), {
        fileName: `compressed-${pdfFile.name}`,
        extensions: ['.pdf'],
      });

      toast({ title: 'Compression Successful!', description: 'Your compressed PDF has been saved.' });
    } catch (error) {
      console.error(error);
      toast({
        title: 'Compression Failed',
        description: 'An error occurred during compression. The PDF might be encrypted or corrupted.',
        variant: 'destructive',
      });
    } finally {
      setIsConverting(false);
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
            <UploadCloud className="w-16 h-16 text-muted-foreground" />
            <p className="mt-4 text-lg font-semibold">Click or drag PDF to upload</p>
            <p className="text-muted-foreground">Your file is processed entirely in your browser.</p>
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
            <div className="flex items-center gap-4 p-4 rounded-lg border bg-muted/50">
              <FileText className="w-8 h-8 text-muted-foreground" />
              <div className="flex-1">
                <p className="font-semibold truncate">{pdfFile?.name}</p>
                <p className="text-xs text-muted-foreground">
                  {Math.round(pdfFile.size / 1024)} KB
                </p>
                {isConverting && <Progress value={progress} className="mt-2 h-2" />}
              </div>
            </div>

            <div className='space-y-3'>
                <Label htmlFor='quality'>Compression Quality (Lower is smaller)</Label>
                <Slider id="quality" value={[quality]} onValueChange={(v) => setQuality(v[0])} min={0.1} max={1} step={0.05} disabled={isConverting}/>
            </div>
            
            <div className='flex flex-wrap gap-2'>
              <Button onClick={handleConvert} disabled={isConverting}>
                {isConverting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Download className="mr-2 h-4 w-4" />
                )}
                {isConverting ? `Compressing... ${progress}%` : 'Compress & Download PDF'}
              </Button>
              <Button variant="outline" onClick={handleReset} disabled={isConverting}>
                <Trash2 className="mr-2 h-4 w-4" /> Convert Another PDF
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}


'use client';

import { useState, useRef, ChangeEvent, useEffect } from 'react';
import { PDFDocument } from 'pdf-lib';
import * as pdfjsLib from 'pdfjs-dist';
import { fileSave } from 'browser-fs-access';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UploadCloud, Download, Trash2, Loader2, Scissors, FileText } from 'lucide-react';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';

pdfjsLib.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

interface PagePreview {
  url: string;
  pageNumber: number;
}

export function PdfSplitter() {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [pagePreviews, setPagePreviews] = useState<PagePreview[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [range, setRange] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      handleReset();
      setPdfFile(file);
      setIsProcessing(true);
      toast({ title: 'Loading PDF...', description: 'Generating page previews.' });

      try {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        setPageCount(pdf.numPages);

        const previews: PagePreview[] = [];
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale: 0.5 });
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          canvas.height = viewport.height;
          canvas.width = viewport.width;
          if (context) {
            await page.render({ canvasContext: context, viewport }).promise;
            previews.push({ url: canvas.toDataURL(), pageNumber: i });
          }
        }
        setPagePreviews(previews);
        setRange(`1-${pdf.numPages}`);
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
    setPageCount(0);
    setPagePreviews([]);
    setIsProcessing(false);
    setRange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSplit = async () => {
    if (!pdfFile || !range) return;

    setIsProcessing(true);
    toast({ title: 'Splitting PDF...', description: 'Please wait.' });

    try {
      const pageNumbers = parseRange(range, pageCount);
      if (pageNumbers.length === 0) {
        toast({ title: 'Invalid Range', description: 'Please specify valid page numbers to extract.', variant: 'destructive' });
        return;
      }

      const existingPdfBytes = await pdfFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      const newPdfDoc = await PDFDocument.create();

      const pages = await newPdfDoc.copyPages(pdfDoc, pageNumbers.map(n => n - 1));
      pages.forEach(page => newPdfDoc.addPage(page));

      const pdfBytes = await newPdfDoc.save();

      await fileSave(new Blob([pdfBytes], { type: 'application/pdf' }), {
        fileName: `split-${pdfFile.name}`,
        extensions: ['.pdf'],
      });

      toast({ title: 'PDF Split Successfully!', description: 'Your new PDF has been saved.' });
    } catch (e) {
      toast({ title: 'Error Splitting PDF', description: 'An unexpected error occurred.', variant: 'destructive' });
    } finally {
      setIsProcessing(false);
    }
  };

  const parseRange = (rangeStr: string, max: number): number[] => {
    const result: Set<number> = new Set();
    const parts = rangeStr.split(',');
    for (const part of parts) {
      if (part.includes('-')) {
        const [start, end] = part.split('-').map(Number);
        if (!isNaN(start) && !isNaN(end)) {
          for (let i = start; i <= end; i++) {
            if (i > 0 && i <= max) result.add(i);
          }
        }
      } else {
        const num = Number(part);
        if (!isNaN(num) && num > 0 && num <= max) {
          result.add(num);
        }
      }
    }
    return Array.from(result).sort((a, b) => a - b);
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
                <p className="mt-4 text-lg font-semibold">Processing PDF...</p>
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
            <div className="flex items-center gap-4 p-4 rounded-lg border bg-muted/50">
              <FileText className="w-8 h-8 text-muted-foreground" />
              <div>
                <p className="font-semibold truncate">{pdfFile.name}</p>
                <p className="text-sm text-muted-foreground">{pageCount} pages</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="range">Pages to Extract</Label>
              <Input
                id="range"
                value={range}
                onChange={(e) => setRange(e.target.value)}
                placeholder="e.g., 1-3, 5, 8-10"
                disabled={isProcessing}
              />
              <p className="text-xs text-muted-foreground">
                Enter page numbers or ranges separated by commas.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Button onClick={handleSplit} disabled={isProcessing || !range}>
                {isProcessing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Scissors className="mr-2 h-4 w-4" />}
                Split PDF
              </Button>
              <Button variant="outline" onClick={handleReset} disabled={isProcessing}>
                <Trash2 className="mr-2 h-4 w-4" /> New PDF
              </Button>
            </div>
            
            {pagePreviews.length > 0 && (
                <div className="space-y-2">
                    <Label>Page Previews</Label>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 rounded-lg border p-4 max-h-[400px] overflow-y-auto">
                    {pagePreviews.map((preview) => (
                        <div key={preview.pageNumber} className="relative aspect-[2/3] border rounded-md overflow-hidden">
                            <Image src={preview.url} alt={`Page ${preview.pageNumber}`} fill className="object-cover" />
                            <div className="absolute bottom-0 w-full bg-black/50 text-white text-xs text-center py-0.5">
                                {preview.pageNumber}
                            </div>
                        </div>
                    ))}
                    </div>
                </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

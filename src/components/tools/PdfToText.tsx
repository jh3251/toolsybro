
'use client';

import { useState, useRef, ChangeEvent } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UploadCloud, Trash2, Loader2, FileText, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '../ui/textarea';

pdfjsLib.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

export function PdfToText() {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [extractedText, setExtractedText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      handleReset();
      setPdfFile(file);
      handleExtract(file);
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
    setExtractedText('');
    setIsProcessing(false);
    setProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleExtract = async (file: File) => {
    setIsProcessing(true);
    setProgress(0);
    toast({ title: 'Extracting text...', description: 'This may take a moment.' });

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const numPages = pdf.numPages;
      let fullText = '';

      for (let i = 1; i <= numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map(item => ('str' in item ? item.str : '')).join(' ');
        fullText += pageText + '\n\n';
        setProgress(Math.round((i / numPages) * 100));
      }

      setExtractedText(fullText);
      toast({ title: 'Text Extracted!', description: 'You can now copy the text.' });
    } catch (error: any) {
      console.error(error);
      let description = 'An error occurred during text extraction.';
      if (error.name === 'PasswordException') {
        description = 'The PDF is password-protected and cannot be processed.';
      }
      toast({
        title: 'Extraction Failed',
        description: description,
        variant: 'destructive',
      });
    } finally {
      setIsProcessing(false);
    }
  };
  
  const handleCopy = () => {
    if (!extractedText) return;
    navigator.clipboard.writeText(extractedText);
    toast({ title: 'Copied to clipboard!' });
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
          <div className="space-y-4">
             <div className="flex items-center gap-4 p-4 rounded-lg border bg-muted/50">
              <FileText className="w-8 h-8 text-muted-foreground" />
              <div className="flex-1">
                <p className="font-semibold truncate">{pdfFile?.name}</p>
                {isProcessing && <Progress value={progress} className="mt-2 h-2" />}
              </div>
            </div>

            <Textarea
              value={extractedText}
              readOnly
              placeholder="Extracted text will appear here..."
              className="min-h-[400px] bg-muted/30"
            />
            
            <div className='flex flex-wrap gap-2'>
              <Button onClick={handleCopy} disabled={!extractedText}>
                <Copy className="mr-2 h-4 w-4" /> Copy Text
              </Button>
              <Button variant="outline" onClick={handleReset} disabled={isProcessing}>
                <Trash2 className="mr-2 h-4 w-4" /> New PDF
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

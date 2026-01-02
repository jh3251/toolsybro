
'use client';

import { useState, useRef, ChangeEvent } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import { PDFDocument } from 'pdf-lib';
import { fileSave } from 'browser-fs-access';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UploadCloud, Download, Trash2, Loader2, FileText, KeyRound } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';
import { Label } from '../ui/label';

pdfjsLib.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

export function PdfPasswordRemover() {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [password, setPassword] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
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
    setPassword('');
    setIsProcessing(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemovePassword = async () => {
    if (!pdfFile) return;

    setIsProcessing(true);
    toast({ title: 'Attempting to unlock PDF...', description: 'Please wait.' });

    try {
      const arrayBuffer = await pdfFile.arrayBuffer();

      // First, try to load with pdf.js to verify the password
      try {
        await pdfjsLib.getDocument({ data: arrayBuffer, password }).promise;
      } catch (error: any) {
        if (error.name === 'PasswordException') {
            toast({
                title: 'Incorrect Password',
                description: 'The password you entered is incorrect. Please try again.',
                variant: 'destructive',
            });
        } else {
            toast({
                title: 'PDF Load Error',
                description: 'This PDF does not appear to be password protected.',
                variant: 'destructive',
            });
        }
        setIsProcessing(false);
        return;
      }

      // If password is correct, load with pdf-lib and re-save
      const pdfDoc = await PDFDocument.load(arrayBuffer, {
        password: password,
        ignoreEncryption: false, // Make sure to handle encryption
      });

      const newPdfDoc = await PDFDocument.create();
      const copiedPages = await newPdfDoc.copyPages(pdfDoc, pdfDoc.getPageIndices());
      copiedPages.forEach(page => newPdfDoc.addPage(page));

      const pdfBytes = await newPdfDoc.save();

      await fileSave(new Blob([pdfBytes], { type: 'application/pdf' }), {
        fileName: `unlocked-${pdfFile.name}`,
        extensions: ['.pdf'],
      });

      toast({ title: 'Password Removed!', description: 'Your unlocked PDF has been saved.' });
    } catch (error) {
      console.error(error);
      toast({
        title: 'Processing Failed',
        description: 'An unexpected error occurred. The PDF might be corrupted or use an unsupported encryption type.',
        variant: 'destructive',
      });
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
              </div>
            </div>

            <div className='space-y-2'>
                <Label htmlFor='password'>PDF Password</Label>
                <div className='relative'>
                    <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input 
                        id="password" 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password to unlock"
                        disabled={isProcessing}
                        className="pl-10"
                    />
                </div>
            </div>
            
            <div className='flex flex-wrap gap-2'>
              <Button onClick={handleRemovePassword} disabled={isProcessing || !password}>
                {isProcessing ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Download className="mr-2 h-4 w-4" />
                )}
                {isProcessing ? 'Processing...' : 'Unlock & Download PDF'}
              </Button>
              <Button variant="outline" onClick={handleReset} disabled={isProcessing}>
                <Trash2 className="mr-2 h-4 w-4" /> Use Another PDF
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}


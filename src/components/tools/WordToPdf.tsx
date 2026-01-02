
'use client';

import { useState, useRef, ChangeEvent } from 'react';
import * as mammoth from 'mammoth';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { fileSave } from 'browser-fs-access';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UploadCloud, Download, Trash2, Loader2, FileText, File } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';

export function WordToPdf() {
  const [wordFile, setWordFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
      handleReset();
      setWordFile(file);
    } else if (file) {
      toast({
        title: 'Invalid File Type',
        description: 'Please select a .docx file.',
        variant: 'destructive',
      });
    }
  };

  const handleReset = () => {
    setWordFile(null);
    setIsConverting(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleConvert = async () => {
    if (!wordFile) return;

    setIsConverting(true);
    toast({ title: 'Starting conversion...', description: 'Extracting text from Word document.' });

    try {
        const arrayBuffer = await wordFile.arrayBuffer();
        const { value: html } = await mammoth.convertToHtml({ arrayBuffer });
        
        // Create a temporary div to parse HTML and extract text
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        const text = tempDiv.innerText || 'No text content found.';
        
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage();
        const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
        const { width, height } = page.getSize();
        
        page.drawText(text, {
            x: 50,
            y: height - 4 * 12,
            font,
            size: 12,
            lineHeight: 14,
            maxWidth: width - 100,
            color: rgb(0, 0, 0),
        });

        const pdfBytes = await pdfDoc.save();

        await fileSave(new Blob([pdfBytes], { type: 'application/pdf' }), {
            fileName: `${wordFile.name.replace(/\.docx$/, '')}.pdf`,
            extensions: ['.pdf'],
        });

        toast({ title: 'Conversion Successful!', description: 'The text content has been saved as a PDF.' });
    } catch (error) {
      console.error(error);
      toast({
        title: 'Conversion Failed',
        description: 'An error occurred during conversion. The file may be corrupted.',
        variant: 'destructive',
      });
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <Card>
      <CardContent className="pt-6 space-y-6">
        {!wordFile ? (
          <div
            className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            <UploadCloud className="w-16 h-16 text-muted-foreground" />
            <p className="mt-4 text-lg font-semibold">Click or drag .docx file to upload</p>
            <p className="text-muted-foreground">Note: This tool extracts text content only. Complex formatting will be lost.</p>
            <Input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept=".docx"
              onChange={handleFileChange}
            />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 rounded-lg border bg-muted/50">
              <File className="w-8 h-8 text-muted-foreground" />
              <div className="flex-1">
                <p className="font-semibold truncate">{wordFile?.name}</p>
                <p className="text-xs text-muted-foreground">
                  {Math.round(wordFile.size / 1024)} KB
                </p>
              </div>
            </div>
            
            <div className='flex flex-wrap gap-2'>
              <Button onClick={handleConvert} disabled={isConverting}>
                {isConverting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Download className="mr-2 h-4 w-4" />
                )}
                {isConverting ? `Converting...` : 'Convert & Download PDF'}
              </Button>
              <Button variant="outline" onClick={handleReset} disabled={isConverting}>
                <Trash2 className="mr-2 h-4 w-4" /> Convert Another File
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

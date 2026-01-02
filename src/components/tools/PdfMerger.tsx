
'use client';

import { useState, useRef, ChangeEvent } from 'react';
import { PDFDocument } from 'pdf-lib';
import { fileSave } from 'browser-fs-access';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UploadCloud, Download, Trash2, Loader2, FileText, PlusCircle, Combine } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Reorder } from "framer-motion"
import Image from 'next/image';


interface PdfFile {
  id: number;
  file: File;
}

export function PdfMerger() {
  const [pdfs, setPdfs] = useState<PdfFile[]>([]);
  const [isConverting, setIsConverting] = useState(false);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newPdfs: PdfFile[] = Array.from(files)
        .filter(file => file.type === 'application/pdf')
        .map((file, index) => ({
            id: Date.now() + index,
            file,
        }));

    if (newPdfs.length !== files.length) {
        toast({
            title: "Some files were not PDFs",
            description: "Only PDF files are supported and have been added.",
            variant: "default",
        })
    }
    
    setPdfs(prev => [...prev, ...newPdfs]);
  };

  const handleReset = () => {
    setPdfs([]);
    if (fileInputRef.current) {
        fileInputRef.current.value = "";
    }
  };

  const handleMerge = async () => {
    if (pdfs.length < 2) {
        toast({ title: 'Not enough files', description: 'Please upload at least two PDFs to merge.', variant: 'destructive' });
        return;
    };

    setIsConverting(true);
    toast({ title: 'Merging PDFs...', description: 'Please wait while we process your files.' });

    try {
        const mergedPdf = await PDFDocument.create();

        for (const pdfFile of pdfs) {
            const pdfBytes = await pdfFile.file.arrayBuffer();
            const pdf = await PDFDocument.load(pdfBytes);
            const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
            copiedPages.forEach((page) => mergedPdf.addPage(page));
        }
        
        const mergedPdfBytes = await mergedPdf.save();
        
        await fileSave(new Blob([mergedPdfBytes], { type: 'application/pdf' }), {
            fileName: 'merged.pdf',
            extensions: ['.pdf'],
        });

        toast({ title: 'Merge Successful!', description: 'Your merged PDF has been saved.' });

    } catch (error) {
        console.error(error);
        toast({
            title: 'Merge Failed',
            description: 'An error occurred while merging the PDFs. Please ensure they are not corrupted or password-protected.',
            variant: 'destructive',
        });
    } finally {
        setIsConverting(false);
    }
  };

  return (
    <Card>
      <CardContent className="pt-6 space-y-6">
        {pdfs.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            <UploadCloud className="w-16 h-16 text-muted-foreground" />
            <p className="mt-4 text-lg font-semibold">Click or drag PDF files to upload</p>
            <p className="text-muted-foreground">Select two or more PDFs to merge.</p>
            <Input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept="application/pdf"
              multiple
              onChange={handleFileChange}
            />
          </div>
        ) : (
          <>
            <div className='flex flex-wrap gap-2'>
                 <Button onClick={handleMerge} disabled={isConverting || pdfs.length < 2}>
                    {isConverting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Combine className="mr-2 h-4 w-4" />}
                    {isConverting ? 'Merging...' : `Merge ${pdfs.length} PDFs`}
                </Button>
                <Button variant="outline" onClick={() => fileInputRef.current?.click()} disabled={isConverting}>
                    <PlusCircle className="mr-2 h-4 w-4" /> Add More PDFs
                </Button>
                <Button variant="destructive" onClick={handleReset} disabled={isConverting}>
                    <Trash2 className="mr-2 h-4 w-4" /> Clear All
                </Button>
                 <Input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept="application/pdf"
                  multiple
                  onChange={handleFileChange}
                />
            </div>
            
            <p className='text-sm text-muted-foreground'>Drag and drop files to reorder them before merging.</p>

            <Reorder.Group axis="y" values={pdfs} onReorder={setPdfs} className="space-y-2">
                {pdfs.map((pdf, index) => (
                    <Reorder.Item key={pdf.id} value={pdf} className="bg-muted/50 p-2 rounded-lg border cursor-grab">
                        <div className="flex items-center gap-4">
                            <div className="font-bold text-lg">{index + 1}</div>
                            <FileText className="w-8 h-8 text-muted-foreground flex-shrink-0" />
                            <p className="flex-grow truncate font-mono text-sm">{pdf.file.name}</p>
                            <p className="text-sm text-muted-foreground">{Math.round(pdf.file.size / 1024)} KB</p>
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

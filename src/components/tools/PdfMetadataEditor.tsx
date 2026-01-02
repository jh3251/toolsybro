
'use client';

import { useState, useRef, ChangeEvent, useEffect } from 'react';
import { PDFDocument } from 'pdf-lib';
import { fileSave } from 'browser-fs-access';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UploadCloud, Download, Trash2, Loader2, FileText, Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Label } from '../ui/label';

interface Metadata {
    title: string;
    author: string;
    subject: string;
    keywords: string;
    creator: string;
    producer: string;
    creationDate: string;
    modificationDate: string;
}

const initialMetadata: Metadata = {
    title: '',
    author: '',
    subject: '',
    keywords: '',
    creator: '',
    producer: '',
    creationDate: '',
    modificationDate: '',
};

export function PdfMetadataEditor() {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [metadata, setMetadata] = useState<Metadata>(initialMetadata);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      handleReset();
      setPdfFile(file);
      setIsProcessing(true);
      toast({ title: 'Loading Metadata...', description: 'Reading data from your PDF.' });

      try {
        const arrayBuffer = await file.arrayBuffer();
        const pdfDoc = await PDFDocument.load(arrayBuffer, {
          // Ignore encryption to read metadata even from protected files, if possible
          ignoreEncryption: true,
        });

        const formatDate = (date: Date | undefined) => date ? date.toLocaleString() : 'N/A';

        setMetadata({
            title: pdfDoc.getTitle() || '',
            author: pdfDoc.getAuthor() || '',
            subject: pdfDoc.getSubject() || '',
            keywords: pdfDoc.getKeywords() || '',
            creator: pdfDoc.getCreator() || '',
            producer: pdfDoc.getProducer() || '',
            creationDate: formatDate(pdfDoc.getCreationDate()),
            modificationDate: formatDate(pdfDoc.getModificationDate()),
        });
        toast({ title: 'Metadata Loaded', description: 'You can now edit the metadata fields.' });
      } catch (e: any) {
        toast({ title: 'Error Loading PDF', description: e.message || 'The file might be corrupted or password-protected.', variant: 'destructive' });
        handleReset();
      } finally {
        setIsProcessing(false);
      }
    }
  };
  
  const handleReset = () => {
    setPdfFile(null);
    setMetadata(initialMetadata);
    setIsProcessing(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  const handleMetadataChange = (field: keyof Metadata, value: string) => {
    setMetadata(prev => ({...prev, [field]: value}));
  }

  const handleSaveChanges = async () => {
    if (!pdfFile) return;

    setIsProcessing(true);
    toast({ title: 'Saving Metadata...', description: 'Applying your changes to the PDF.' });

    try {
      const existingPdfBytes = await pdfFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      
      if(metadata.title) pdfDoc.setTitle(metadata.title);
      if(metadata.author) pdfDoc.setAuthor(metadata.author);
      if(metadata.subject) pdfDoc.setSubject(metadata.subject);
      if(metadata.keywords) pdfDoc.setKeywords(metadata.keywords.split(',').map(k => k.trim()));
      
      // Note: Creation/Modification dates are usually read-only or updated automatically.
      // pdf-lib does not have setters for these in the same way as other fields.
      // We will update the modification date automatically.
      pdfDoc.setModificationDate(new Date());

      const pdfBytes = await pdfDoc.save();

      await fileSave(new Blob([pdfBytes], { type: 'application/pdf' }), {
        fileName: `edited-${pdfFile.name}`,
        extensions: ['.pdf'],
      });

      toast({ title: 'PDF Saved Successfully!', description: 'Your updated PDF has been saved.' });
    } catch (e: any) {
      toast({ title: 'Error Saving PDF', description: e.message || 'An unexpected error occurred.', variant: 'destructive' });
    } finally {
      setIsProcessing(false);
    }
  };
  
  const metadataFields: (keyof Metadata)[] = ['title', 'author', 'subject', 'keywords'];
  const readOnlyFields: (keyof Metadata)[] = ['creator', 'producer', 'creationDate', 'modificationDate'];


  return (
    <Card>
      <CardContent className="pt-6 space-y-6">
        {!pdfFile ? (
          <div
            className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            {isProcessing ? (
              <Loader2 className="w-16 h-16 text-muted-foreground animate-spin" />
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
          <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className='flex items-center gap-2'><FileText/> {pdfFile.name}</CardTitle>
                </CardHeader>
                <CardContent className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    {metadataFields.map(field => (
                        <div key={field} className="space-y-2">
                            <Label htmlFor={field} className='capitalize'>{field}</Label>
                            <Input
                                id={field}
                                value={metadata[field]}
                                onChange={(e) => handleMetadataChange(field, e.target.value)}
                                placeholder={`Enter ${field}...`}
                                disabled={isProcessing}
                            />
                        </div>
                    ))}
                     {readOnlyFields.map(field => (
                        <div key={field} className="space-y-2">
                            <Label htmlFor={field} className='capitalize text-muted-foreground'>{field}</Label>
                            <Input
                                id={field}
                                value={metadata[field]}
                                readOnly
                                className='bg-muted/50 border-dashed'
                            />
                        </div>
                    ))}
                </CardContent>
            </Card>
            
            <div className="flex flex-wrap gap-2">
              <Button onClick={handleSaveChanges} disabled={isProcessing}>
                {isProcessing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
                Save Changes & Download
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


import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { PdfCompressor } from '@/components/tools/PdfCompressor';

export const metadata: Metadata = {
  title: 'PDF Compressor',
  description: 'Reduce the file size of your PDF files online for free. Optimize your PDFs for sharing and storage without sacrificing quality.',
};

export default function PdfCompressorPage() {
  return (
    <div className="space-y-8">
      <header className="flex items-center gap-4">
        <Link href="/">
            <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back to Tools</span>
            </Button>
        </Link>
        <div>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">PDF Compressor</h1>
            <p className="mt-2 text-xl text-muted-foreground">
            Reduce the file size of your PDFs for easy sharing.
            </p>
        </div>
      </header>
      <PdfCompressor />
    </div>
  );
}

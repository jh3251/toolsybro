
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { PdfSplitter } from '@/components/tools/PdfSplitter';

export const metadata: Metadata = {
  title: 'PDF Splitter',
  description: 'Easily extract pages or ranges from your PDF files. Split a single PDF into multiple documents online.',
};

export default function PdfSplitterPage() {
  return (
    <div className="space-y-8">
      <header className="flex items-center gap-4">
        <Link href="/?category=PDF+Tools">
            <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back to Tools</span>
            </Button>
        </Link>
        <div>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">PDF Splitter</h1>
            <p className="mt-2 text-xl text-muted-foreground">
            Extract pages from a PDF to create a new document.
            </p>
        </div>
      </header>
      <PdfSplitter />
    </div>
  );
}

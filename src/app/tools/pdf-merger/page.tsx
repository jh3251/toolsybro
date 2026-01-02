
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { PdfMerger } from '@/components/tools/PdfMerger';

export const metadata: Metadata = {
  title: 'PDF Merger',
  description: 'Combine multiple PDF files into one document for free. Merge PDFs online easily and securely.',
};

export default function PdfMergerPage() {
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
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">PDF Merger</h1>
            <p className="mt-2 text-xl text-muted-foreground">
            Combine multiple PDF files into one.
            </p>
        </div>
      </header>
      <PdfMerger />
    </div>
  );
}

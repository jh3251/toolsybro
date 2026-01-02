
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { PdfPageRotator } from '@/components/tools/PdfPageRotator';

export const metadata: Metadata = {
  title: 'PDF Page Rotator | Free Online Tool | ToolsyBro',
  description: 'Easily rotate pages in your PDF files with our 100% free tool. Upload a document, rotate individual pages, and download the updated PDF.',
};

export default function PdfPageRotatorPage() {
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
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">PDF Page Rotator</h1>
            <p className="mt-2 text-xl text-muted-foreground">
            Rotate pages within your PDF files.
            </p>
        </div>
      </header>
      <PdfPageRotator />
    </div>
  );
}

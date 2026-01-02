
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { JpgToPdf } from '@/components/tools/JpgToPdf';

export const metadata: Metadata = {
  title: 'JPG to PDF Converter | Free Online Tool | ToolsyBro',
  description: 'Combine one or more JPG images into a single, easy-to-share PDF file with our 100% free, fast, and secure client-side converter.',
};

export default function JpgToPdfPage() {
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
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">JPG to PDF</h1>
            <p className="mt-2 text-xl text-muted-foreground">
            Combine multiple JPG images into a single PDF.
            </p>
        </div>
      </header>
      <JpgToPdf />
    </div>
  );
}

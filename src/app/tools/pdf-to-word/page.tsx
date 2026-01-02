
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { PdfToText } from '@/components/tools/PdfToText';

export const metadata: Metadata = {
  title: 'PDF to Word (Text Extractor)',
  description: 'Extract text content from a PDF file to easily copy and paste into a Word document or other text editor.',
};

export default function PdfToWordPage() {
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
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">PDF to Word (Text Extractor)</h1>
            <p className="mt-2 text-xl text-muted-foreground">
            Extract text from your PDF to edit in Word.
            </p>
        </div>
      </header>
      <PdfToText />
    </div>
  );
}


import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { WordToPdf } from '@/components/tools/WordToPdf';

export const metadata: Metadata = {
  title: 'Word to PDF',
  description: 'Convert the text content of a Word document into a simple PDF file.',
};

export default function WordToPdfPage() {
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
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">Word to PDF</h1>
            <p className="mt-2 text-xl text-muted-foreground">
            Extract text from a .docx file and save it as a PDF.
            </p>
        </div>
      </header>
      <WordToPdf />
    </div>
  );
}

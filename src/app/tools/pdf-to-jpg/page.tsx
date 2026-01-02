
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { PdfToJpg } from '@/components/tools/PdfToJpg';

export const metadata: Metadata = {
  title: 'PDF to JPG',
  description: 'Easily convert each page of a PDF file into a high-quality JPG image. Free, online, and instant.',
};

export default function PdfToJpgPage() {
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
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">PDF to JPG Converter</h1>
            <p className="mt-2 text-xl text-muted-foreground">
            Convert PDF pages to JPG images in seconds.
            </p>
        </div>
      </header>
      <PdfToJpg />
    </div>
  );
}

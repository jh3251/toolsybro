
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { ImageConverter } from '@/components/tools/ImageConverter';

export const metadata: Metadata = {
  title: 'Image Converter',
  description: 'Convert images between JPG, PNG, and WEBP formats online for free. Fast, easy, and secure.',
};

export default function ImageConverterPage() {
  return (
    <div className="space-y-8">
      <header className="flex items-center gap-4">
        <Link href="/?category=Image+Tools">
            <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back to Tools</span>
            </Button>
        </Link>
        <div>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">Image Converter</h1>
            <p className="mt-2 text-xl text-muted-foreground">
            Easily convert your images to JPG, PNG, or WEBP.
            </p>
        </div>
      </header>
      <ImageConverter />
    </div>
  );
}

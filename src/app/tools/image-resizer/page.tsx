
import type { Metadata } from 'next';
import { ImageResizer } from '@/components/tools/ImageResizer';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Image Resizer',
  description: 'Easily resize your images online. Adjust width and height while maintaining aspect ratio.',
};

export default function ImageResizerPage() {
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
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">Image Resizer</h1>
            <p className="mt-2 text-xl text-muted-foreground">
            Change the dimensions of your images quickly and easily.
            </p>
        </div>
      </header>
      <ImageResizer />
    </div>
  );
}

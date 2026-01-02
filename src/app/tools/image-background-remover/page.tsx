
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { ImageBackgroundRemover } from '@/components/tools/ImageBackgroundRemover';

export const metadata: Metadata = {
  title: 'Image Background Remover',
  description: 'Remove a color from an image to create a transparent background. Click a color and adjust the tolerance to erase the background.',
};

export default function ImageBackgroundRemoverPage() {
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
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">Image Background Remover</h1>
            <p className="mt-2 text-xl text-muted-foreground">
            Click a color to make it transparent.
            </p>
        </div>
      </header>
      <ImageBackgroundRemover />
    </div>
  );
}

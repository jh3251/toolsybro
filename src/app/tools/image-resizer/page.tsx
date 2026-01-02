import type { Metadata } from 'next';
import { ImageResizer } from '@/components/tools/ImageResizer';

export const metadata: Metadata = {
  title: 'Image Resizer',
  description: 'Easily resize your images online. Adjust width and height while maintaining aspect ratio.',
};

export default function ImageResizerPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">Image Resizer</h1>
        <p className="mt-4 text-xl text-muted-foreground">
          Change the dimensions of your images quickly and easily.
        </p>
      </header>
      <ImageResizer />
    </div>
  );
}

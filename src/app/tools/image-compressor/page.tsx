import type { Metadata } from 'next';
import { ImageCompressor } from '@/components/tools/ImageCompressor';

export const metadata: Metadata = {
  title: 'Free Online Image Compressor',
  description: 'Reduce the file size of your JPG, PNG, and WEBP images online for free. Optimize your images for the web to improve page load speed.',
};

export default function ImageCompressorPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">Image Compressor</h1>
        <p className="mt-4 text-xl text-muted-foreground">
          Quickly reduce the file size of your images while maintaining quality.
        </p>
      </header>
      <ImageCompressor />
    </div>
  );
}

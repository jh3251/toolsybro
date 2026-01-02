
import type { Metadata } from 'next';
import { ImageToBase64 } from '@/components/tools/ImageToBase64';

export const metadata: Metadata = {
  title: 'Image to Base64 Converter',
  description: 'Easily convert your images (JPG, PNG, WEBP) into Base64 encoded strings for embedding in HTML, CSS, or JSON.',
};

export default function ImageToBase64Page() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">Image to Base64 Converter</h1>
        <p className="mt-4 text-xl text-muted-foreground">
          Upload an image to instantly convert it to a Base64 data URI.
        </p>
      </header>
      <ImageToBase64 />
    </div>
  );
}

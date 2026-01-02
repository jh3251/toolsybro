
import type { Metadata } from 'next';
import { Base64ToImage } from '@/components/tools/Base64ToImage';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Base64 to Image Converter',
  description: 'Easily decode a Base64 string into an image. Paste your Base64 data URI and instantly view and download the image.',
};

export default function Base64ToImagePage() {
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
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">Base64 to Image</h1>
            <p className="mt-2 text-xl text-muted-foreground">
            Paste a Base64 string to decode it into an image.
            </p>
        </div>
      </header>
      <Base64ToImage />
    </div>
  );
}



import type { Metadata } from 'next';
import { ImageToBase64 } from '@/components/tools/ImageToBase64';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Image to Base64 Converter | Free Online Tool | ToolsyBro',
  description: 'Easily convert your images (JPG, PNG, WEBP) into Base64 encoded strings for embedding in HTML, CSS, or JSON with our 100% free online tool.',
};

export default function ImageToBase64Page() {
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
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">Image to Base64 Converter</h1>
            <p className="mt-2 text-xl text-muted-foreground">
            Upload an image to instantly convert it to a Base64 data URI.
            </p>
        </div>
      </header>
      <ImageToBase64 />
    </div>
  );
}

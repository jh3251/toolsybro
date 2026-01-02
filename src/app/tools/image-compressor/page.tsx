
import type { Metadata } from 'next';
import { ImageCompressor } from '@/components/tools/ImageCompressor';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free Online Image Compressor | ToolsyBro',
  description: 'Reduce the file size of your JPG, PNG, and WEBP images with our 100% free online tool. Optimize your images for the web to improve page load speed.',
};

export default function ImageCompressorPage() {
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
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">Image Compressor</h1>
            <p className="mt-2 text-xl text-muted-foreground">
            Quickly reduce the file size of your images while maintaining quality.
            </p>
        </div>
      </header>
      <ImageCompressor />
    </div>
  );
}

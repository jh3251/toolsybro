
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { ImageWatermarkTool } from '@/components/tools/ImageWatermarkTool';

export const metadata: Metadata = {
  title: 'Image Watermark Tool',
  description: 'Easily add a custom text or image watermark to your photos online. Adjust position, opacity, and size to protect your images.',
};

export default function ImageWatermarkPage() {
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
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">Image Watermark Tool</h1>
            <p className="mt-2 text-xl text-muted-foreground">
            Protect your images by adding a custom watermark.
            </p>
        </div>
      </header>
      <ImageWatermarkTool />
    </div>
  );
}

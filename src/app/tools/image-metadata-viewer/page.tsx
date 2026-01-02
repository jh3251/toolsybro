
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { ImageMetadataViewer } from '@/components/tools/ImageMetadataViewer';

export const metadata: Metadata = {
  title: 'Image Metadata Viewer',
  description: 'Upload an image to view its EXIF metadata, including camera settings, location, and date.',
};

export default function ImageMetadataViewerPage() {
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
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">Image Metadata Viewer</h1>
            <p className="mt-2 text-xl text-muted-foreground">
              See the hidden EXIF data in your images.
            </p>
        </div>
      </header>
      <ImageMetadataViewer />
    </div>
  );
}

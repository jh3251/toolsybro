
import type { Metadata } from 'next';
import { ImageCropper } from '@/components/tools/ImageCropper';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Image Cropper',
  description: 'Easily crop and cut your images online. Select an area and download your perfectly cropped image.',
};

export default function ImageCropperPage() {
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
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">Image Cropper</h1>
            <p className="mt-2 text-xl text-muted-foreground">
            Upload an image to crop it to your desired dimensions.
            </p>
        </div>
      </header>
      <ImageCropper />
    </div>
  );
}

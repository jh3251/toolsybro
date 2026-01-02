
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const ImageCropper = dynamic(
  () => import('@/components/tools/ImageCropper').then((mod) => mod.ImageCropper),
  {
    ssr: false,
    loading: () => (
        <div className="space-y-6">
            <Skeleton className="w-full h-48" />
            <div className="flex gap-2">
                <Skeleton className="h-10 w-48" />
                <Skeleton className="h-10 w-36" />
            </div>
        </div>
    )
  }
);


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

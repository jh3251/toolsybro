
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';

const ImageColorPicker = dynamic(
  () => import('@/components/tools/ImageColorPicker').then(mod => mod.ImageColorPicker),
  { 
    ssr: false,
    loading: () => (
      <div className="space-y-6">
        <Skeleton className="w-full h-48" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Skeleton className="w-full h-64" />
            <Skeleton className="w-full h-64" />
        </div>
      </div>
    )
  }
);

export const metadata: Metadata = {
  title: 'Image Color Picker',
  description: 'Upload an image to pick colors, get HEX and RGB values, and generate a color palette.',
};

export default function ImageColorPickerPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">Image Color Picker</h1>
        <p className="mt-4 text-xl text-muted-foreground">
          Extract colors and palettes from any image.
        </p>
      </header>
      <ImageColorPicker />
    </div>
  );
}

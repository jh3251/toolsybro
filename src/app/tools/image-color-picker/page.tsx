import type { Metadata } from 'next';
import { ImageColorPicker } from '@/components/tools/ImageColorPicker';

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

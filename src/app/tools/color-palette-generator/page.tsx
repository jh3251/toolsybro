
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { ColorPaletteGenerator } from '@/components/tools/ColorPaletteGenerator';

export const metadata: Metadata = {
  title: 'Color Palette Generator',
  description: 'Instantly generate beautiful and harmonious color palettes for your design projects. Click to generate and copy HEX codes.',
};

export default function ColorPaletteGeneratorPage() {
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
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">Color Palette Generator</h1>
            <p className="mt-2 text-xl text-muted-foreground">
            Click "Generate" to create a new harmonious color scheme.
            </p>
        </div>
      </header>
      <ColorPaletteGenerator />
    </div>
  );
}

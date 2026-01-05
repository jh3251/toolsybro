
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { ColorPaletteGenerator } from '@/components/tools/ColorPaletteGenerator';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Color Palette Generator | Free Design Tool | ToolsyBro',
  description: 'Instantly generate beautiful and harmonious color palettes for your design projects. Click to generate and copy HEX codes with our 100% free online tool.',
};

export default function ColorPaletteGeneratorPage() {
  return (
    <Card className="overflow-hidden">
        <div className="bg-muted/30 p-6 sm:p-8">
            <div className="flex items-start gap-4 mb-6">
                <Link href="/?category=Design+%26+UI+Tools" className="hidden sm:block">
                    <Button variant="outline" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                        <span className="sr-only">Back to Tools</span>
                    </Button>
                </Link>
                <div className="flex-grow">
                    <CardTitle className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Color Palette Generator</CardTitle>
                    <CardDescription className="mt-2 text-lg text-muted-foreground">
                        Click "Generate" to create a new harmonious color scheme.
                    </CardDescription>
                </div>
            </div>
            <ColorPaletteGenerator />
        </div>
    </Card>
  );
}

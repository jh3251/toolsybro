
import type { Metadata } from 'next';
import { ImageResizer } from '@/components/tools/ImageResizer';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Image Resizer | Free Online Photo Resizing Tool | ToolsyBro',
  description: 'Easily resize your images online for free. Adjust width and height while maintaining aspect ratio with our 100% free tool.',
};

export default function ImageResizerPage() {
  return (
    <Card className="overflow-hidden">
        <div className="bg-muted/30 p-6 sm:p-8">
            <div className="flex items-start gap-4 mb-6">
                <Link href="/?category=Image+Tools" className="hidden sm:block">
                    <Button variant="outline" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                        <span className="sr-only">Back to Tools</span>
                    </Button>
                </Link>
                <div className="flex-grow">
                    <CardTitle className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Image Resizer</CardTitle>
                    <CardDescription className="mt-2 text-lg text-muted-foreground">
                        Change the dimensions of your images quickly and easily.
                    </CardDescription>
                </div>
            </div>
            <ImageResizer />
        </div>
    </Card>
  );
}

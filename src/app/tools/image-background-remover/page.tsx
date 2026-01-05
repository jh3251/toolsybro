
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { ImageBackgroundRemover } from '@/components/tools/ImageBackgroundRemover';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Free Image Background Remover | Online Tool | ToolsyBro',
  description: 'Remove a color from an image to create a transparent background with our 100% free online tool. Click a color and adjust the tolerance to erase the background.',
};

export default function ImageBackgroundRemoverPage() {
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
                    <CardTitle className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Image Background Remover</CardTitle>
                    <CardDescription className="mt-2 text-lg text-muted-foreground">
                        Click a color to make it transparent.
                    </CardDescription>
                </div>
            </div>
            <ImageBackgroundRemover />
        </div>
    </Card>
  );
}

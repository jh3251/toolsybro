
import type { Metadata } from 'next';
import { ImageToBase64 } from '@/components/tools/ImageToBase64';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Image to Base64 Converter | Free Online Tool | ToolsyBro',
  description: 'Easily convert your images (JPG, PNG, WEBP) into Base64 encoded strings for embedding in HTML, CSS, or JSON with our 100% free online tool.',
};

export default function ImageToBase64Page() {
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
                    <CardTitle className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Image to Base64</CardTitle>
                    <CardDescription className="mt-2 text-lg text-muted-foreground">
                        Upload an image to instantly convert it to a Base64 data URI.
                    </CardDescription>
                </div>
            </div>
            <ImageToBase64 />
        </div>
    </Card>
  );
}

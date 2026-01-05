
import type { Metadata } from 'next';
import { ImageCompressor } from '@/components/tools/ImageCompressor';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Free Online Image Compressor | ToolsyBro',
  description: 'Reduce the file size of your JPG, PNG, and WEBP images with our 100% free online tool. Optimize your images for the web to improve page load speed.',
};

export default function ImageCompressorPage() {
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
                    <CardTitle className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Image Compressor</CardTitle>
                    <CardDescription className="mt-2 text-lg text-muted-foreground">
                        Quickly reduce the file size of your images while maintaining quality.
                    </CardDescription>
                </div>
            </div>
            <ImageCompressor />
        </div>
    </Card>
  );
}

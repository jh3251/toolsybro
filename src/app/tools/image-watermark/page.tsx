
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { ImageWatermarkTool } from '@/components/tools/ImageWatermarkTool';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Add Watermark to Photo | Free Online Tool | ToolsyBro',
  description: 'Easily add a custom text or image watermark to your photos online. Adjust position, opacity, and size to protect your images with our 100% free tool.',
};

export default function ImageWatermarkPage() {
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
                    <CardTitle className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Image Watermark Tool</CardTitle>
                    <CardDescription className="mt-2 text-lg text-muted-foreground">
                        Protect your images by adding a custom watermark.
                    </CardDescription>
                </div>
            </div>
            <ImageWatermarkTool />
        </div>
    </Card>
  );
}


import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { ImageMetadataViewer } from '@/components/tools/ImageMetadataViewer';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Image Metadata Viewer (EXIF) | Free Tool | ToolsyBro',
  description: 'Upload an image to view its EXIF metadata, including camera settings, location, and date, with our 100% free and secure online tool.',
};

export default function ImageMetadataViewerPage() {
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
                    <CardTitle className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Image Metadata Viewer</CardTitle>
                    <CardDescription className="mt-2 text-lg text-muted-foreground">
                        See the hidden EXIF data in your images.
                    </CardDescription>
                </div>
            </div>
            <ImageMetadataViewer />
        </div>
    </Card>
  );
}

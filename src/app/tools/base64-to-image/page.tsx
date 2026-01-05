
import type { Metadata } from 'next';
import { Base64ToImage } from '@/components/tools/Base64ToImage';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Base64 to Image Converter | Free Online Tool | ToolsyBro',
  description: 'Instantly decode a Base64 string into an image. Paste your Base64 data URI and instantly view and download the resulting image with our 100% free tool.',
};

export default function Base64ToImagePage() {
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
                <CardTitle className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Base64 to Image</CardTitle>
                <CardDescription className="mt-2 text-lg text-muted-foreground">
                    Paste a Base64 string to decode it into an image.
                </CardDescription>
            </div>
        </div>
        <Base64ToImage />
      </div>
    </Card>
  );
}

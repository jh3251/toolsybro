
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { PdfPageRotator } from '@/components/tools/PdfPageRotator';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'PDF Page Rotator | Free Online Tool | ToolsyBro',
  description: 'Easily rotate pages in your PDF files with our 100% free tool. Upload a document, rotate individual pages, and download the updated PDF.',
};

export default function PdfPageRotatorPage() {
  return (
    <Card className="overflow-hidden">
        <div className="bg-muted/30 p-6 sm:p-8">
            <div className="flex items-start gap-4 mb-6">
                <Link href="/?category=PDF+Tools" className="hidden sm:block">
                    <Button variant="outline" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                        <span className="sr-only">Back to Tools</span>
                    </Button>
                </Link>
                <div className="flex-grow">
                    <CardTitle className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">PDF Page Rotator</CardTitle>
                    <CardDescription className="mt-2 text-lg text-muted-foreground">
                        Rotate pages within your PDF files.
                    </CardDescription>
                </div>
            </div>
            <PdfPageRotator />
        </div>
    </Card>
  );
}

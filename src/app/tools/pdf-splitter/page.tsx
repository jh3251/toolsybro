
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { PdfSplitter } from '@/components/tools/PdfSplitter';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'PDF Splitter | Free Online Tool to Extract Pages | ToolsyBro',
  description: 'Easily extract pages or ranges from your PDF files with our 100% free online tool. Split a single PDF into multiple documents online securely.',
};

export default function PdfSplitterPage() {
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
                    <CardTitle className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">PDF Splitter</CardTitle>
                    <CardDescription className="mt-2 text-lg text-muted-foreground">
                        Extract pages from a PDF to create a new document.
                    </CardDescription>
                </div>
            </div>
            <PdfSplitter />
        </div>
    </Card>
  );
}

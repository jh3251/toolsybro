
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { PdfCompressor } from '@/components/tools/PdfCompressor';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'PDF Compressor | Free Online PDF Size Reducer | ToolsyBro',
  description: 'Reduce the file size of your PDF files online for free. Optimize your PDFs for sharing and storage without sacrificing quality with our 100% free tool.',
};

export default function PdfCompressorPage() {
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
                    <CardTitle className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">PDF Compressor</CardTitle>
                    <CardDescription className="mt-2 text-lg text-muted-foreground">
                        Reduce the file size of your PDFs for easy sharing.
                    </CardDescription>
                </div>
            </div>
            <PdfCompressor />
        </div>
    </Card>
  );
}

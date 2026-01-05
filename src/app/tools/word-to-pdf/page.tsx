
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { WordToPdf } from '@/components/tools/WordToPdf';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Word to PDF Converter | Free Text Extractor | ToolsyBro',
  description: 'Convert the text content of a Word document (.docx) into a simple PDF file with our 100% free online tool.',
};

export default function WordToPdfPage() {
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
                    <CardTitle className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Word to PDF</CardTitle>
                    <CardDescription className="mt-2 text-lg text-muted-foreground">
                        Extract text from a .docx file and save it as a PDF.
                    </CardDescription>
                </div>
            </div>
            <WordToPdf />
        </div>
    </Card>
  );
}

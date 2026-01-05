
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { PdfMetadataEditor } from '@/components/tools/PdfMetadataEditor';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'PDF Metadata Editor | Free Online Tool | ToolsyBro',
  description: 'A 100% free and advanced tool to view and edit the metadata of your PDF files, including title, author, subject, and keywords.',
};

export default function PdfMetadataEditorPage() {
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
                    <CardTitle className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">PDF Metadata Editor</CardTitle>
                    <CardDescription className="mt-2 text-lg text-muted-foreground">
                        View and edit PDF metadata directly in your browser.
                    </CardDescription>
                </div>
            </div>
            <PdfMetadataEditor />
        </div>
    </Card>
  );
}


import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { PdfMetadataEditor } from '@/components/tools/PdfMetadataEditor';

export const metadata: Metadata = {
  title: 'PDF Metadata Editor | Free Online Tool | ToolsyBro',
  description: 'A 100% free and advanced tool to view and edit the metadata of your PDF files, including title, author, subject, and keywords.',
};

export default function PdfMetadataEditorPage() {
  return (
    <div className="space-y-8">
      <header className="flex items-center gap-4">
        <Link href="/?category=PDF+Tools">
            <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back to Tools</span>
            </Button>
        </Link>
        <div>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">PDF Metadata Editor</h1>
            <p className="mt-2 text-xl text-muted-foreground">
            View and edit PDF metadata directly in your browser.
            </p>
        </div>
      </header>
      <PdfMetadataEditor />
    </div>
  );
}

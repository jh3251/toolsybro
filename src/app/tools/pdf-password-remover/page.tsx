
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { PdfPasswordRemover } from '@/components/tools/PdfPasswordRemover';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'PDF Password Remover | Free Online Unlocker | ToolsyBro',
  description: 'Upload a password-protected PDF, provide the password, and download an unlocked version of the file with our 100% free and secure online tool.',
};

export default function PdfPasswordRemoverPage() {
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
                    <CardTitle className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">PDF Password Remover</CardTitle>
                    <CardDescription className="mt-2 text-lg text-muted-foreground">
                        Unlock your password-protected PDFs.
                    </CardDescription>
                </div>
            </div>
            <PdfPasswordRemover />
        </div>
    </Card>
  );
}

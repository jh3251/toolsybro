
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { PdfPasswordRemover } from '@/components/tools/PdfPasswordRemover';

export const metadata: Metadata = {
  title: 'PDF Password Remover',
  description: 'Upload a password-protected PDF, provide the password, and download an unlocked version of the file.',
};

export default function PdfPasswordRemoverPage() {
  return (
    <div className="space-y-8">
      <header className="flex items-center gap-4">
        <Link href="/">
            <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back to Tools</span>
            </Button>
        </Link>
        <div>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">PDF Password Remover</h1>
            <p className="mt-2 text-xl text-muted-foreground">
            Unlock your password-protected PDFs.
            </p>
        </div>
      </header>
      <PdfPasswordRemover />
    </div>
  );
}


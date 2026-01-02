
import type { Metadata } from 'next';
import { QrCodeGenerator } from '@/components/tools/QrCodeGenerator';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free QR Code Generator',
  description: 'Create custom QR codes from text or URLs online for free. Customize colors and download your high-quality QR code instantly.',
};

export default function QrCodeGeneratorPage() {
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
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">QR Code Generator</h1>
            <p className="mt-2 text-xl text-muted-foreground">
            Generate custom QR codes from any text or URL in seconds.
            </p>
        </div>
      </header>
      <QrCodeGenerator />
    </div>
  );
}

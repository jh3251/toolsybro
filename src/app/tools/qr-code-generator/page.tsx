import type { Metadata } from 'next';
import { QrCodeGenerator } from '@/components/tools/QrCodeGenerator';

export const metadata: Metadata = {
  title: 'Free QR Code Generator',
  description: 'Create custom QR codes from text or URLs online for free. Customize colors and download your high-quality QR code instantly.',
};

export default function QrCodeGeneratorPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">QR Code Generator</h1>
        <p className="mt-4 text-xl text-muted-foreground">
          Generate custom QR codes from any text or URL in seconds.
        </p>
      </header>
      <QrCodeGenerator />
    </div>
  );
}

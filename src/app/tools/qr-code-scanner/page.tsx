
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { QrCodeScanner } from '@/components/tools/QrCodeScanner';

export const metadata: Metadata = {
  title: 'QR Code Scanner | Free Online Tool | ToolsyBro',
  description: 'Scan QR codes instantly using your device\'s camera with our 100% free online QR code scanner. No app download required.',
};

export default function QrCodeScannerPage() {
  return (
    <div className="space-y-8">
      <header className="flex items-center gap-4">
        <Link href="/?category=Utility+%26+Productivity+Tools">
            <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back to Tools</span>
            </Button>
        </Link>
        <div>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">QR Code Scanner</h1>
            <p className="mt-2 text-xl text-muted-foreground">
            Scan QR codes directly from your browser.
            </p>
        </div>
      </header>
      <QrCodeScanner />
    </div>
  );
}

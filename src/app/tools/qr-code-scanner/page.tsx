
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { QrCodeScanner } from '@/components/tools/QrCodeScanner';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'QR Code Scanner | Free Online Tool | ToolsyBro',
  description: 'Scan QR codes instantly using your device\'s camera with our 100% free online QR code scanner. No app download required.',
};

export default function QrCodeScannerPage() {
  return (
    <Card className="overflow-hidden">
        <div className="bg-muted/30 p-6 sm:p-8">
            <div className="flex items-start gap-4 mb-6">
                <Link href="/?category=Utility+%26+Productivity+Tools" className="hidden sm:block">
                    <Button variant="outline" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                        <span className="sr-only">Back to Tools</span>
                    </Button>
                </Link>
                <div className="flex-grow">
                    <CardTitle className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">QR Code Scanner</CardTitle>
                    <CardDescription className="mt-2 text-lg text-muted-foreground">
                        Scan QR codes directly from your browser.
                    </CardDescription>
                </div>
            </div>
            <QrCodeScanner />
        </div>
    </Card>
  );
}

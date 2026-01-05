
import type { Metadata } from 'next';
import { QrCodeGenerator } from '@/components/tools/QrCodeGenerator';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Free QR Code Generator | Online & Customizable | ToolsyBro',
  description: 'Create custom QR codes from text or URLs online for free. Customize colors, add a logo, and download your high-quality QR code instantly with our 100% free tool.',
};

export default function QrCodeGeneratorPage() {
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
                    <CardTitle className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">QR Code Generator</CardTitle>
                    <CardDescription className="mt-2 text-lg text-muted-foreground">
                        Generate custom QR codes from any text or URL in seconds.
                    </CardDescription>
                </div>
            </div>
            <QrCodeGenerator />
        </div>
    </Card>
  );
}

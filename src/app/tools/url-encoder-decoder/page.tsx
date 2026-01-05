
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { EncoderDecoder } from '@/components/tools/EncoderDecoder';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'URL Encoder & Decoder | Free Online Tool | ToolsyBro',
  description: 'Easily encode text for use in URLs or decode a URL-encoded string back to text with our 100% free online developer tool.',
};

export default function UrlEncoderDecoderPage() {
  return (
    <Card className="overflow-hidden">
        <div className="bg-muted/30 p-6 sm:p-8">
            <div className="flex items-start gap-4 mb-6">
                <Link href="/?category=Developer+Tools" className="hidden sm:block">
                    <Button variant="outline" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                        <span className="sr-only">Back to Tools</span>
                    </Button>
                </Link>
                <div className="flex-grow">
                    <CardTitle className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">URL Encoder / Decoder</CardTitle>
                    <CardDescription className="mt-2 text-lg text-muted-foreground">
                        Convert text to and from URL-safe format.
                    </CardDescription>
                </div>
            </div>
            <EncoderDecoder type="url" />
        </div>
    </Card>
  );
}


import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { EncoderDecoder } from '@/components/tools/EncoderDecoder';

export const metadata: Metadata = {
  title: 'URL Encoder & Decoder | Free Online Tool | ToolsyBro',
  description: 'Easily encode text for use in URLs or decode a URL-encoded string back to text with our 100% free online developer tool.',
};

export default function UrlEncoderDecoderPage() {
  return (
    <div className="space-y-8">
      <header className="flex items-center gap-4">
        <Link href="/?category=Developer+Tools">
            <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back to Tools</span>
            </Button>
        </Link>
        <div>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">URL Encoder / Decoder</h1>
            <p className="mt-2 text-xl text-muted-foreground">
            Convert text to and from URL-safe format.
            </p>
        </div>
      </header>
      <EncoderDecoder type="url" />
    </div>
  );
}

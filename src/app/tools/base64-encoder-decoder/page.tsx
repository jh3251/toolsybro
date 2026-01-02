
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { EncoderDecoder } from '@/components/tools/EncoderDecoder';

export const metadata: Metadata = {
  title: 'Base64 Encoder / Decoder',
  description: 'Easily encode text to Base64 or decode a Base64 string back to text.',
};

export default function Base64EncoderDecoderPage() {
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
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">Base64 Encoder / Decoder</h1>
            <p className="mt-2 text-xl text-muted-foreground">
            Convert text to and from Base64 encoding.
            </p>
        </div>
      </header>
      <EncoderDecoder type="base64" />
    </div>
  );
}

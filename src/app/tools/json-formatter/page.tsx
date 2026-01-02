
import type { Metadata } from 'next';
import { JsonFormatter } from '@/components/tools/JsonFormatter';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Online JSON Formatter & Validator',
  description: 'Easily format, beautify, and validate your JSON data online. Our tool helps improve readability and detect errors in your JSON code for free.',
};

export default function JsonFormatterPage() {
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
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">JSON Formatter</h1>
            <p className="mt-2 text-xl text-muted-foreground">
            Clean up, format, and validate your JSON code for perfect readability.
            </p>
        </div>
      </header>
      <JsonFormatter />
    </div>
  );
}

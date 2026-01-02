
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { XmlFormatter } from '@/components/tools/XmlFormatter';

export const metadata: Metadata = {
  title: 'XML Formatter',
  description: 'Format, beautify, and validate your XML data for better readability.',
};

export default function XmlFormatterPage() {
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
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">XML Formatter</h1>
            <p className="mt-2 text-xl text-muted-foreground">
            Clean up and format your XML for perfect readability.
            </p>
        </div>
      </header>
      <XmlFormatter />
    </div>
  );
}

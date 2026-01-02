
import type { Metadata } from 'next';
import { TextCaseConverter } from '@/components/tools/TextCaseConverter';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Online Text Case Converter',
  description: 'Easily convert text to uppercase, lowercase, title case, sentence case, and more with our free online tool. Simplify your text editing tasks instantly.',
};

export default function TextCaseConverterPage() {
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
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">Text Case Converter</h1>
            <p className="mt-2 text-xl text-muted-foreground">
            Convert your text to any case with a single click.
            </p>
        </div>
      </header>
      <TextCaseConverter />
    </div>
  );
}

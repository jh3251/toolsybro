import type { Metadata } from 'next';
import { TextCaseConverter } from '@/components/tools/TextCaseConverter';

export const metadata: Metadata = {
  title: 'Online Text Case Converter',
  description: 'Easily convert text to uppercase, lowercase, title case, sentence case, and more with our free online tool. Simplify your text editing tasks instantly.',
};

export default function TextCaseConverterPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">Text Case Converter</h1>
        <p className="mt-4 text-xl text-muted-foreground">
          Convert your text to any case with a single click.
        </p>
      </header>
      <TextCaseConverter />
    </div>
  );
}

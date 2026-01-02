import type { Metadata } from 'next';
import { ParagraphCounter } from '@/components/tools/ParagraphCounter';

export const metadata: Metadata = {
  title: 'Paragraph Counter',
  description: 'Count paragraphs in your text with our free online tool.',
};

export default function ParagraphCounterPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl font-headline">Paragraph Counter</h1>
        <p className="mt-4 text-xl text-muted-foreground">
          Quickly count the number of paragraphs in any block of text.
        </p>
      </header>
      <ParagraphCounter />
    </div>
  );
}
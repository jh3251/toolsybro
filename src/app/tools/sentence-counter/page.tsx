import type { Metadata } from 'next';
import { SentenceCounter } from '@/components/tools/SentenceCounter';

export const metadata: Metadata = {
  title: 'Sentence Counter',
  description: 'Count sentences in your text with our free online tool.',
};

export default function SentenceCounterPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl font-headline">Sentence Counter</h1>
        <p className="mt-4 text-xl text-muted-foreground">
          Easily count the number of sentences in your text.
        </p>
      </header>
      <SentenceCounter />
    </div>
  );
}
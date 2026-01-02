import type { Metadata } from 'next';
import { CharacterCounter } from '@/components/tools/CharacterCounter';

export const metadata: Metadata = {
  title: 'Character Counter',
  description: 'Count characters, words, sentences, and paragraphs in your text with our free online tool.',
};

export default function CharacterCounterPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">Character Counter</h1>
        <p className="mt-4 text-xl text-muted-foreground">
          Instantly count characters, words, sentences, and paragraphs.
        </p>
      </header>
      <CharacterCounter />
    </div>
  );
}

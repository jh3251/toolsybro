import type { Metadata } from 'next';
import { WordCounter } from '@/components/tools/WordCounter';

export const metadata: Metadata = {
  title: 'Online Word Counter with Real-time Analysis',
  description: 'Count words, characters, sentences, and paragraphs in your text for free. Get real-time AI-powered analysis on the meaning and feeling of your words.',
};

export default function WordCounterPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">Online Word Counter</h1>
        <p className="mt-4 text-xl text-muted-foreground">
          Analyze your text in real-time. Count words, characters, and get AI-powered insights.
        </p>
      </header>
      <WordCounter />
    </div>
  );
}

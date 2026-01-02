
import type { Metadata } from 'next';
import { WordCounter } from '@/components/tools/WordCounter';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Online Word Counter with AI Analysis | Free Tool | ToolsyBro',
  description: 'Count words, characters, sentences, and paragraphs in your text for free. Get real-time AI-powered analysis on the meaning and feeling of your words.',
};

export default function WordCounterPage() {
  return (
    <div className="space-y-8">
      <header className="flex items-center gap-4">
        <Link href="/?category=Text+%26+Writing+Tools">
            <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back to Tools</span>
            </Button>
        </Link>
        <div>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">Online Word Counter</h1>
            <p className="mt-2 text-xl text-muted-foreground">
            Analyze your text in real-time. Count words, characters, and get AI-powered insights.
            </p>
        </div>
      </header>
      <WordCounter />
    </div>
  );
}

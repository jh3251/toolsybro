
import type { Metadata } from 'next';
import { CharacterCounter } from '@/components/tools/CharacterCounter';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free Character Counter Tool | Online Text Analyzer | ToolsyBro',
  description: 'Count characters, words, sentences, and paragraphs in your text with our 100% free online character counter tool. Perfect for writers and students.',
};

export default function CharacterCounterPage() {
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
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">Character Counter</h1>
            <p className="mt-2 text-xl text-muted-foreground">
            Instantly count characters, words, sentences, and paragraphs.
            </p>
        </div>
      </header>
      <CharacterCounter />
    </div>
  );
}

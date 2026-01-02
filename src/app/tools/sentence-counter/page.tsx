
import type { Metadata } from 'next';
import { SentenceCounter } from '@/components/tools/SentenceCounter';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Sentence Counter',
  description: 'Count sentences in your text with our free online tool.',
};

export default function SentenceCounterPage() {
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
            <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl font-headline">Sentence Counter</h1>
            <p className="mt-2 text-xl text-muted-foreground">
            Easily count the number of sentences in your text.
            </p>
        </div>
      </header>
      <SentenceCounter />
    </div>
  );
}

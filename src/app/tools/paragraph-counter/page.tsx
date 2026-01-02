
import type { Metadata } from 'next';
import { ParagraphCounter } from '@/components/tools/ParagraphCounter';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Paragraph Counter',
  description: 'Count paragraphs in your text with our free online tool.',
};

export default function ParagraphCounterPage() {
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
            <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl font-headline">Paragraph Counter</h1>
            <p className="mt-2 text-xl text-muted-foreground">
            Quickly count the number of paragraphs in any block of text.
            </p>
        </div>
      </header>
      <ParagraphCounter />
    </div>
  );
}

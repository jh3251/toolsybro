import type { Metadata } from 'next';
import { FindReplaceText } from '@/components/tools/FindReplaceText';

export const metadata: Metadata = {
  title: 'Find and Replace Text',
  description: 'Quickly find and replace words or phrases in your text with this easy-to-use online tool.',
};

export default function FindReplaceTextPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl font-headline">Find & Replace Text</h1>
        <p className="mt-4 text-xl text-muted-foreground">
          Easily search for text and replace it with something else.
        </p>
      </header>
      <FindReplaceText />
    </div>
  );
}
import type { Metadata } from 'next';
import { TextSorter } from '@/components/tools/TextSorter';

export const metadata: Metadata = {
  title: 'Text Sorter (A–Z / Z–A)',
  description: 'Sort lines of text alphabetically (A-Z or Z-A) with this free online tool.',
};

export default function TextSorterPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl font-headline">Text Sorter (A–Z / Z–A)</h1>
        <p className="mt-4 text-xl text-muted-foreground">
          Instantly sort lines of text in alphabetical or reverse alphabetical order.
        </p>
      </header>
      <TextSorter />
    </div>
  );
}
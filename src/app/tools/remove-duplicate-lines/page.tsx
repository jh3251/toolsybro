import type { Metadata } from 'next';
import { RemoveDuplicateLines } from '@/components/tools/RemoveDuplicateLines';

export const metadata: Metadata = {
  title: 'Remove Duplicate Lines',
  description: 'Easily remove duplicate lines from your text online.',
};

export default function RemoveDuplicateLinesPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl font-headline">Remove Duplicate Lines</h1>
        <p className="mt-4 text-xl text-muted-foreground">
          Clean up your text by instantly removing any duplicate lines.
        </p>
      </header>
      <RemoveDuplicateLines />
    </div>
  );
}
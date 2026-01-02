
import type { Metadata } from 'next';
import { FindReplaceText } from '@/components/tools/FindReplaceText';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Find and Replace Text',
  description: 'Quickly find and replace words or phrases in your text with this easy-to-use online tool.',
};

export default function FindReplaceTextPage() {
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
            <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl font-headline">Find & Replace Text</h1>
            <p className="mt-2 text-xl text-muted-foreground">
            Easily search for text and replace it with something else.
            </p>
        </div>
      </header>
      <FindReplaceText />
    </div>
  );
}

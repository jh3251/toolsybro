
import type { Metadata } from 'next';
import { RemoveDuplicateLines } from '@/components/tools/RemoveDuplicateLines';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Remove Duplicate Lines | Free Online Text Tool | ToolsyBro',
  description: 'Easily remove duplicate lines from your text, lists, or code with our simple and 100% free online tool.',
};

export default function RemoveDuplicateLinesPage() {
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
            <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl font-headline">Remove Duplicate Lines</h1>
            <p className="mt-2 text-xl text-muted-foreground">
            Clean up your text by instantly removing any duplicate lines.
            </p>
        </div>
      </header>
      <RemoveDuplicateLines />
    </div>
  );
}

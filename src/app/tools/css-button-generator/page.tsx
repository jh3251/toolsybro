
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { CssButtonGenerator } from '@/components/tools/CssButtonGenerator';

export const metadata: Metadata = {
  title: 'CSS Button Generator | Free Visual Tool | ToolsyBro',
  description: 'Visually design and generate custom CSS for beautiful, modern buttons. Control padding, colors, shadows, and more with our 100% free online tool.',
};

export default function CssButtonGeneratorPage() {
  return (
    <div className="space-y-8">
      <header className="flex items-center gap-4">
        <Link href="/?category=Design+%26+UI+Tools">
            <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back to Tools</span>
            </Button>
        </Link>
        <div>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">CSS Button Generator</h1>
            <p className="mt-2 text-xl text-muted-foreground">
            Visually design your perfect button and copy the CSS.
            </p>
        </div>
      </header>
      <CssButtonGenerator />
    </div>
  );
}

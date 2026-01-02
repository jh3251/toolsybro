
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { CodeMinifier } from '@/components/tools/CodeMinifier';

export const metadata: Metadata = {
  title: 'JavaScript Minifier | Free Online JS Compressor | ToolsyBro',
  description: 'Paste your JavaScript code to minify it, reducing file size and improving execution speed. A 100% free online tool for web developers.',
};

export default function JavascriptMinifierPage() {
  return (
    <div className="space-y-8">
      <header className="flex items-center gap-4">
        <Link href="/?category=Developer+Tools">
            <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back to Tools</span>
            </Button>
        </Link>
        <div>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">JavaScript Minifier</h1>
            <p className="mt-2 text-xl text-muted-foreground">
            Shrink your JS files for faster load and execution times.
            </p>
        </div>
      </header>
      <CodeMinifier language='javascript' />
    </div>
  );
}

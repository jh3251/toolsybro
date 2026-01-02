
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { CodeMinifier } from '@/components/tools/CodeMinifier';

export const metadata: Metadata = {
  title: 'CSS Minifier | Free Online Tool | ToolsyBro',
  description: 'Paste your CSS code to minify it, reducing file size and improving your website\'s load times. A 100% free tool for web developers.',
};

export default function CssMinifierPage() {
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
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">CSS Minifier</h1>
            <p className="mt-2 text-xl text-muted-foreground">
            Optimize your stylesheets by reducing their file size.
            </p>
        </div>
      </header>
      <CodeMinifier language='css' />
    </div>
  );
}

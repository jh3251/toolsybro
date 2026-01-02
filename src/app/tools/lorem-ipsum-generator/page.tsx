
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { LoremIpsumGenerator } from '@/components/tools/LoremIpsumGenerator';

export const metadata: Metadata = {
  title: 'Lorem Ipsum Generator',
  description: 'Generate placeholder text in paragraphs, sentences, or words.',
};

export default function LoremIpsumGeneratorPage() {
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
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">Lorem Ipsum Generator</h1>
            <p className="mt-2 text-xl text-muted-foreground">
            Create custom placeholder text for your designs.
            </p>
        </div>
      </header>
      <LoremIpsumGenerator />
    </div>
  );
}

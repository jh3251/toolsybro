
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { UuidGenerator } from '@/components/tools/UuidGenerator';

export const metadata: Metadata = {
  title: 'UUID Generator',
  description: 'Generate universally unique identifiers (UUIDs) with a single click.',
};

export default function UuidGeneratorPage() {
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
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">UUID Generator</h1>
            <p className="mt-2 text-xl text-muted-foreground">
            Generate version 4 UUIDs instantly.
            </p>
        </div>
      </header>
      <UuidGenerator />
    </div>
  );
}

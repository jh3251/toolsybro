
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { HashChecker } from '@/components/tools/HashChecker';

export const metadata: Metadata = {
  title: 'File Hash Checker (SHA-256)',
  description: 'Verify file integrity by comparing its calculated hash (SHA-256, SHA-384, SHA-512) against a known value.',
};

export default function HashCheckerPage() {
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
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">File Hash Checker</h1>
            <p className="mt-2 text-xl text-muted-foreground">
            Verify file integrity by calculating and comparing its hash.
            </p>
        </div>
      </header>
      <HashChecker />
    </div>
  );
}

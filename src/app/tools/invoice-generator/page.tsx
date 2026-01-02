
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { InvoiceGenerator } from '@/components/tools/InvoiceGenerator';

export const metadata: Metadata = {
  title: 'Invoice Generator',
  description: 'Create and download professional invoices for free. Customize items, quantities, rates, and tax.',
};

export default function InvoiceGeneratorPage() {
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
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">Invoice Generator</h1>
            <p className="mt-2 text-xl text-muted-foreground">
            Create professional invoices in seconds.
            </p>
        </div>
      </header>
      <InvoiceGenerator />
    </div>
  );
}

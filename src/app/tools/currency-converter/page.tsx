
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { CurrencyConverter } from '@/components/tools/CurrencyConverter';

export const metadata: Metadata = {
  title: 'Currency Converter',
  description: 'Convert between different currencies with real-time exchange rates.',
};

export default function CurrencyConverterPage() {
  return (
    <div className="space-y-8">
      <header className="flex items-center gap-4">
        <Link href="/?category=Utility+%26+Productivity+Tools">
            <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back to Tools</span>
            </Button>
        </Link>
        <div>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">Currency Converter</h1>
            <p className="mt-2 text-xl text-muted-foreground">
            Get the latest exchange rates for currencies worldwide.
            </p>
        </div>
      </header>
      <CurrencyConverter />
    </div>
  );
}

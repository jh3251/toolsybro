
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { GstVatCalculator } from '@/components/tools/GstVatCalculator';

export const metadata: Metadata = {
  title: 'GST / VAT Calculator',
  description: 'Easily add or remove GST (Goods and Services Tax) or VAT (Value Added Tax) from any price.',
};

export default function GstVatCalculatorPage() {
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
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">GST / VAT Calculator</h1>
            <p className="mt-2 text-xl text-muted-foreground">
            Quickly calculate tax-inclusive and exclusive prices.
            </p>
        </div>
      </header>
      <GstVatCalculator />
    </div>
  );
}

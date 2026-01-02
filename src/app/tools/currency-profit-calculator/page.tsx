
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { CurrencyProfitCalculator } from '@/components/tools/CurrencyProfitCalculator';

export const metadata: Metadata = {
  title: 'Forex Profit Calculator | Free Online Tool | ToolsyBro',
  description: 'Calculate the profit or loss from a currency exchange transaction based on buy and sell rates with our 100% free online finance tool.',
};

export default function CurrencyProfitCalculatorPage() {
  return (
    <div className="space-y-8">
      <header className="flex items-center gap-4">
        <Link href="/?category=Business+%26+Finance+Tools">
            <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back to Tools</span>
            </Button>
        </Link>
        <div>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">Currency Profit Calculator</h1>
            <p className="mt-2 text-xl text-muted-foreground">
            Calculate your profit or loss from forex trades.
            </p>
        </div>
      </header>
      <CurrencyProfitCalculator />
    </div>
  );
}

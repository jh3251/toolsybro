
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { ProfitMarginCalculator } from '@/components/tools/ProfitMarginCalculator';

export const metadata: Metadata = {
  title: 'Profit Margin Calculator | Free Business Tool | ToolsyBro',
  description: 'Calculate your profit margin, gross profit, and markup percentage based on cost and revenue. An essential 100% free tool for businesses.',
};

export default function ProfitMarginCalculatorPage() {
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
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">Profit Margin Calculator</h1>
            <p className="mt-2 text-xl text-muted-foreground">
            Easily calculate your business's profitability.
            </p>
        </div>
      </header>
      <ProfitMarginCalculator />
    </div>
  );
}

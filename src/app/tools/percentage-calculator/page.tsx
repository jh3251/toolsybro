
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { PercentageCalculator } from '@/components/tools/PercentageCalculator';

export const metadata: Metadata = {
  title: 'Percentage Calculator',
  description: 'A versatile tool to calculate percentages, including "what is X% of Y", "X is what percent of Y", and percentage change.',
};

export default function PercentageCalculatorPage() {
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
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">Percentage Calculator</h1>
            <p className="mt-2 text-xl text-muted-foreground">
            Calculate percentages with ease.
            </p>
        </div>
      </header>
      <PercentageCalculator />
    </div>
  );
}

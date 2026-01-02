
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { EmiCalculator } from '@/components/tools/EmiCalculator';

export const metadata: Metadata = {
  title: 'EMI Calculator | Free Loan Calculator | ToolsyBro',
  description: 'Calculate your Equated Monthly Installment (EMI) for loans with our 100% free tool. Enter loan amount, interest rate, and tenure to find your monthly payment.',
};

export default function EmiCalculatorPage() {
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
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">EMI Calculator</h1>
            <p className="mt-2 text-xl text-muted-foreground">
            Plan your loan repayments by calculating your monthly installment.
            </p>
        </div>
      </header>
      <EmiCalculator />
    </div>
  );
}

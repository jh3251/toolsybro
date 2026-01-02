
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { LoanCalculator } from '@/components/tools/LoanCalculator';

export const metadata: Metadata = {
  title: 'Loan Calculator | Free Mortgage & Auto Loan Tool | ToolsyBro',
  description: 'A versatile and 100% free loan calculator to determine your payments for mortgages, auto loans, or personal loans with various compounding options.',
};

export default function LoanCalculatorPage() {
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
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">Loan Calculator</h1>
            <p className="mt-2 text-xl text-muted-foreground">
            Estimate payments for any type of loan.
            </p>
        </div>
      </header>
      <LoanCalculator />
    </div>
  );
}

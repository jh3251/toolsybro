
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { SalaryCalculator } from '@/components/tools/SalaryCalculator';

export const metadata: Metadata = {
  title: 'Salary Calculator | Free Take-Home Pay Estimator | ToolsyBro',
  description: 'Calculate your gross and net salary breakdown by year, month, week, and day. Estimate your take-home pay after deductions with our 100% free tool.',
};

export default function SalaryCalculatorPage() {
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
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">Salary Calculator</h1>
            <p className="mt-2 text-xl text-muted-foreground">
            See a breakdown of your gross and net pay.
            </p>
        </div>
      </header>
      <SalaryCalculator />
    </div>
  );
}

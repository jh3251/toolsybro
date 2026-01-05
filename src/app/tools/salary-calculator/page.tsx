
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { SalaryCalculator } from '@/components/tools/SalaryCalculator';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Salary Calculator | Free Take-Home Pay Estimator | ToolsyBro',
  description: 'Calculate your gross and net salary breakdown by year, month, week, and day. Estimate your take-home pay after deductions with our 100% free tool.',
};

export default function SalaryCalculatorPage() {
  return (
    <Card className="overflow-hidden">
        <div className="bg-muted/30 p-6 sm:p-8">
            <div className="flex items-start gap-4 mb-6">
                <Link href="/?category=Business+%26+Finance+Tools" className="hidden sm:block">
                    <Button variant="outline" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                        <span className="sr-only">Back to Tools</span>
                    </Button>
                </Link>
                <div className="flex-grow">
                    <CardTitle className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Salary Calculator</CardTitle>
                    <CardDescription className="mt-2 text-lg text-muted-foreground">
                        See a breakdown of your gross and net pay.
                    </CardDescription>
                </div>
            </div>
            <SalaryCalculator />
        </div>
    </Card>
  );
}


import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { LoanCalculator } from '@/components/tools/LoanCalculator';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Loan Calculator | Free Mortgage & Auto Loan Tool | ToolsyBro',
  description: 'A versatile and 100% free loan calculator to determine your payments for mortgages, auto loans, or personal loans with various compounding options.',
};

export default function LoanCalculatorPage() {
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
                    <CardTitle className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Loan Calculator</CardTitle>
                    <CardDescription className="mt-2 text-lg text-muted-foreground">
                        Estimate payments for any type of loan.
                    </CardDescription>
                </div>
            </div>
            <LoanCalculator />
        </div>
    </Card>
  );
}

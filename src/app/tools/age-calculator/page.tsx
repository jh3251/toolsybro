
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { AgeCalculator } from '@/components/tools/AgeCalculator';

export const metadata: Metadata = {
  title: 'Age Calculator',
  description: 'Calculate your age in years, months, days, and more. Find out exactly how old you are and when your next birthday is.',
};

export default function AgeCalculatorPage() {
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
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">Age Calculator</h1>
            <p className="mt-2 text-xl text-muted-foreground">
            Find out your exact age in years, months, and days.
            </p>
        </div>
      </header>
      <AgeCalculator />
    </div>
  );
}

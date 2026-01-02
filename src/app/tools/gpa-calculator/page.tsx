
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { GpaCalculator } from '@/components/tools/GpaCalculator';

export const metadata: Metadata = {
  title: 'GPA Calculator',
  description: 'Calculate your Grade Point Average (GPA) by entering your courses, credits, and grades.',
};

export default function GpaCalculatorPage() {
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
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">GPA Calculator</h1>
            <p className="mt-2 text-xl text-muted-foreground">
            Enter your courses and grades to find out your GPA.
            </p>
        </div>
      </header>
      <GpaCalculator />
    </div>
  );
}

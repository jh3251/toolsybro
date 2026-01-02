
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { InterestCalculator } from '@/components/tools/InterestCalculator';

export const metadata: Metadata = {
  title: 'Simple & Compound Interest Calculator | Free Tool | ToolsyBro',
  description: 'Calculate simple and compound interest with our 100% free online tool. Enter your principal, rate, and time to see how your investment grows.',
};

export default function InterestCalculatorPage() {
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
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">Interest Calculator</h1>
            <p className="mt-2 text-xl text-muted-foreground">
            Calculate both simple and compound interest.
            </p>
        </div>
      </header>
      <InterestCalculator />
    </div>
  );
}

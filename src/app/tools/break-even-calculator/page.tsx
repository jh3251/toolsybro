
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { BreakEvenCalculator } from '@/components/tools/BreakEvenCalculator';

export const metadata: Metadata = {
  title: 'Break-Even Point Calculator | Free Business Tool | ToolsyBro',
  description: 'Calculate the number of units you need to sell to cover your costs. An essential free online tool for business planning and financial forecasting.',
};

export default function BreakEvenCalculatorPage() {
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
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">Break-Even Calculator</h1>
            <p className="mt-2 text-xl text-muted-foreground">
            Find the point where your revenue equals your costs.
            </p>
        </div>
      </header>
      <BreakEvenCalculator />
    </div>
  );
}

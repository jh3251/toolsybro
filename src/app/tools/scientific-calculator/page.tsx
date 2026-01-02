
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { ScientificCalculator } from '@/components/tools/ScientificCalculator';

export const metadata: Metadata = {
  title: 'Scientific Calculator | Free Online Math Tool | ToolsyBro',
  description: 'An advanced 100% free online scientific calculator for complex calculations, including trigonometric, logarithmic, and exponential functions.',
};

export default function ScientificCalculatorPage() {
  return (
    <div className="space-y-8">
      <header className="flex items-center gap-4">
        <Link href="/?category=Student+%26+Education+Tools">
            <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back to Tools</span>
            </Button>
        </Link>
        <div>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">Scientific Calculator</h1>
            <p className="mt-2 text-xl text-muted-foreground">
            Perform advanced mathematical calculations.
            </p>
        </div>
      </header>
      <ScientificCalculator />
    </div>
  );
}


import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { MathFormulaGenerator } from '@/components/tools/MathFormulaGenerator';

export const metadata: Metadata = {
  title: 'Math Formula Generator',
  description: 'An AI-powered tool to generate mathematical formulas and explanations for various topics.',
};

export default function MathFormulaGeneratorPage() {
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
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">AI Math Formula Generator</h1>
            <p className="mt-2 text-xl text-muted-foreground">
            Describe a math topic and get the formula and explanation.
            </p>
        </div>
      </header>
      <MathFormulaGenerator />
    </div>
  );
}

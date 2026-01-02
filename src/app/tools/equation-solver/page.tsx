
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { EquationSolver } from '@/components/tools/EquationSolver';

export const metadata: Metadata = {
  title: 'AI Equation Solver | Free Math Tool | ToolsyBro',
  description: 'Solve mathematical equations with our free, step-by-step AI-powered solver. Get instant solutions and explanations for your math problems.',
};

export default function EquationSolverPage() {
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
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">AI Equation Solver</h1>
            <p className="mt-2 text-xl text-muted-foreground">
            Get step-by-step solutions to your math problems.
            </p>
        </div>
      </header>
      <EquationSolver />
    </div>
  );
}

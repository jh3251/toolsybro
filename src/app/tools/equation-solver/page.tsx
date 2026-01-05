
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { EquationSolver } from '@/components/tools/EquationSolver';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'AI Equation Solver | Free Math Tool | ToolsyBro',
  description: 'Solve mathematical equations with our free, step-by-step AI-powered solver. Get instant solutions and explanations for your math problems.',
};

export default function EquationSolverPage() {
  return (
    <Card className="overflow-hidden">
        <div className="bg-muted/30 p-6 sm:p-8">
            <div className="flex items-start gap-4 mb-6">
                <Link href="/?category=Student+%26+Education+Tools" className="hidden sm:block">
                    <Button variant="outline" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                        <span className="sr-only">Back to Tools</span>
                    </Button>
                </Link>
                <div className="flex-grow">
                    <CardTitle className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">AI Equation Solver</CardTitle>
                    <CardDescription className="mt-2 text-lg text-muted-foreground">
                        Get step-by-step solutions to your math problems.
                    </CardDescription>
                </div>
            </div>
            <EquationSolver />
        </div>
    </Card>
  );
}

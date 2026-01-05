
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { MathFormulaGenerator } from '@/components/tools/MathFormulaGenerator';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'AI Math Formula Generator | Free Student Tool | ToolsyBro',
  description: 'A 100% free AI-powered tool to generate mathematical formulas and explanations for various topics. Perfect for students and educators.',
};

export default function MathFormulaGeneratorPage() {
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
                    <CardTitle className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">AI Math Formula Generator</CardTitle>
                    <CardDescription className="mt-2 text-lg text-muted-foreground">
                        Describe a math topic and get the formula and explanation.
                    </CardDescription>
                </div>
            </div>
            <MathFormulaGenerator />
        </div>
    </Card>
  );
}

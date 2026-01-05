
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { InterestCalculator } from '@/components/tools/InterestCalculator';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Simple & Compound Interest Calculator | Free Tool | ToolsyBro',
  description: 'Calculate simple and compound interest with our 100% free online tool. Enter your principal, rate, and time to see how your investment grows.',
};

export default function InterestCalculatorPage() {
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
                    <CardTitle className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Interest Calculator</CardTitle>
                    <CardDescription className="mt-2 text-lg text-muted-foreground">
                        Calculate both simple and compound interest.
                    </CardDescription>
                </div>
            </div>
            <InterestCalculator />
        </div>
    </Card>
  );
}

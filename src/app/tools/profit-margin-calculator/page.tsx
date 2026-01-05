
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { ProfitMarginCalculator } from '@/components/tools/ProfitMarginCalculator';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Profit Margin Calculator | Free Business Tool | ToolsyBro',
  description: 'Calculate your profit margin, gross profit, and markup percentage based on cost and revenue. An essential 100% free tool for businesses.',
};

export default function ProfitMarginCalculatorPage() {
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
                    <CardTitle className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Profit Margin Calculator</CardTitle>
                    <CardDescription className="mt-2 text-lg text-muted-foreground">
                        Easily calculate your business's profitability.
                    </CardDescription>
                </div>
            </div>
            <ProfitMarginCalculator />
        </div>
    </Card>
  );
}

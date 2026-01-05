
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { GradientGenerator } from '@/components/tools/GradientGenerator';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'CSS Gradient Generator | Free Online Tool | ToolsyBro',
  description: 'Visually create stunning linear and radial CSS gradients with our 100% free tool. Add and remove color stops, change angles, and copy the generated code.',
};

export default function GradientGeneratorPage() {
  return (
    <Card className="overflow-hidden">
        <div className="bg-muted/30 p-6 sm:p-8">
            <div className="flex items-start gap-4 mb-6">
                <Link href="/?category=Design+%26+UI+Tools" className="hidden sm:block">
                    <Button variant="outline" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                        <span className="sr-only">Back to Tools</span>
                    </Button>
                </Link>
                <div className="flex-grow">
                    <CardTitle className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">CSS Gradient Generator</CardTitle>
                    <CardDescription className="mt-2 text-lg text-muted-foreground">
                        Create beautiful gradients and get the CSS code.
                    </CardDescription>
                </div>
            </div>
            <GradientGenerator />
        </div>
    </Card>
  );
}

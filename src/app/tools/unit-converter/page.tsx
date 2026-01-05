
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { UnitConverter } from '@/components/tools/UnitConverter';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Unit Converter | Free Online Measurement Tool | ToolsyBro',
  description: 'Convert between various units of measurement like length, mass, temperature, and more with our 100% free and comprehensive online tool.',
};

export default function UnitConverterPage() {
  return (
    <Card className="overflow-hidden">
        <div className="bg-muted/30 p-6 sm:p-8">
            <div className="flex items-start gap-4 mb-6">
                <Link href="/?category=Utility+%26+Productivity+Tools" className="hidden sm:block">
                    <Button variant="outline" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                        <span className="sr-only">Back to Tools</span>
                    </Button>
                </Link>
                <div className="flex-grow">
                    <CardTitle className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Unit Converter</CardTitle>
                    <CardDescription className="mt-2 text-lg text-muted-foreground">
                        Quickly convert between different units of measurement.
                    </CardDescription>
                </div>
            </div>
            <UnitConverter />
        </div>
    </Card>
  );
}

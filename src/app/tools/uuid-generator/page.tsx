
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { UuidGenerator } from '@/components/tools/UuidGenerator';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'UUID Generator | Free Online GUID Tool | ToolsyBro',
  description: 'Generate universally unique identifiers (UUIDs) version 4 with a single click using our 100% free online developer tool.',
};

export default function UuidGeneratorPage() {
  return (
    <Card className="overflow-hidden">
        <div className="bg-muted/30 p-6 sm:p-8">
            <div className="flex items-start gap-4 mb-6">
                <Link href="/?category=Developer+Tools" className="hidden sm:block">
                    <Button variant="outline" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                        <span className="sr-only">Back to Tools</span>
                    </Button>
                </Link>
                <div className="flex-grow">
                    <CardTitle className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">UUID Generator</CardTitle>
                    <CardDescription className="mt-2 text-lg text-muted-foreground">
                        Generate version 4 UUIDs instantly.
                    </CardDescription>
                </div>
            </div>
            <UuidGenerator />
        </div>
    </Card>
  );
}

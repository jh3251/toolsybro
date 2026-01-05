
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { LoremIpsumGenerator } from '@/components/tools/LoremIpsumGenerator';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Lorem Ipsum Generator | Free Placeholder Text Tool | ToolsyBro',
  description: 'Generate placeholder text in paragraphs, sentences, or words with our 100% free and simple online Lorem Ipsum generator.',
};

export default function LoremIpsumGeneratorPage() {
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
                    <CardTitle className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Lorem Ipsum Generator</CardTitle>
                    <CardDescription className="mt-2 text-lg text-muted-foreground">
                        Create custom placeholder text for your designs.
                    </CardDescription>
                </div>
            </div>
            <LoremIpsumGenerator />
        </div>
    </Card>
  );
}

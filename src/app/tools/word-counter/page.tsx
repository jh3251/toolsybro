
import type { Metadata } from 'next';
import { WordCounter } from '@/components/tools/WordCounter';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Online Word Counter with AI Analysis | Free Tool | ToolsyBro',
  description: 'Count words, characters, sentences, and paragraphs in your text for free. Get real-time AI-powered analysis on the meaning and feeling of your words.',
};

export default function WordCounterPage() {
  return (
    <Card className="overflow-hidden">
        <div className="bg-muted/30 p-6 sm:p-8">
            <div className="flex items-start gap-4 mb-6">
                <Link href="/?category=Text+%26+Writing+Tools" className="hidden sm:block">
                    <Button variant="outline" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                        <span className="sr-only">Back to Tools</span>
                    </Button>
                </Link>
                <div className="flex-grow">
                    <CardTitle className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Online Word Counter</CardTitle>
                    <CardDescription className="mt-2 text-lg text-muted-foreground">
                        Analyze your text in real-time. Count words, characters, and get AI-powered insights.
                    </CardDescription>
                </div>
            </div>
            <WordCounter />
        </div>
    </Card>
  );
}

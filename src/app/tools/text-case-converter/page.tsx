
import type { Metadata } from 'next';
import { TextCaseConverter } from '@/components/tools/TextCaseConverter';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Online Text Case Converter Tool | Free | ToolsyBro',
  description: 'Easily convert text to uppercase, lowercase, title case, sentence case, and more with our 100% free online tool. Simplify your text editing tasks instantly.',
};

export default function TextCaseConverterPage() {
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
                    <CardTitle className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Text Case Converter</CardTitle>
                    <CardDescription className="mt-2 text-lg text-muted-foreground">
                        Convert your text to any case with a single click.
                    </CardDescription>
                </div>
            </div>
            <TextCaseConverter />
        </div>
    </Card>
  );
}

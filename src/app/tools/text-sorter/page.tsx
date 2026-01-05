
import type { Metadata } from 'next';
import { TextSorter } from '@/components/tools/TextSorter';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Text Sorter (A-Z / Z-A) | Free Online Tool | ToolsyBro',
  description: 'Sort lines of text alphabetically (A-Z or Z-A) with this 100% free and simple online tool from ToolsyBro.',
};

export default function TextSorterPage() {
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
                    <CardTitle className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Text Sorter (A–Z / Z–A)</CardTitle>
                    <CardDescription className="mt-2 text-lg text-muted-foreground">
                        Instantly sort lines of text in alphabetical or reverse alphabetical order.
                    </CardDescription>
                </div>
            </div>
            <TextSorter />
        </div>
    </Card>
  );
}

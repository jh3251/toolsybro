
import type { Metadata } from 'next';
import { RemoveDuplicateLines } from '@/components/tools/RemoveDuplicateLines';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Remove Duplicate Lines | Free Online Text Tool | ToolsyBro',
  description: 'Easily remove duplicate lines from your text, lists, or code with our simple and 100% free online tool.',
};

export default function RemoveDuplicateLinesPage() {
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
                    <CardTitle className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Remove Duplicate Lines</CardTitle>
                    <CardDescription className="mt-2 text-lg text-muted-foreground">
                        Clean up your text by instantly removing any duplicate lines.
                    </CardDescription>
                </div>
            </div>
            <RemoveDuplicateLines />
        </div>
    </Card>
  );
}

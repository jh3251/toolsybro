
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { CodeMinifier } from '@/components/tools/CodeMinifier';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'HTML Minifier | Free Online Tool for Developers | ToolsyBro',
  description: 'Paste your HTML code to minify it, reducing file size and improving website performance. A 100% free tool from ToolsyBro.',
};

export default function HtmlMinifierPage() {
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
                    <CardTitle className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">HTML Minifier</CardTitle>
                    <CardDescription className="mt-2 text-lg text-muted-foreground">
                        Reduce the size of your HTML files for faster web performance.
                    </CardDescription>
                </div>
            </div>
            <CodeMinifier language='html' />
        </div>
    </Card>
  );
}

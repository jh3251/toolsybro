
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { HashChecker } from '@/components/tools/HashChecker';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'File Hash Checker (SHA-256) | Free Security Tool | ToolsyBro',
  description: 'Verify file integrity by comparing its calculated hash (SHA-256, SHA-384, SHA-512) against a known value with our 100% free online tool.',
};

export default function HashCheckerPage() {
  return (
    <Card className="overflow-hidden">
        <div className="bg-muted/30 p-6 sm:p-8">
            <div className="flex items-start gap-4 mb-6">
                <Link href="/?category=Security+%26+Network+Tools" className="hidden sm:block">
                    <Button variant="outline" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                        <span className="sr-only">Back to Tools</span>
                    </Button>
                </Link>
                <div className="flex-grow">
                    <CardTitle className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">File Hash Checker</CardTitle>
                    <CardDescription className="mt-2 text-lg text-muted-foreground">
                        Verify file integrity by calculating and comparing its hash.
                    </CardDescription>
                </div>
            </div>
            <HashChecker />
        </div>
    </Card>
  );
}

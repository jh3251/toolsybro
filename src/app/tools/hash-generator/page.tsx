
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { HashGenerator } from '@/components/tools/HashGenerator';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Hash Generator (SHA-256, SHA-512) | Free Tool | ToolsyBro',
  description: 'Generate SHA-256, SHA-384, and SHA-512 hashes from any text input securely in your browser with our 100% free online developer tool.',
};

export default function HashGeneratorPage() {
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
                    <CardTitle className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Hash Generator</CardTitle>
                    <CardDescription className="mt-2 text-lg text-muted-foreground">
                        Generate secure hashes from your text.
                    </CardDescription>
                </div>
            </div>
            <HashGenerator />
        </div>
    </Card>
  );
}

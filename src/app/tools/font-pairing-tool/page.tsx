
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { FontPairingTool } from '@/components/tools/FontPairingTool';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Font Pairing Tool | Free for Designers | ToolsyBro',
  description: 'Discover beautiful and effective font pairings for your projects. Generate headline and body text combinations from Google Fonts with our 100% free tool.',
};

export default function FontPairingToolPage() {
  return (
    <Card className="overflow-hidden">
        <div className="bg-muted/30 p-6 sm:p-8">
            <div className="flex items-start gap-4 mb-6">
                <Link href="/?category=Design+%26+UI+Tools" className="hidden sm:block">
                    <Button variant="outline" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                        <span className="sr-only">Back to Tools</span>
                    </Button>
                </Link>
                <div className="flex-grow">
                    <CardTitle className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Font Pairing Tool</CardTitle>
                    <CardDescription className="mt-2 text-lg text-muted-foreground">
                        Discover beautiful Google Font combinations for your projects.
                    </CardDescription>
                </div>
            </div>
            <FontPairingTool />
        </div>
    </Card>
  );
}

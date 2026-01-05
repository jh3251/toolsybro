
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { RandomUsernameGenerator } from '@/components/tools/RandomUsernameGenerator';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Random Profile Generator | Free & Instant | ToolsyBro',
  description: 'Instantly generate unique usernames, full names, and addresses for your online accounts, games, and social media with our 100% free online tool.',
};

export default function RandomUsernameGeneratorPage() {
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
                    <CardTitle className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Random Profile Generator</CardTitle>
                    <CardDescription className="mt-2 text-lg text-muted-foreground">
                        Generate a complete, fictional identity including a username, name, and address.
                    </CardDescription>
                </div>
            </div>
            <RandomUsernameGenerator />
        </div>
    </Card>
  );
}

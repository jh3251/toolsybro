
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { RegexTester } from '@/components/tools/RegexTester';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Regex Tester | Free Online Regular Expression Tool | ToolsyBro',
  description: 'Test your regular expressions against a string with real-time matching and highlighting. A 100% free online tool for developers.',
};

export default function RegexTesterPage() {
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
                    <CardTitle className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Regex Tester</CardTitle>
                    <CardDescription className="mt-2 text-lg text-muted-foreground">
                        Validate and test your regular expressions instantly.
                    </CardDescription>
                </div>
            </div>
            <RegexTester />
        </div>
    </Card>
  );
}

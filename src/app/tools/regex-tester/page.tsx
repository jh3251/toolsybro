
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { RegexTester } from '@/components/tools/RegexTester';

export const metadata: Metadata = {
  title: 'Regex Tester',
  description: 'Test your regular expressions against a string with real-time matching and explanations.',
};

export default function RegexTesterPage() {
  return (
    <div className="space-y-8">
      <header className="flex items-center gap-4">
        <Link href="/">
            <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back to Tools</span>
            </Button>
        </Link>
        <div>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">Regex Tester</h1>
            <p className="mt-2 text-xl text-muted-foreground">
            Validate and test your regular expressions instantly.
            </p>
        </div>
      </header>
      <RegexTester />
    </div>
  );
}

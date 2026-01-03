
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { RandomUsernameGenerator } from '@/components/tools/RandomUsernameGenerator';

export const metadata: Metadata = {
  title: 'Random Profile Generator | Free & Instant | ToolsyBro',
  description: 'Instantly generate unique usernames, full names, and addresses for your online accounts, games, and social media with our 100% free online tool.',
};

export default function RandomUsernameGeneratorPage() {
  return (
    <div className="space-y-8">
      <header className="flex items-center gap-4">
        <Link href="/?category=Security+%26+Network+Tools">
            <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back to Tools</span>
            </Button>
        </Link>
        <div>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">Random Profile Generator</h1>
            <p className="mt-2 text-xl text-muted-foreground">
            Generate a complete, fictional identity including a username, name, and address.
            </p>
        </div>
      </header>
      <RandomUsernameGenerator />
    </div>
  );
}

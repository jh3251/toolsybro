
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { UserAgentChecker } from '@/components/tools/UserAgentChecker';

export const metadata: Metadata = {
  title: 'User Agent Checker',
  description: 'View your browser\'s user agent string. A simple tool for developers to check client information.',
};

export default function UserAgentCheckerPage() {
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
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">User Agent Checker</h1>
            <p className="mt-2 text-xl text-muted-foreground">
            Instantly see your browser's user agent string.
            </p>
        </div>
      </header>
      <UserAgentChecker />
    </div>
  );
}

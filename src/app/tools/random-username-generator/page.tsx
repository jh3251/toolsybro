
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { RandomUsernameGenerator } from '@/components/tools/RandomUsernameGenerator';

export const metadata: Metadata = {
  title: 'Random Username Generator',
  description: 'Instantly generate unique and creative usernames for your online accounts.',
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
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">Random Username Generator</h1>
            <p className="mt-2 text-xl text-muted-foreground">
            Find your next great username.
            </p>
        </div>
      </header>
      <RandomUsernameGenerator />
    </div>
  );
}

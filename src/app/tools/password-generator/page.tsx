
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { PasswordGenerator } from '@/components/tools/PasswordGenerator';

export const metadata: Metadata = {
  title: 'Secure Password Generator',
  description: 'Create strong, secure, and random passwords with customizable options for length and character types.',
};

export default function PasswordGeneratorPage() {
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
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">Password Generator</h1>
            <p className="mt-2 text-xl text-muted-foreground">
            Create strong and secure passwords instantly.
            </p>
        </div>
      </header>
      <PasswordGenerator />
    </div>
  );
}

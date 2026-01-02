
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { PrimeNumberChecker } from '@/components/tools/PrimeNumberChecker';

export const metadata: Metadata = {
  title: 'Prime Number Checker',
  description: 'Check if a number is a prime number with this free online tool.',
};

export default function PrimeNumberCheckerPage() {
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
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">Prime Number Checker</h1>
            <p className="mt-2 text-xl text-muted-foreground">
            Instantly determine if a number is prime.
            </p>
        </div>
      </header>
      <PrimeNumberChecker />
    </div>
  );
}

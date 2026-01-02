
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { PasswordStrengthChecker } from '@/components/tools/PasswordStrengthChecker';

export const metadata: Metadata = {
  title: 'Password Strength Checker',
  description: 'Analyze the strength of your password and get tips on how to make it more secure.',
};

export default function PasswordStrengthCheckerPage() {
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
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">Password Strength Checker</h1>
            <p className="mt-2 text-xl text-muted-foreground">
            See how strong your password is in real-time.
            </p>
        </div>
      </header>
      <PasswordStrengthChecker />
    </div>
  );
}

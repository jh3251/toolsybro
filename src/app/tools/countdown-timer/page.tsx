
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { CountdownTimer } from '@/components/tools/CountdownTimer';

export const metadata: Metadata = {
  title: 'Countdown Timer',
  description: 'Set a timer for any duration. Get an alert when time is up.',
};

export default function CountdownTimerPage() {
  return (
    <div className="space-y-8">
      <header className="flex items-center gap-4">
        <Link href="/?category=Utility+%26+Productivity+Tools">
            <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back to Tools</span>
            </Button>
        </Link>
        <div>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">Countdown Timer</h1>
            <p className="mt-2 text-xl text-muted-foreground">
            Set, start, and get notified.
            </p>
        </div>
      </header>
      <CountdownTimer />
    </div>
  );
}

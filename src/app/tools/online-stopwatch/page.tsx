
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { OnlineStopwatch } from '@/components/tools/OnlineStopwatch';

export const metadata: Metadata = {
  title: 'Online Stopwatch with Laps | Free Tool | ToolsyBro',
  description: 'A simple, accurate, and easy-to-use 100% free online stopwatch with lap functionality. Perfect for sports, workouts, and timing tasks.',
};

export default function OnlineStopwatchPage() {
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
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">Online Stopwatch</h1>
            <p className="mt-2 text-xl text-muted-foreground">
            Measure time with precision.
            </p>
        </div>
      </header>
      <OnlineStopwatch />
    </div>
  );
}

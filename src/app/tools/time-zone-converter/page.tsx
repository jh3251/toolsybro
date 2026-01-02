
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { TimeZoneConverter } from '@/components/tools/TimeZoneConverter';

export const metadata: Metadata = {
  title: 'Time Zone Converter',
  description: 'Convert times between different world time zones to coordinate meetings and events.',
};

export default function TimeZoneConverterPage() {
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
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">Time Zone Converter</h1>
            <p className="mt-2 text-xl text-muted-foreground">
            Find the time in another part of the world.
            </p>
        </div>
      </header>
      <TimeZoneConverter />
    </div>
  );
}

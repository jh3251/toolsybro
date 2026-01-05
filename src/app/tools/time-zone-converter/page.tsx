
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { TimeZoneConverter } from '@/components/tools/TimeZoneConverter';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Time Zone Converter | Free Online World Clock | ToolsyBro',
  description: 'Convert times between different world time zones to coordinate meetings, calls, and events with our 100% free online tool.',
};

export default function TimeZoneConverterPage() {
  return (
    <Card className="overflow-hidden">
        <div className="bg-muted/30 p-6 sm:p-8">
            <div className="flex items-start gap-4 mb-6">
                <Link href="/?category=Utility+%26+Productivity+Tools" className="hidden sm:block">
                    <Button variant="outline" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                        <span className="sr-only">Back to Tools</span>
                    </Button>
                </Link>
                <div className="flex-grow">
                    <CardTitle className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Time Zone Converter</CardTitle>
                    <CardDescription className="mt-2 text-lg text-muted-foreground">
                        Find the time in another part of the world.
                    </CardDescription>
                </div>
            </div>
            <TimeZoneConverter />
        </div>
    </Card>
  );
}

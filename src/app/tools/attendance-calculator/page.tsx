
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { AttendanceCalculator } from '@/components/tools/AttendanceCalculator';

export const metadata: Metadata = {
  title: 'Free Attendance Calculator | ToolsyBro',
  description: 'Calculate your class attendance percentage and determine how many classes you can miss or need to attend with our 100% free online attendance calculator.',
};

export default function AttendanceCalculatorPage() {
  return (
    <div className="space-y-8">
      <header className="flex items-center gap-4">
        <Link href="/?category=Student+%26+Education+Tools">
            <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back to Tools</span>
            </Button>
        </Link>
        <div>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">Attendance Calculator</h1>
            <p className="mt-2 text-xl text-muted-foreground">
            Track your attendance and plan your schedule.
            </p>
        </div>
      </header>
      <AttendanceCalculator />
    </div>
  );
}

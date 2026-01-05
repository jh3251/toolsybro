
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { AttendanceCalculator } from '@/components/tools/AttendanceCalculator';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Free Attendance Calculator | ToolsyBro',
  description: 'Calculate your class attendance percentage and determine how many classes you can miss or need to attend with our 100% free online attendance calculator.',
};

export default function AttendanceCalculatorPage() {
  return (
    <Card className="overflow-hidden">
        <div className="bg-muted/30 p-6 sm:p-8">
            <div className="flex items-start gap-4 mb-6">
                <Link href="/?category=Student+%26+Education+Tools" className="hidden sm:block">
                    <Button variant="outline" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                        <span className="sr-only">Back to Tools</span>
                    </Button>
                </Link>
                <div className="flex-grow">
                    <CardTitle className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Attendance Calculator</CardTitle>
                    <CardDescription className="mt-2 text-lg text-muted-foreground">
                        Track your attendance and plan your schedule.
                    </CardDescription>
                </div>
            </div>
            <AttendanceCalculator />
        </div>
    </Card>
  );
}

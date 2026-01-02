
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { ExamTimer } from '@/components/tools/ExamTimer';

export const metadata: Metadata = {
  title: 'Exam Timer',
  description: 'A simple and clear timer for exams and study sessions to help you manage your time effectively.',
};

export default function ExamTimerPage() {
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
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">Exam Timer</h1>
            <p className="mt-2 text-xl text-muted-foreground">
            Stay focused and manage your time during exams.
            </p>
        </div>
      </header>
      <ExamTimer />
    </div>
  );
}

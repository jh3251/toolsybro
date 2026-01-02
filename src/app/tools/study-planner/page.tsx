
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { StudyPlanner } from '@/components/tools/StudyPlanner';

export const metadata: Metadata = {
  title: 'Study Planner | Free Online Kanban Board | ToolsyBro',
  description: 'Organize your study schedule and tasks with an interactive Kanban board. A 100% free online tool for students from ToolsyBro.',
};

export default function StudyPlannerPage() {
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
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">Study Planner</h1>
            <p className="mt-2 text-xl text-muted-foreground">
              Organize your tasks on a simple Kanban board.
            </p>
        </div>
      </header>
      <StudyPlanner />
    </div>
  );
}

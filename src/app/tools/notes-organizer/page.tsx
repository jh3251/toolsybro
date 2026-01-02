
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { NotesOrganizer } from '@/components/tools/NotesOrganizer';

export const metadata: Metadata = {
  title: 'Notes Organizer',
  description: 'A placeholder for the Notes Organizer tool.',
};

export default function NotesOrganizerPage() {
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
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">Notes Organizer</h1>
            <p className="mt-2 text-xl text-muted-foreground">
            Create, edit, and manage your notes securely.
            </p>
        </div>
      </header>
      <NotesOrganizer />
    </div>
  );
}

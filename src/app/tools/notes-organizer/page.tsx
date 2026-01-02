
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { NotesOrganizer } from '@/components/tools/NotesOrganizer';

export const metadata: Metadata = {
  title: 'Online Notes Organizer | Free & Secure Tool | ToolsyBro',
  description: 'A 100% free and secure online tool to create, edit, and manage your notes. Your data is saved securely in your browser.',
};

export default function NotesOrganizerPage() {
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

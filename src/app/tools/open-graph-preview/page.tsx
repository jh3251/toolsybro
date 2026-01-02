
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { AdvancedFeaturePlaceholder } from '@/components/tools/AdvancedFeaturePlaceholder';

export const metadata: Metadata = {
  title: 'Open Graph Preview Tool',
  description: 'A placeholder for the Open Graph Preview Tool.',
};

export default function PlaceholderPage() {
  return (
    <div className="space-y-8">
      <header className="flex items-center gap-4">
        <Link href="/?category=SEO+%26+Web+Tools">
            <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back to Tools</span>
            </Button>
        </Link>
        <div>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">Open Graph Preview Tool</h1>
            <p className="mt-2 text-xl text-muted-foreground">
            This tool is coming soon!
            </p>
        </div>
      </header>
      <AdvancedFeaturePlaceholder title="Open Graph Preview Tool" />
    </div>
  );
}

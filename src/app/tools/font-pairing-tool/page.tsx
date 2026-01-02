
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { FontPairingTool } from '@/components/tools/FontPairingTool';

export const metadata: Metadata = {
  title: 'Font Pairing Tool',
  description: 'Discover beautiful and effective font pairings for your projects. Generate headline and body text combinations from Google Fonts.',
};

export default function FontPairingToolPage() {
  return (
    <div className="space-y-8">
      <header className="flex items-center gap-4">
        <Link href="/?category=Design+%26+UI+Tools">
            <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back to Tools</span>
            </Button>
        </Link>
        <div>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">Font Pairing Tool</h1>
            <p className="mt-2 text-xl text-muted-foreground">
            Discover beautiful Google Font combinations for your projects.
            </p>
        </div>
      </header>
      <FontPairingTool />
    </div>
  );
}

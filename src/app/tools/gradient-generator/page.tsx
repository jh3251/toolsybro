
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { GradientGenerator } from '@/components/tools/GradientGenerator';

export const metadata: Metadata = {
  title: 'CSS Gradient Generator',
  description: 'Visually create stunning linear and radial CSS gradients. Add and remove color stops, change angles, and copy the generated code.',
};

export default function GradientGeneratorPage() {
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
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">CSS Gradient Generator</h1>
            <p className="mt-2 text-xl text-muted-foreground">
            Create beautiful gradients and get the CSS code.
            </p>
        </div>
      </header>
      <GradientGenerator />
    </div>
  );
}

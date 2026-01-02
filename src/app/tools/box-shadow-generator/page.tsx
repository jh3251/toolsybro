
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { BoxShadowGenerator } from '@/components/tools/BoxShadowGenerator';

export const metadata: Metadata = {
  title: 'CSS Box Shadow Generator',
  description: 'Create beautiful, layered CSS box shadows with an intuitive visual editor. Customize offsets, blur, spread, and color.',
};

export default function BoxShadowGeneratorPage() {
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
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">Box Shadow Generator</h1>
            <p className="mt-2 text-xl text-muted-foreground">
            Design and generate custom CSS box shadows.
            </p>
        </div>
      </header>
      <BoxShadowGenerator />
    </div>
  );
}


import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { UnitConverter } from '@/components/tools/UnitConverter';

export const metadata: Metadata = {
  title: 'Unit Converter',
  description: 'Convert between various units of measurement like length, mass, temperature, and more.',
};

export default function UnitConverterPage() {
  return (
    <div className="space-y-8">
      <header className="flex items-center gap-4">
        <Link href="/?category=Utility+%26+Productivity+Tools">
            <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back to Tools</span>
            </Button>
        </Link>
        <div>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">Unit Converter</h1>
            <p className="mt-2 text-xl text-muted-foreground">
            Quickly convert between different units of measurement.
            </p>
        </div>
      </header>
      <UnitConverter />
    </div>
  );
}

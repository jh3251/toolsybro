
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { BorderRadiusGenerator } from '@/components/tools/BorderRadiusGenerator';

export const metadata: Metadata = {
  title: 'CSS Border Radius Generator | Free UI Tool | ToolsyBro',
  description: 'Visually generate CSS for border-radius properties. Control all four corners individually or together and copy the code instantly with our free online tool.',
};

export default function BorderRadiusGeneratorPage() {
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
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">Border Radius Generator</h1>
            <p className="mt-2 text-xl text-muted-foreground">
            Visually create the perfect border-radius for your elements.
            </p>
        </div>
      </header>
      <BorderRadiusGenerator />
    </div>
  );
}

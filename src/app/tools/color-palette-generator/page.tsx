import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Color Palette Generator',
  description: 'A placeholder for the Color Palette Generator tool.',
};

export default function PlaceholderPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">Color Palette Generator</h1>
        <p className="mt-4 text-xl text-muted-foreground">
          This tool is coming soon!
        </p>
      </header>
      <Card>
        <CardHeader>
          <CardTitle>Under Construction</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This tool is currently under construction. Please check back later!</p>
        </CardContent>
      </Card>
    </div>
  );
}

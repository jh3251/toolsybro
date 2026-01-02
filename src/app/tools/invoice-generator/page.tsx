import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Invoice Generator',
  description: 'A placeholder for the Invoice Generator tool.',
};

export default function PlaceholderPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">Invoice Generator</h1>
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

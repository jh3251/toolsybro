import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'PDF Metadata Editor',
  description: 'A placeholder for the PDF Metadata Editor tool.',
};

export default function PlaceholderPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">PDF Metadata Editor</h1>
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

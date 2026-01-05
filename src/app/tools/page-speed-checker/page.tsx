
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { AdvancedFeaturePlaceholder } from '@/components/tools/AdvancedFeaturePlaceholder';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Page Speed Checker | Free SEO Tool (Coming Soon) | ToolsyBro',
  description: 'Analyze your website\'s loading speed and get performance insights. This feature is coming soon to our collection of 100% free tools.',
};

export default function PlaceholderPage() {
  return (
    <Card className="overflow-hidden">
      <div className="bg-muted/30 p-6 sm:p-8">
        <div className="flex items-start gap-4 mb-6">
          <Link href="/?category=SEO+%26+Web+Tools" className="hidden sm:block">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back to Tools</span>
            </Button>
          </Link>
          <div className="flex-grow">
            <CardTitle className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Page Speed Checker</CardTitle>
            <CardDescription className="mt-2 text-lg text-muted-foreground">
              This tool is coming soon!
            </CardDescription>
          </div>
        </div>
        <AdvancedFeaturePlaceholder title="Page Speed Checker" />
      </div>
    </Card>
  );
}

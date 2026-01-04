
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { AdvancedFeaturePlaceholder } from '@/components/tools/AdvancedFeaturePlaceholder';

export const metadata: Metadata = {
  title: 'URL Shortener | Free Link Shortening Tool (Coming Soon) | ToolsyBro',
  description: 'A 100% free online tool to shorten long URLs. This feature is coming soon to ToolsyBro\'s collection of 100% free tools.',
};

export default function PlaceholderPage() {
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
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">URL Shortener</h1>
            <p className="mt-2 text-xl text-muted-foreground">
            This tool is coming soon!
            </p>
        </div>
      </header>
      <AdvancedFeaturePlaceholder title="URL Shortener" />
    </div>
  );
}


import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { MetaTagGenerator } from '@/components/tools/MetaTagGenerator';

export const metadata: Metadata = {
  title: 'Meta Tag Generator',
  description: 'Generate SEO-friendly meta tags (title, description, keywords) for your website to improve search engine visibility.',
};

export default function MetaTagGeneratorPage() {
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
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">Meta Tag Generator</h1>
            <p className="mt-2 text-xl text-muted-foreground">
            Create custom meta tags to improve your site's SEO.
            </p>
        </div>
      </header>
      <MetaTagGenerator />
    </div>
  );
}

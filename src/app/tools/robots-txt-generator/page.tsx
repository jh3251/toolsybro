
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { RobotsTxtGenerator } from '@/components/tools/RobotsTxtGenerator';

export const metadata: Metadata = {
  title: 'Robots.txt Generator',
  description: 'Easily generate a robots.txt file to manage how search engine crawlers interact with your website.',
};

export default function RobotsTxtGeneratorPage() {
  return (
    <div className="space-y-8">
      <header className="flex items-center gap-4">
        <Link href="/?category=SEO+%26+Web+Tools">
            <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back to Tools</span>
            </Button>
        </Link>
        <div>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">Robots.txt Generator</h1>
            <p className="mt-2 text-xl text-muted-foreground">
            Control how search engines crawl and index your site.
            </p>
        </div>
      </header>
      <RobotsTxtGenerator />
    </div>
  );
}


import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { MetaTagGenerator } from '@/components/tools/MetaTagGenerator';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Meta Tag Generator | Free SEO Tool | ToolsyBro',
  description: 'Generate SEO-friendly meta tags (title, description, keywords) for your website to improve search engine visibility with our 100% free online tool.',
};

export default function MetaTagGeneratorPage() {
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
                    <CardTitle className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Meta Tag Generator</CardTitle>
                    <CardDescription className="mt-2 text-lg text-muted-foreground">
                        Create custom meta tags to improve your site's SEO.
                    </CardDescription>
                </div>
            </div>
            <MetaTagGenerator />
        </div>
    </Card>
  );
}

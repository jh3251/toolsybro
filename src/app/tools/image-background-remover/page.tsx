
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { ImageBackgroundRemover } from '@/components/tools/ImageBackgroundRemover';

export const metadata: Metadata = {
  title: 'AI Image Background Remover',
  description: 'Automatically remove the background from any image with a single click using our free AI-powered tool. Get a transparent PNG instantly.',
};

export default function ImageBackgroundRemoverPage() {
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
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">AI Image Background Remover</h1>
            <p className="mt-2 text-xl text-muted-foreground">
            Erase backgrounds with one click.
            </p>
        </div>
      </header>
      <ImageBackgroundRemover />
    </div>
  );
}

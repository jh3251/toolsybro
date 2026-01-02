
import type { Metadata } from 'next';
import { TextToSpeech } from '@/components/tools/TextToSpeech';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Text to Speech Converter',
  description: 'Convert written text into natural-sounding speech online for free. Choose from various voices and adjust speed and pitch.',
};

export default function TextToSpeechPage() {
  return (
    <div className="space-y-8">
      <header className="flex items-center gap-4">
        <Link href="/?category=Text+%26+Writing+Tools">
            <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back to Tools</span>
            </Button>
        </Link>
        <div>
            <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl font-headline">Text to Speech</h1>
            <p className="mt-2 text-xl text-muted-foreground">
            Listen to your text. Convert any writing into high-quality audio.
            </p>
        </div>
      </header>
      <TextToSpeech />
    </div>
  );
}

import type { Metadata } from 'next';
import { TextToSpeech } from '@/components/tools/TextToSpeech';

export const metadata: Metadata = {
  title: 'Text to Speech Converter',
  description: 'Convert written text into natural-sounding speech online for free. Choose from various voices and adjust speed and pitch.',
};

export default function TextToSpeechPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl font-headline">Text to Speech</h1>
        <p className="mt-4 text-xl text-muted-foreground">
          Listen to your text. Convert any writing into high-quality audio.
        </p>
      </header>
      <TextToSpeech />
    </div>
  );
}
import type { Metadata } from 'next';
import { SpeechToText } from '@/components/tools/SpeechToText';

export const metadata: Metadata = {
  title: 'Speech to Text Converter',
  description: 'Convert your speech into written text in real-time with our free online dictation tool.',
};

export default function SpeechToTextPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl font-headline">Speech to Text</h1>
        <p className="mt-4 text-xl text-muted-foreground">
          Your voice is now your keyboard. Simply speak, and we&apos;ll type.
        </p>
      </header>
      <SpeechToText />
    </div>
  );
}
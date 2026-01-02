
import type { Metadata } from 'next';
import { SpeechToText } from '@/components/tools/SpeechToText';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Speech to Text Converter | Free Online Dictation | ToolsyBro',
  description: 'Convert your speech into written text in real-time with our 100% free online dictation tool. Just speak, and we\'ll type.',
};

export default function SpeechToTextPage() {
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
            <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl font-headline">Speech to Text</h1>
            <p className="mt-2 text-xl text-muted-foreground">
            Your voice is now your keyboard. Simply speak, and we&apos;ll type.
            </p>
        </div>
      </header>
      <SpeechToText />
    </div>
  );
}

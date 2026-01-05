
'use client';

import { useState, useMemo, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { analyzeWordMeaning } from '@/ai/flows/realtime-word-meaning-analysis';
import { useDebounce } from '@/lib/hooks/use-debounce';
import { Bot, Feather, MessageCircle, Pilcrow, Type } from 'lucide-react';
import { AdPlaceholder } from '../layout/AdPlaceholder';

interface AIAnalysis {
  meaning: string;
  feeling: string;
}

const StatCard = ({ icon: Icon, title, value }: { icon: React.ElementType, title: string, value: string | number }) => (
    <div className="flex items-center space-x-3 rounded-lg bg-muted/50 p-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
            <Icon className="h-5 w-5" />
        </div>
        <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-xl font-bold">{value}</p>
        </div>
    </div>
);

export function WordCounter() {
  const [text, setText] = useState('');
  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysis | null>(null);
  const [isLoadingAi, setIsLoadingAi] = useState(false);

  const debouncedText = useDebounce(text, 1000);

  const stats = useMemo(() => {
    const trimmedText = text.trim();
    const words = trimmedText.split(/\s+/).filter(Boolean);
    const characters = text.length;
    const sentences = trimmedText.match(/[^.!?]+[.!?]+/g) || [];
    const paragraphs = trimmedText.split(/\n+/).filter(p => p.trim() !== '');
    return {
      words: words.length,
      characters,
      sentences: sentences.length,
      paragraphs: paragraphs.length,
    };
  }, [text]);

  useEffect(() => {
    if (debouncedText.length > 20) {
      setIsLoadingAi(true);
      analyzeWordMeaning({ text: debouncedText })
        .then(setAiAnalysis)
        .catch(console.error)
        .finally(() => setIsLoadingAi(false));
    } else {
      setAiAnalysis(null);
    }
  }, [debouncedText]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard icon={Feather} title="Words" value={stats.words} />
          <StatCard icon={Type} title="Characters" value={stats.characters} />
          <StatCard icon={MessageCircle} title="Sentences" value={stats.sentences} />
          <StatCard icon={Pilcrow} title="Paragraphs" value={stats.paragraphs} />
      </div>
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Start typing or paste your text here to access our free tools..."
        className="min-h-[300px] text-base"
      />
      <div className="flex justify-center">
        <AdPlaceholder width={300} height={250} title="Advertisement" />
      </div>
    </div>
  );
}

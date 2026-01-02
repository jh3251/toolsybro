'use client';

import { useState, useMemo } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Copy, Trash2, Type, Feather, MessageCircle, Pilcrow, CaseSensitive } from 'lucide-react';

const StatCard = ({ icon: Icon, title, value }: { icon: React.ElementType; title: string; value: string | number }) => (
  <div className="flex items-center space-x-3 rounded-lg bg-muted/50 p-3 transition-all hover:bg-muted">
    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
      <Icon className="h-5 w-5" />
    </div>
    <div>
      <p className="text-sm text-muted-foreground">{title}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  </div>
);


export function CharacterCounter() {
  const [text, setText] = useState('');
  const { toast } = useToast();

  const stats = useMemo(() => {
    const trimmedText = text.trim();
    const words = trimmedText.split(/\s+/).filter(Boolean);
    const charactersWithSpaces = text.length;
    const charactersWithoutSpaces = text.replace(/\s/g, '').length;
    const sentences = trimmedText.match(/[^.!?]+[.!?]+/g) || [];
    const paragraphs = trimmedText.split(/\n+/).filter(p => p.trim() !== '');

    return {
      charactersWithSpaces,
      charactersWithoutSpaces,
      words: words.length,
      sentences: sentences.length,
      paragraphs: paragraphs.length,
    };
  }, [text]);

  const handleCopy = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied to clipboard!',
    });
  };

  const handleClear = () => {
    setText('');
  };

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type or paste your text here to count characters..."
          className="min-h-[300px] text-base"
        />
        <div className="flex flex-wrap gap-2">
          <Button onClick={handleCopy} disabled={!text}>
            <Copy className="mr-2 h-4 w-4" /> Copy
          </Button>
          <Button variant="secondary" onClick={handleClear} disabled={!text}>
            <Trash2 className="mr-2 h-4 w-4" /> Clear
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
            <StatCard icon={Type} title="Characters (with spaces)" value={stats.charactersWithSpaces} />
            <StatCard icon={CaseSensitive} title="Characters (no spaces)" value={stats.charactersWithoutSpaces} />
            <StatCard icon={Feather} title="Words" value={stats.words} />
            <StatCard icon={MessageCircle} title="Sentences" value={stats.sentences} />
            <StatCard icon={Pilcrow} title="Paragraphs" value={stats.paragraphs} />
        </div>
      </CardContent>
    </Card>
  );
}

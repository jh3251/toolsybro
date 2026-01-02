'use client';

import { useState, useMemo } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Copy, Trash2, MessageCircle } from 'lucide-react';

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


export function SentenceCounter() {
  const [text, setText] = useState('');
  const { toast } = useToast();

  const sentenceCount = useMemo(() => {
    const trimmedText = text.trim();
    if (trimmedText === '') return 0;
    // Regex to match sentence endings. It's not perfect but works for most cases.
    const sentences = trimmedText.match(/[^.!?]+[.!?]+/g) || [];
    return sentences.length;
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
          placeholder="Type or paste your text here to count sentences..."
          className="min-h-[300px] text-base"
        />
        <div className="flex flex-wrap gap-2">
          <Button onClick={handleCopy} disabled={!text}>
            <Copy className="mr-2 h-4 w-4" /> Copy
          </Button>
          <Button variant="outline" onClick={handleClear} disabled={!text}>
            <Trash2 className="mr-2 h-4 w-4" /> Clear
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
            <StatCard icon={MessageCircle} title="Sentences" value={sentenceCount} />
        </div>
      </CardContent>
    </Card>
  );
}
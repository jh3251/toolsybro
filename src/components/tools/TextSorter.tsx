'use client';

import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Copy, Trash2, ArrowDownAZ, ArrowUpZA } from 'lucide-react';

export function TextSorter() {
  const [text, setText] = useState('');
  const { toast } = useToast();

  const handleSort = (direction: 'asc' | 'desc') => {
    const lines = text.split('\n');
    const sortedLines = [...lines].sort((a, b) => {
        if (direction === 'asc') {
            return a.localeCompare(b);
        } else {
            return b.localeCompare(a);
        }
    });
    setText(sortedLines.join('\n'));
    toast({
      title: `Sorted ${direction === 'asc' ? 'A-Z' : 'Z-A'}`,
    });
  };
  
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
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => handleSort('asc')} disabled={!text}>
            <ArrowDownAZ className="mr-2 h-4 w-4" /> Sort A-Z
          </Button>
          <Button onClick={() => handleSort('desc')} disabled={!text}>
            <ArrowUpZA className="mr-2 h-4 w-4" /> Sort Z-A
          </Button>
          <Button variant="secondary" onClick={handleCopy} disabled={!text}>
            <Copy className="mr-2 h-4 w-4" /> Copy
          </Button>
          <Button variant="outline" onClick={handleClear} disabled={!text}>
            <Trash2 className="mr-2 h-4 w-4" /> Clear
          </Button>
        </div>
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your lines here to sort them..."
          className="min-h-[400px] text-base"
        />
      </CardContent>
    </Card>
  );
}
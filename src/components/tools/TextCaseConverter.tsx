'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Copy, Trash2 } from 'lucide-react';

export function TextCaseConverter() {
  const [text, setText] = useState('');
  const { toast } = useToast();

  const toSentenceCase = () => {
    setText(text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase()));
  };

  const toLowerCase = () => {
    setText(text.toLowerCase());
  };

  const toUpperCase = () => {
    setText(text.toUpperCase());
  };

  const toTitleCase = () => {
    setText(text.toLowerCase().replace(/\b\w/g, (s) => s.toUpperCase()));
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
  
  const caseButtons = [
    { label: 'Sentence case', action: toSentenceCase },
    { label: 'lower case', action: toLowerCase },
    { label: 'UPPER CASE', action: toUpperCase },
    { label: 'Title Case', action: toTitleCase },
  ]

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {caseButtons.map(btn => (
                <Button key={btn.label} onClick={btn.action} variant="outline" disabled={!text}>
                    {btn.label}
                </Button>
            ))}
        </div>
        
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type or paste your text here..."
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
      </CardContent>
    </Card>
  );
}

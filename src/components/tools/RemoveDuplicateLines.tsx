'use client';

import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Copy, Trash2, Eraser, ChevronsUpDown } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export function RemoveDuplicateLines() {
  const [text, setText] = useState('');
  const [caseSensitive, setCaseSensitive] = useState(true);
  const { toast } = useToast();

  const handleRemoveDuplicates = () => {
    const lines = text.split('\n');
    const seen = new Set<string>();
    const uniqueLines = lines.filter(line => {
      const processedLine = caseSensitive ? line : line.toLowerCase();
      if (!seen.has(processedLine)) {
        seen.add(processedLine);
        return true;
      }
      return false;
    });
    setText(uniqueLines.join('\n'));
    toast({
      title: 'Duplicates Removed',
      description: `${lines.length - uniqueLines.length} duplicate lines were removed.`,
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
        <div className="flex flex-wrap gap-4 items-center">
          <Button onClick={handleRemoveDuplicates} disabled={!text}>
            <Eraser className="mr-2 h-4 w-4" /> Remove Duplicates
          </Button>
           <div className="flex items-center space-x-2">
            <Switch id="case-sensitive" checked={caseSensitive} onCheckedChange={setCaseSensitive} />
            <Label htmlFor="case-sensitive">Case Sensitive</Label>
          </div>
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
          placeholder="Paste your lines here..."
          className="min-h-[400px] text-base"
        />
      </CardContent>
    </Card>
  );
}
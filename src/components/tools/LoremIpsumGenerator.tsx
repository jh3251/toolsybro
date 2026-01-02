
'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Copy, Trash2, Wand2 } from 'lucide-react';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';

const loremIpsumText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

export function LoremIpsumGenerator() {
  const [output, setOutput] = useState('');
  const [count, setCount] = useState(5);
  const [type, setType] = useState<'paragraphs' | 'sentences' | 'words'>('paragraphs');
  const { toast } = useToast();

  const generateText = () => {
    let result = '';
    const words = loremIpsumText.split(' ');
    const sentences = loremIpsumText.split('. ');

    if (type === 'paragraphs') {
        result = Array(count).fill(loremIpsumText).join('\n\n');
    } else if (type === 'sentences') {
        let tempResult = [];
        for (let i = 0; i < count; i++) {
            tempResult.push(sentences[i % sentences.length]);
        }
        result = tempResult.join('. ') + '.';
    } else if (type === 'words') {
        let tempResult = [];
        for (let i = 0; i < count; i++) {
            tempResult.push(words[i % words.length]);
        }
        result = tempResult.join(' ');
    }
    setOutput(result);
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    toast({
      title: 'Copied to clipboard!',
    });
  };

  const handleClear = () => {
    setOutput('');
  }

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div className="space-y-2">
                <Label htmlFor="count">Number</Label>
                <Input id="count" type="number" value={count} onChange={(e) => setCount(Number(e.target.value))} min={1} />
            </div>
            <div className="space-y-2">
                 <Label>Type</Label>
                 <RadioGroup value={type} onValueChange={(v) => setType(v as any)} className="flex gap-4 pt-2">
                    <div className="flex items-center space-x-2"><RadioGroupItem value="paragraphs" id="p" /><Label htmlFor="p">Paragraphs</Label></div>
                    <div className="flex items-center space-x-2"><RadioGroupItem value="sentences" id="s" /><Label htmlFor="s">Sentences</Label></div>
                    <div className="flex items-center space-x-2"><RadioGroupItem value="words" id="w" /><Label htmlFor="w">Words</Label></div>
                </RadioGroup>
            </div>
             <Button onClick={generateText}>
                <Wand2 className="mr-2 h-4 w-4" /> Generate
            </Button>
        </div>

        <Textarea
          value={output}
          readOnly
          placeholder="Generated Lorem Ipsum text will appear here..."
          className="min-h-[300px] bg-muted/50"
        />

        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" onClick={handleCopy} disabled={!output}>
            <Copy className="mr-2 h-4 w-4" /> Copy
          </Button>
          <Button variant="outline" onClick={handleClear} disabled={!output}>
            <Trash2 className="mr-2 h-4 w-4" /> Clear
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

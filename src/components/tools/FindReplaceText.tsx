'use client';

import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Copy, Trash2, Replace } from 'lucide-react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';

export function FindReplaceText() {
  const [text, setText] = useState('');
  const [findText, setFindText] = useState('');
  const [replaceText, setReplaceText] = useState('');
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [replaceAll, setReplaceAll] = useState(true);

  const { toast } = useToast();

  const handleReplace = () => {
    if (!text || !findText) return;
    
    const flags = replaceAll ? (caseSensitive ? 'g' : 'gi') : (caseSensitive ? '' : 'i');
    const regex = new RegExp(findText.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), flags);
    
    const newText = text.replace(regex, replaceText);
    const replacements = text.match(regex)?.length || 0;

    setText(newText);
    toast({
      title: 'Text Replaced',
      description: `${replacements} occurrence(s) of "${findText}" replaced with "${replaceText}".`
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
    setFindText('');
    setReplaceText('');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Text</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your text here..."
          className="min-h-[300px] text-base"
        />
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className='space-y-2'>
                <Label htmlFor="find">Find</Label>
                <Input id="find" value={findText} onChange={(e) => setFindText(e.target.value)} placeholder="Text to find" />
            </div>
            <div className='space-y-2'>
                <Label htmlFor="replace">Replace with</Label>
                <Input id="replace" value={replaceText} onChange={(e) => setReplaceText(e.target.value)} placeholder="Text to replace with" />
            </div>
        </div>
        <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center space-x-2">
                <Switch id="case-sensitive" checked={caseSensitive} onCheckedChange={setCaseSensitive} />
                <Label htmlFor="case-sensitive">Case Sensitive</Label>
            </div>
             <div className="flex items-center space-x-2">
                <Switch id="replace-all" checked={replaceAll} onCheckedChange={setReplaceAll} />
                <Label htmlFor="replace-all">Replace All</Label>
            </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button onClick={handleReplace} disabled={!text || !findText}>
            <Replace className="mr-2 h-4 w-4" /> Replace
          </Button>
          <Button variant="secondary" onClick={handleCopy} disabled={!text}>
            <Copy className="mr-2 h-4 w-4" /> Copy
          </Button>
          <Button variant="outline" onClick={handleClear} disabled={!text}>
            <Trash2 className="mr-2 h-4 w-4" /> Clear
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Copy, Wand2 } from 'lucide-react';

export function MetaTagGenerator() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [keywords, setKeywords] = useState('');
  const [result, setResult] = useState('');
  const { toast } = useToast();

  const handleGenerate = () => {
    const tags = `
<title>${title}</title>
<meta name="description" content="${description}">
<meta name="keywords" content="${keywords}">
    `.trim();
    setResult(tags);
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    toast({ title: 'Meta tags copied to clipboard!' });
  };

  return (
    <Card>
      <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title (Max 60 chars)</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={60}
              placeholder="Your Page Title"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description (Max 160 chars)</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={160}
              placeholder="A concise and compelling description of your page."
              rows={4}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="keywords">Keywords</Label>
            <Input
              id="keywords"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="keyword1, keyword2, keyword3"
            />
          </div>
           <Button onClick={handleGenerate} className="w-full">
                <Wand2 className="mr-2" /> Generate Meta Tags
            </Button>
        </div>

        <div className="space-y-4">
            <Label>Generated HTML</Label>
            <Textarea
                readOnly
                value={result}
                className="min-h-[200px] font-mono text-xs bg-muted/50"
                placeholder="<meta ...> tags will appear here."
            />
            <Button onClick={handleCopy} disabled={!result} variant="secondary" className="w-full">
                <Copy className="mr-2" /> Copy to Clipboard
            </Button>
        </div>
      </CardContent>
    </Card>
  );
}

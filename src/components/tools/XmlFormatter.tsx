
'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { Copy, Trash2, Wand2, AlertTriangle } from 'lucide-react';

export function XmlFormatter() {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const { toast } = useToast();

  const formatXml = (xml: string, tab: string) => {
    let formatted = '', indent = '';
    const nodes = xml.slice(1, -1).split(/>\s*</);
    if (nodes[0][0] === '?') {
        formatted += '<' + nodes.shift() + '>\n';
    }
    for(let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        if (node.charAt(0) === '/') {
            indent = indent.slice(tab.length);
        }
        formatted += indent + '<' + node + '>\n';
        if (node.charAt(0) !== '/' && node.charAt(node.length - 1) !== '/' && node.indexOf('</') === -1) {
            indent += tab;
        }
    }
    return formatted;
  }

  const handleFormat = () => {
    try {
      if (!input.trim()) {
        setError('');
        return;
      }
      
      // Basic validation
      if (!input.startsWith('<') || !input.endsWith('>')) {
        throw new Error('Invalid XML structure. Must start with < and end with >.');
      }

      const formatted = formatXml(input, '  ');
      setInput(formatted);
      setError('');
      toast({
        title: 'XML Formatted',
        description: 'Your XML has been successfully formatted.',
      });
    } catch (e: any) {
      setError(`Invalid XML: ${e.message}`);
    }
  };

  const handleClear = () => {
    setInput('');
    setError('');
  };

  const handleCopy = () => {
    if (!input) return;
    navigator.clipboard.writeText(input);
    toast({
      title: 'Copied to clipboard!',
      description: 'The formatted XML has been copied.',
    });
  };

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex flex-wrap gap-2">
          <Button onClick={handleFormat} className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Wand2 className="mr-2 h-4 w-4" /> Format XML
          </Button>
          <Button variant="secondary" onClick={handleCopy} disabled={!input}>
            <Copy className="mr-2 h-4 w-4" /> Copy
          </Button>
          <Button variant="destructive" onClick={handleClear} disabled={!input}>
            <Trash2 className="mr-2 h-4 w-4" /> Clear
          </Button>
        </div>
        
        {error && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Textarea
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            if (error) setError('');
          }}
          placeholder="Paste your XML here..."
          className="min-h-[400px] font-mono text-sm"
          aria-label="XML Input"
        />
      </CardContent>
    </Card>
  );
}

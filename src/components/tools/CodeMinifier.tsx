
'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Copy, Trash2, Wand2, FileCode, FileDigit, ArrowRight } from 'lucide-react';

interface CodeMinifierProps {
    language: 'html' | 'css' | 'javascript';
}

export function CodeMinifier({ language }: CodeMinifierProps) {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const { toast } = useToast();

  const handleMinify = () => {
    if (!input.trim()) return;

    let minifiedCode = input;
    try {
        if (language === 'html') {
            minifiedCode = input
                .replace(/<!--[\s\S]*?-->/g, '') // remove comments
                .replace(/\s+/g, ' ') // collapse whitespace
                .replace(/> </g, '><'); // remove space between tags
        } else if (language === 'css') {
            minifiedCode = input
                .replace(/\/\*[\s\S]*?\*\//g, '') // remove comments
                .replace(/\s*([{}:;,])\s*/g, '$1') // remove space around selectors and rules
                .replace(/;\s*}/g, '}'); // remove last semicolon
        } else if (language === 'javascript') {
            // A very basic JS minifier. For complex scripts, a proper parser is needed.
            minifiedCode = input
                .replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '') // remove comments
                .replace(/\s+/g, ' '); // collapse whitespace
        }
        setOutput(minifiedCode);

        const reduction = 100 - (minifiedCode.length / input.length) * 100;
        toast({
            title: `${language.toUpperCase()} Minified!`,
            description: `Code size reduced by ${reduction.toFixed(1)}%`,
        })

    } catch(e) {
        toast({
            title: "Minification Error",
            description: "Could not minify the code. Please check for syntax errors.",
            variant: "destructive",
        })
    }
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    toast({
      title: 'Copied to clipboard!',
    });
  };

  const originalSize = new Blob([input]).size;
  const minifiedSize = new Blob([output]).size;

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
                <p className="font-semibold">Original {language.toUpperCase()}</p>
                <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={`Paste your ${language} code here...`}
                    className="min-h-[300px] font-mono text-xs"
                />
            </div>
             <div className="space-y-2">
                <p className="font-semibold">Minified {language.toUpperCase()}</p>
                <Textarea
                    value={output}
                    readOnly
                    placeholder="Minified output..."
                    className="min-h-[300px] font-mono text-xs bg-muted/50"
                />
            </div>
        </div>

        {input && output && (
            <div className='flex items-center justify-center gap-4 text-center p-4 rounded-lg bg-muted'>
                <div className='flex items-center gap-2'>
                    <FileCode />
                    <div>
                        <p className='text-sm text-muted-foreground'>Original Size</p>
                        <p className='font-bold'>{(originalSize / 1024).toFixed(2)} KB</p>
                    </div>
                </div>
                <ArrowRight className='text-muted-foreground'/>
                <div className='flex items-center gap-2 text-primary'>
                    <FileDigit />
                    <div>
                        <p className='text-sm'>Minified Size</p>
                        <p className='font-bold'>{(minifiedSize / 1024).toFixed(2)} KB</p>
                    </div>
                </div>
            </div>
        )}

        <div className="flex flex-wrap gap-2">
          <Button onClick={handleMinify} disabled={!input}>
            <Wand2 className="mr-2 h-4 w-4" /> Minify
          </Button>
          <Button variant="secondary" onClick={handleCopy} disabled={!output}>
            <Copy className="mr-2 h-4 w-4" /> Copy
          </Button>
          <Button variant="destructive" onClick={handleClear} disabled={!input}>
            <Trash2 className="mr-2 h-4 w-4" /> Clear
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

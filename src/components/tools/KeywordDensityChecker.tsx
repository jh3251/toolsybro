
'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export function KeywordDensityChecker() {
  const [text, setText] = useState('');
  const [keyword, setKeyword] = useState('');

  const { density, totalWords, keywordCount } = useMemo(() => {
    if (!text || !keyword) {
      return { density: 0, totalWords: 0, keywordCount: 0 };
    }

    const words = text.toLowerCase().match(/\b\w+\b/g) || [];
    const totalWords = words.length;
    
    const keywordCount = words.filter(word => word === keyword.toLowerCase()).length;

    const density = totalWords > 0 ? (keywordCount / totalWords) * 100 : 0;

    return {
      density: parseFloat(density.toFixed(2)),
      totalWords,
      keywordCount,
    };
  }, [text, keyword]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Check Keyword Density</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="text-input">Your Text</Label>
            <Textarea
              id="text-input"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste your article or text here..."
              className="min-h-[250px]"
            />
          </div>
          <div className="space-y-4">
             <div className="space-y-2">
                <Label htmlFor="keyword-input">Target Keyword</Label>
                <Input
                id="keyword-input"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Enter a single keyword"
                />
            </div>
            <Card className="bg-muted/50">
                <CardHeader>
                    <CardTitle className="text-center">Density Result</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                    <p className="text-5xl font-bold text-primary">{density}%</p>
                    <p className="text-sm text-muted-foreground mt-2">
                        Found '{keyword}' <strong>{keywordCount}</strong> times in <strong>{totalWords}</strong> words.
                    </p>
                </CardContent>
            </Card>
             <div className="text-xs text-muted-foreground space-y-1">
                <p><strong>Note:</strong> Most SEO experts recommend a keyword density of 1-2%. This means the target keyword appears once or twice for every 100 words.</p>
             </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

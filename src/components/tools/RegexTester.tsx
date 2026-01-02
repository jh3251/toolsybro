
'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '../ui/switch';

export function RegexTester() {
  const [regex, setRegex] = useState('^\\d{5}$');
  const [testString, setTestString] = useState('12345');
  const [flags, setFlags] = useState({ g: true, i: false, m: false });
  const [error, setError] = useState('');

  const handleFlagChange = (flag: 'g' | 'i' | 'm') => {
    setFlags(prev => ({ ...prev, [flag]: !prev[flag] }));
  };

  const { matches, highlightedString } = useMemo(() => {
    let re;
    const activeFlags = Object.entries(flags).filter(([, val]) => val).map(([key]) => key).join('');
    try {
      re = new RegExp(regex, activeFlags);
      setError('');
    } catch (e: any) {
      setError(e.message);
      return { matches: [], highlightedString: testString };
    }

    if (!regex || !testString) {
        return { matches: [], highlightedString: testString };
    }
    
    const foundMatches = testString.match(re);
    if (!foundMatches) {
        return { matches: [], highlightedString: testString };
    }

    const newHighlightedString = testString.replace(re, (match) => `<mark>${match}</mark>`);
    
    return { matches: foundMatches, highlightedString: newHighlightedString };
  }, [regex, testString, flags]);


  return (
    <Card>
      <CardContent className="pt-6 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="regex-input">Regular Expression</Label>
          <div className="flex items-center gap-4">
            <span className="text-muted-foreground">/</span>
            <Input
              id="regex-input"
              value={regex}
              onChange={(e) => setRegex(e.target.value)}
              placeholder="Enter your regex"
              className="font-mono flex-1"
            />
            <span className="text-muted-foreground">/</span>
            <div className="flex items-center gap-4">
                <div className="flex items-center space-x-2">
                    <Switch id="global" checked={flags.g} onCheckedChange={() => handleFlagChange('g')} />
                    <Label htmlFor="global">g</Label>
                </div>
                 <div className="flex items-center space-x-2">
                    <Switch id="case-insensitive" checked={flags.i} onCheckedChange={() => handleFlagChange('i')} />
                    <Label htmlFor="case-insensitive">i</Label>
                </div>
                 <div className="flex items-center space-x-2">
                    <Switch id="multi-line" checked={flags.m} onCheckedChange={() => handleFlagChange('m')} />
                    <Label htmlFor="multi-line">m</Label>
                </div>
            </div>
          </div>
          {error && <p className="text-sm text-destructive mt-1">{error}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="test-string">Test String</Label>
           <Textarea
            id="test-string"
            value={testString}
            onChange={(e) => setTestString(e.target.value)}
            placeholder="Enter the string to test against"
            className="min-h-[200px] font-mono"
          />
        </div>
        
        <div className="space-y-4">
            <div>
                <h3 className="font-semibold">Result</h3>
                <div className="mt-2 p-4 rounded-md bg-muted font-mono text-sm min-h-[100px]" dangerouslySetInnerHTML={{ __html: highlightedString.replace(/\n/g, '<br/>') || 'No match' }} />
            </div>
             <div>
                <h3 className="font-semibold">Matches ({matches.length})</h3>
                <div className="mt-2 p-4 rounded-md bg-muted font-mono text-sm max-h-48 overflow-y-auto">
                    {matches.length > 0 ? (
                        <pre>{matches.map((m, i) => `[${i}]: ${m}`).join('\n')}</pre>
                    ) : (
                        <p className="text-muted-foreground">No matches found.</p>
                    )}
                </div>
            </div>
        </div>

      </CardContent>
    </Card>
  );
}


'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { generateMathFormula } from '@/ai/flows/generate-math-formula-flow';
import { Loader2, Wand2 } from 'lucide-react';

export function MathFormulaGenerator() {
  const [topic, setTopic] = useState('Area of a triangle');
  const [result, setResult] = useState<{ formula: string; explanation: string; } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!topic.trim()) return;

    setIsLoading(true);
    setResult(null);
    setError('');

    try {
      const response = await generateMathFormula({ topic });
      setResult(response);
    } catch (err: any) {
      setError('Failed to generate the formula. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Enter a Math Topic</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col sm:flex-row items-end gap-4">
          <div className="space-y-2 flex-grow">
            <Label htmlFor="topic-input">Topic</Label>
            <Input
              id="topic-input"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., Pythagorean theorem, Compound interest"
            />
          </div>
          <Button onClick={handleGenerate} disabled={isLoading || !topic} className="w-full sm:w-auto">
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
            {isLoading ? 'Generating...' : 'Generate'}
          </Button>
        </div>

        {(result || error) && (
          <Card className="bg-muted/50">
            <CardHeader>
              <CardTitle>Generated Formula</CardTitle>
            </CardHeader>
            <CardContent>
              {error && <p className="text-destructive">{error}</p>}
              {result && (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg">Formula:</h3>
                    <p className="font-mono text-primary text-2xl p-4 bg-background rounded-md text-center">{result.formula}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Explanation:</h3>
                    <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: result.explanation.replace(/\\n/g, '<br />') }} />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
}

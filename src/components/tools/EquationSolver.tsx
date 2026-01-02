
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { solveEquation } from '@/ai/flows/solve-equation-flow';
import { Loader2, Wand2 } from 'lucide-react';

export function EquationSolver() {
  const [equation, setEquation] = useState('2x + 5 = 15');
  const [result, setResult] = useState<{ solution: string; steps: string; } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSolve = async () => {
    if (!equation.trim()) return;

    setIsLoading(true);
    setResult(null);
    setError('');

    try {
      const response = await solveEquation({ equation });
      setResult(response);
    } catch (err: any) {
      setError('Failed to solve the equation. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Enter Your Equation</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col sm:flex-row items-end gap-4">
          <div className="space-y-2 flex-grow">
            <Label htmlFor="equation-input">Equation</Label>
            <Input
              id="equation-input"
              value={equation}
              onChange={(e) => setEquation(e.target.value)}
              placeholder="e.g., x^2 - 4 = 0"
              className="font-mono"
            />
          </div>
          <Button onClick={handleSolve} disabled={isLoading || !equation}>
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
            {isLoading ? 'Solving...' : 'Solve'}
          </Button>
        </div>

        {(result || error) && (
          <Card className="bg-muted/50">
            <CardHeader>
              <CardTitle>Solution</CardTitle>
            </CardHeader>
            <CardContent>
              {error && <p className="text-destructive">{error}</p>}
              {result && (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg">Result:</h3>
                    <p className="font-mono text-primary text-xl p-2 bg-background rounded-md">{result.solution}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Steps:</h3>
                    <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: result.steps.replace(/\n/g, '<br />') }} />
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

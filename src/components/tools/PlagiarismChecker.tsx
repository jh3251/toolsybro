
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Wand2, SearchCheck, Percent } from 'lucide-react';
import { checkPlagiarism, type PlagiarismResult } from '@/ai/flows/plagiarism-checker-flow';
import { Progress } from '../ui/progress';

export function PlagiarismChecker() {
  const [text, setText] = useState('');
  const [result, setResult] = useState<PlagiarismResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleCheck = async () => {
    if (text.trim().split(/\s+/).length < 20) {
      toast({
        title: 'Text is too short',
        description: 'Please enter at least 20 words for an effective plagiarism check.',
        variant: 'destructive',
      });
      return;
    }
    setIsLoading(true);
    setResult(null);
    try {
      const response = await checkPlagiarism({ text });
      setResult(response);
    } catch (e) {
      console.error(e);
      toast({
        title: 'Error Checking Plagiarism',
        description: 'Could not perform the check. Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Enter Text to Analyze</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your text here (minimum 20 words)..."
          className="min-h-[250px]"
          disabled={isLoading}
        />
        <Button onClick={handleCheck} disabled={isLoading || !text.trim()}>
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <SearchCheck className="mr-2 h-4 w-4" />
          )}
          {isLoading ? 'Analyzing...' : 'Check for Plagiarism'}
        </Button>
        
        {result && (
          <Card className="bg-muted/50">
            <CardHeader>
              <CardTitle>Analysis Result</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Percent className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Originality Score</p>
                  <p className="text-2xl font-bold">{result.originalityScore}%</p>
                </div>
              </div>
              <Progress value={result.originalityScore} className="h-2" />
              <div>
                <h3 className="font-semibold text-lg">AI Summary:</h3>
                <p className="text-muted-foreground mt-1">{result.summary}</p>
              </div>
               {result.plagiarizedSentences.length > 0 && (
                 <div>
                    <h3 className="font-semibold text-lg">Potentially Unoriginal Sentences:</h3>
                    <ul className="list-disc list-inside mt-2 space-y-2 text-sm text-destructive">
                        {result.plagiarizedSentences.map((sentence, index) => (
                            <li key={index}>"{sentence}"</li>
                        ))}
                    </ul>
                 </div>
               )}
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
}

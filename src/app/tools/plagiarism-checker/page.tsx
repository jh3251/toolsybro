
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { PlagiarismChecker } from '@/components/tools/PlagiarismChecker';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'AI Plagiarism Checker | Free Originality Analysis Tool | ToolsyBro',
  description: 'Check your text for originality and potential plagiarism with our 100% free, AI-powered tool. Get an originality score and identify non-unique content.',
};

export default function PlagiarismCheckerPage() {
  return (
    <Card className="overflow-hidden">
      <div className="bg-muted/30 p-6 sm:p-8">
        <div className="flex items-start gap-4 mb-6">
          <Link href="/?category=Text+%26+Writing+Tools" className="hidden sm:block">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back to Tools</span>
            </Button>
          </Link>
          <div className="flex-grow">
            <CardTitle className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">AI Plagiarism Checker</CardTitle>
            <CardDescription className="mt-2 text-lg text-muted-foreground">
              Analyze your text for originality and potential plagiarism.
            </CardDescription>
          </div>
        </div>
        <PlagiarismChecker />
      </div>
    </Card>
  );
}


import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { PrimeNumberChecker } from '@/components/tools/PrimeNumberChecker';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Prime Number Checker | Free Math Tool | ToolsyBro',
  description: 'Check if a number is a prime number with this 100% free and instant online tool. Perfect for students and math enthusiasts.',
};

export default function PrimeNumberCheckerPage() {
  return (
    <Card className="overflow-hidden">
        <div className="bg-muted/30 p-6 sm:p-8">
            <div className="flex items-start gap-4 mb-6">
                <Link href="/?category=Student+%26+Education+Tools" className="hidden sm:block">
                    <Button variant="outline" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                        <span className="sr-only">Back to Tools</span>
                    </Button>
                </Link>
                <div className="flex-grow">
                    <CardTitle className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Prime Number Checker</CardTitle>
                    <CardDescription className="mt-2 text-lg text-muted-foreground">
                        Instantly determine if a number is prime.
                    </CardDescription>
                </div>
            </div>
            <PrimeNumberChecker />
        </div>
    </Card>
  );
}

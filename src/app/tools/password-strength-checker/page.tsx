
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { PasswordStrengthChecker } from '@/components/tools/PasswordStrengthChecker';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Password Strength Checker | Free Security Tool | ToolsyBro',
  description: 'Analyze the strength of your password in real-time and get tips on how to make it more secure with our 100% free online tool.',
};

export default function PasswordStrengthCheckerPage() {
  return (
    <Card className="overflow-hidden">
        <div className="bg-muted/30 p-6 sm:p-8">
            <div className="flex items-start gap-4 mb-6">
                <Link href="/?category=Utility+%26+Productivity+Tools" className="hidden sm:block">
                    <Button variant="outline" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                        <span className="sr-only">Back to Tools</span>
                    </Button>
                </Link>
                <div className="flex-grow">
                    <CardTitle className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Password Strength Checker</CardTitle>
                    <CardDescription className="mt-2 text-lg text-muted-foreground">
                        See how strong your password is in real-time.
                    </CardDescription>
                </div>
            </div>
            <PasswordStrengthChecker />
        </div>
    </Card>
  );
}

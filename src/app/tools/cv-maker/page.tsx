
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { CvMaker } from '@/components/tools/CvMaker';

export const metadata: Metadata = {
  title: 'CV Maker | Free Professional Resume Builder | ToolsyBro',
  description: 'A 100% free online tool to create professional CVs and resumes. Build and download your resume in minutes with our 100% free tools.',
};

export default function CVMakerPage() {
  return (
    <div className="space-y-8">
      <header className="flex items-center gap-4">
        <Link href="/?category=Utility+%26+Productivity+Tools">
            <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back to Tools</span>
            </Button>
        </Link>
        <div>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">CV Maker</h1>
            <p className="mt-2 text-xl text-muted-foreground">
            Build a professional CV and download it as a PDF.
            </p>
        </div>
      </header>
      <CvMaker />
    </div>
  );
}

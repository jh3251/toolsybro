
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { BarcodeGenerator } from '@/components/tools/BarcodeGenerator';

export const metadata: Metadata = {
  title: 'Free Barcode Generator | ToolsyBro',
  description: 'Create various types of barcodes like CODE128, UPC, and EAN for your products or inventory with our 100% free online barcode generator.',
};

export default function BarcodeGeneratorPage() {
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
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">Barcode Generator</h1>
            <p className="mt-2 text-xl text-muted-foreground">
            Generate custom barcodes for any need.
            </p>
        </div>
      </header>
      <BarcodeGenerator />
    </div>
  );
}

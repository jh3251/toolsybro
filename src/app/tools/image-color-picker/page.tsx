
'use client';

import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const ImageColorPicker = dynamic(
  () => import('@/components/tools/ImageColorPicker').then(mod => mod.ImageColorPicker),
  { 
    ssr: false,
    loading: () => (
      <div className="space-y-6">
        <Skeleton className="w-full h-48" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Skeleton className="w-full h-64" />
            <Skeleton className="w-full h-64" />
        </div>
      </div>
    )
  }
);

export default function ImageColorPickerPage() {
  return (
    <Card className="overflow-hidden">
        <div className="bg-muted/30 p-6 sm:p-8">
            <div className="flex items-start gap-4 mb-6">
                <Link href="/?category=Image+Tools" className="hidden sm:block">
                    <Button variant="outline" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                        <span className="sr-only">Back to Tools</span>
                    </Button>
                </Link>
                <div className="flex-grow">
                    <CardTitle className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Image Color Picker</CardTitle>
                    <CardDescription className="mt-2 text-lg text-muted-foreground">
                        Extract colors and palettes from any image.
                    </CardDescription>
                </div>
            </div>
            <ImageColorPicker />
        </div>
    </Card>
  );
}

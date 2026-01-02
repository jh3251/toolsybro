'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb } from 'lucide-react';

interface AdvancedFeaturePlaceholderProps {
  title: string;
}

export function AdvancedFeaturePlaceholder({ title }: AdvancedFeaturePlaceholderProps) {
  return (
    <Card>
      <CardHeader className="flex-row items-center gap-4 space-y-0">
        <div className="p-3 rounded-full bg-primary/10 text-primary">
          <Lightbulb className="w-6 h-6" />
        </div>
        <CardTitle>{title} - Coming Soon!</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          This is an advanced tool that we are currently working on. Due to the complexity involved, we are developing a robust server-side solution to ensure the best performance and reliability.
        </p>
        <p className="text-muted-foreground mt-4">
          Please check back soon for updates. We appreciate your patience!
        </p>
      </CardContent>
    </Card>
  );
}

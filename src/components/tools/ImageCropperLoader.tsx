'use client';

import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';

const ImageCropper = dynamic(
  () => import('@/components/tools/ImageCropper').then((mod) => mod.ImageCropper),
  {
    ssr: false,
    loading: () => (
      <div className="space-y-6">
        <Skeleton className="w-full h-48" />
        <div className="flex gap-2">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-10 w-36" />
        </div>
      </div>
    ),
  }
);

export function ImageCropperLoader() {
  return <ImageCropper />;
}

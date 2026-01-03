
import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import { HomeClient } from '@/components/HomeClient';

export const metadata: Metadata = {
  title: 'ToolsyBro | 90+ Free Online Tools, No Sign-Up Required',
  description: 'Your one-stop destination for over 90+ 100% free tools. From image and text utilities to developer and finance calculators. No limits, no sign-up, and 100% privacy-focused.',
};

export default function Home() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <HomeClient />
        </Suspense>
    )
}

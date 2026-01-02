
'use client';

import './globals.css';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AdPlaceholder } from '@/components/layout/AdPlaceholder';
import { Toaster } from '@/components/ui/toaster';
import { useEffect, useState } from 'react';
import { FirebaseClientProvider } from '@/firebase';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-headline',
});

// Metadata and viewport are not used in a client component, 
// but we can keep them here for reference or move them to a parent layout if needed.
/*
export const metadata: Metadata = {
  title: {
    default: 'MultiToolSuite - Free Online Tools for Everyone',
    template: '%s | MultiToolSuite',
  },
  description:
    'A collection of free, simple, and powerful online tools including a word counter, image compressor, QR code generator, and more. Boost your productivity with MultiToolSuite.',
  keywords: [
    'online tools',
    'free tools',
    'word counter',
    'image compressor',
    'qr code generator',
    'text converter',
    'json formatter',
  ],
};

export const viewport: Viewport = {
  themeColor: '#4f46e5',
  colorScheme: 'light dark',
};
*/

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning={true}
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          inter.variable,
          plusJakartaSans.variable
        )}
      >
        <FirebaseClientProvider>
            <div className="relative flex min-h-dvh flex-col bg-background">
            <Header />
            <div className="container mx-auto flex-1 px-4 py-8 md:px-6">
                <div className="flex flex-col gap-8 lg:flex-row">
                <main className="flex-1 lg:w-3/4">{children}</main>
                <aside className="w-full lg:w-1/4">
                    <div className="sticky top-24 space-y-6">
                    <h3 className="font-semibold text-center text-muted-foreground">Advertisement</h3>
                    <AdPlaceholder width={300} height={600} title="Vertical Ad" className="mx-auto" />
                    </div>
                </aside>
                </div>
            </div>
            <Footer />
            </div>
            {isClient && <Toaster />}
        </FirebaseClientProvider>
      </body>
    </html>
  );
}

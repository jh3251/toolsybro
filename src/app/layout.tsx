
'use client';

import './globals.css';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from '@/components/ui/toaster';
import { useEffect, useState, Suspense } from 'react';
import { FirebaseClientProvider } from '@/firebase';
import Script from 'next/script';
import { ThemeProvider } from '@/components/ThemeProvider';
import type { Metadata } from 'next';
import { MainContent } from '@/components/MainContent';


const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-headline',
});

// Metadata can be defined in server components, but we can keep a placeholder here for client-side rendering.
// The actual metadata for static pages should be in the respective page.tsx files.
const metadata: Metadata = {
  title: 'ToolsyBro | 100% Free Online Tools for Everyone',
  description: 'A comprehensive collection of 90+ 100% free online tools. No sign-up required, no limits. All tools are privacy-focused and process data locally in your browser.',
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(err => {
        console.error('Service Worker registration failed:', err);
      });
    }
  }, []);

  return (
    <html lang="en" suppressHydrationWarning>
       <head>
        <title>ToolsyBro | 100% Free Online Tools for Everyone</title>
        <meta name="description" content="A comprehensive collection of 90+ 100% free online tools. No sign-up required, no limits. All tools are privacy-focused and process data locally in your browser." />
        <link rel="manifest" href="/manifest.webmanifest" />
        {/* IMPORTANT: Replace ca-pub-XXXXXXXXXXXXXXXX with your real Google AdSense publisher ID */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5214845531760839"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body
        suppressHydrationWarning={true}
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          inter.variable,
          plusJakartaSans.variable
        )}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
        >
          <FirebaseClientProvider>
              <div className="relative flex min-h-dvh flex-col bg-background">
              <Header />
              <Suspense fallback={<div className="flex-1 container mx-auto px-4 py-8 md:px-6">Loading...</div>}>
                <MainContent>{children}</MainContent>
              </Suspense>
              <Footer />
              </div>
              {isClient && <Toaster />}
          </FirebaseClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

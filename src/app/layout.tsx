
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
import Script from 'next/script';
import { ThemeProvider } from '@/components/ThemeProvider';
import type { Metadata } from 'next';
import { SharedToolsHeader } from '@/components/SharedToolsHeader';
import { usePathname } from 'next/navigation';


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
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const showSharedHeader = !isHomePage && (pathname.startsWith('/tools/') || pathname.startsWith('/?category='));


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
              <div className="container mx-auto flex-1 px-4 py-8 md:px-6">
                  <div className="flex flex-col gap-8 lg:flex-row">
                  <main className="flex-1 lg:w-3/4">
                    {showSharedHeader && <SharedToolsHeader />}
                    {children}
                  </main>
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
        </ThemeProvider>
      </body>
    </html>
  );
}


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

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-headline',
});

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
       <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
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
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
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
        </ThemeProvider>
      </body>
    </html>
  );
}

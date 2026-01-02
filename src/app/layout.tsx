import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AdPlaceholder } from '@/components/layout/AdPlaceholder';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-headline',
});

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
  themeColor: '#FFFFFF',
  colorScheme: 'light dark',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          inter.variable,
          plusJakartaSans.variable
        )}
      >
        <div className="relative flex min-h-dvh flex-col bg-background">
          <Header />
          <div className="container mx-auto flex-1 px-4 py-8 md:px-6">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_300px]">
              <main className="flex-1">{children}</main>
              <aside className="hidden lg:block">
                <div className="sticky top-24 space-y-8">
                  <AdPlaceholder
                    width={300}
                    height={250}
                    title="Ad (300x250)"
                  />
                  <AdPlaceholder
                    width={300}
                    height={600}
                    title="Ad (300x600)"
                  />
                </div>
              </aside>
            </div>
          </div>
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  );
}

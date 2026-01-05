
import type { Metadata } from 'next';
import { UrlShortener } from '@/components/tools/UrlShortener';

export const metadata: Metadata = {
  title: 'URL Shortener | Free Link Shortening Tool | ToolsyBro',
  description: 'A 100% free online tool to shorten long URLs. Quick, easy, and requires no sign-up.',
};

export default function UrlShortenerPage() {
    return <UrlShortener />;
}

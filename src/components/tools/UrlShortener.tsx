
'use client';

import { useState } from 'react';
import { useFirestore } from '@/firebase';
import { collection, doc, serverTimestamp } from 'firebase/firestore';
import { setDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Copy, Link as LinkIcon, Wand2, CheckCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { AdPlaceholder } from '../layout/AdPlaceholder';

export function UrlShortener() {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const firestore = useFirestore();
  const { toast } = useToast();

  const generateShortId = (length = 6) => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const handleShorten = async () => {
    if (!longUrl || !firestore) {
      toast({
        title: 'Invalid URL',
        description: 'Please enter a valid URL to shorten.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    setShortUrl('');

    try {
      const shortId = generateShortId();
      const docRef = doc(firestore, 'shortUrls', shortId);

      const newUrlData = {
        id: shortId,
        longUrl: longUrl.startsWith('http') ? longUrl : `http://${longUrl}`,
        createdAt: serverTimestamp(),
      };

      await setDocumentNonBlocking(docRef, newUrlData, {});
      
      const fullShortUrl = `${window.location.origin}/r/${shortId}`;
      setShortUrl(fullShortUrl);
      
      toast({
        title: 'URL Shortened!',
        description: 'Your new short URL is ready to be shared.',
      });

    } catch (error) {
      console.error('Error shortening URL:', error);
      toast({
        title: 'Error',
        description: 'Could not shorten the URL. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!shortUrl) return;
    navigator.clipboard.writeText(shortUrl);
    toast({
      title: 'Copied to Clipboard!',
      description: shortUrl,
    });
  };

  return (
    <Card className="overflow-hidden">
      <div className="bg-muted/30 p-6 sm:p-8">
         <div className="flex items-start gap-4 mb-6">
            <Link href="/?category=Utility+%26+Productivity+Tools" className="hidden sm:block">
                <Button variant="outline" size="icon">
                    <ArrowLeft className="h-4 w-4" />
                    <span className="sr-only">Back to Tools</span>
                </Button>
            </Link>
            <div className="flex-grow">
                 <CardTitle className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">URL Shortener</CardTitle>
                 <CardDescription className="mt-2 text-lg text-muted-foreground">
                    Turn long, ugly links into short, memorable ones.
                 </CardDescription>
            </div>
        </div>
         <div className="space-y-4">
           <div className="space-y-2">
             <Label htmlFor="long-url" className="text-base">Enter URL to Shorten</Label>
             <div className="relative">
               <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
               <Input
                 id="long-url"
                 value={longUrl}
                 onChange={(e) => setLongUrl(e.target.value)}
                 placeholder="https://example.com/very/long/url/to/shorten"
                 className="pl-10 h-12 text-base"
                 disabled={isLoading}
               />
             </div>
           </div>
           <Button onClick={handleShorten} disabled={isLoading || !longUrl} size="lg" className="w-full">
             <Wand2 className="mr-2 h-4 w-4" />
             {isLoading ? 'Shortening...' : 'Shorten'}
           </Button>
         </div>
      </div>
      <CardContent className="p-6 sm:p-8 space-y-6">
        {shortUrl && (
          <div className="space-y-2">
            <Label htmlFor="short-url" className="text-base">Your Short URL</Label>
             <div className="relative">
                <CheckCircle className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-green-500" />
                <Input
                    id="short-url"
                    value={shortUrl}
                    readOnly
                    className="pl-10 font-mono text-green-600 bg-green-50 dark:bg-green-900/20 h-12 text-base"
                />
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleCopy}
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-10 w-10"
                >
                    <Copy className="h-5 w-5" />
                </Button>
            </div>
          </div>
        )}
         <div className="flex justify-center pt-4">
            <AdPlaceholder width={300} height={250} title="Advertisement" />
        </div>
      </CardContent>
    </Card>
  );
}

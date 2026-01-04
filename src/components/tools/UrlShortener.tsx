
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
import { Copy, Link, Wand2, CheckCircle } from 'lucide-react';

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

      setDocumentNonBlocking(docRef, newUrlData, {});
      
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
    <Card>
      <CardHeader>
        <CardTitle>Enter URL to Shorten</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col sm:flex-row items-end gap-4">
          <div className="space-y-2 flex-grow w-full">
            <Label htmlFor="long-url">Long URL</Label>
            <div className="relative">
              <Link className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                id="long-url"
                value={longUrl}
                onChange={(e) => setLongUrl(e.target.value)}
                placeholder="https://example.com/very/long/url/to/shorten"
                className="pl-10"
                disabled={isLoading}
              />
            </div>
          </div>
          <Button onClick={handleShorten} disabled={isLoading || !longUrl} className="w-full sm:w-auto">
            <Wand2 className="mr-2 h-4 w-4" />
            {isLoading ? 'Shortening...' : 'Shorten'}
          </Button>
        </div>

        {shortUrl && (
          <div className="space-y-2">
            <Label htmlFor="short-url">Your Short URL</Label>
             <div className="relative">
                <CheckCircle className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-green-500" />
                <Input
                    id="short-url"
                    value={shortUrl}
                    readOnly
                    className="pl-10 font-mono text-green-600 bg-green-50 dark:bg-green-900/20"
                />
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleCopy}
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                >
                    <Copy className="h-4 w-4" />
                </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

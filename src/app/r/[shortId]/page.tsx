
'use client';

import { useEffect, useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import { useFirestore, initializeFirebase } from '@/firebase';
import { doc, getDoc, DocumentData } from 'firebase/firestore';
import { Loader2 } from 'lucide-react';

// This is a client component to handle redirection
export default function ShortUrlRedirectPage() {
  const { shortId } = useParams<{ shortId: string }>();
  const firestore = useFirestore();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!firestore || !shortId) return;

    const getUrlAndRedirect = async () => {
      try {
        const docRef = doc(firestore, 'shortUrls', shortId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data() as DocumentData;
          const longUrl = data.longUrl;
          if (longUrl) {
            // Perform the redirect
            window.location.replace(longUrl);
          } else {
            setError('The destination URL for this link is missing.');
          }
        } else {
          // This will trigger the not-found.js boundary if it exists
          notFound();
        }
      } catch (e) {
        console.error("Error fetching short URL:", e);
        setError('Could not retrieve the URL. Please try again.');
      }
    };

    getUrlAndRedirect();
  }, [firestore, shortId]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
      {error ? (
        <div className="text-destructive space-y-4">
            <h1 className="text-2xl font-bold">Redirection Failed</h1>
            <p>{error}</p>
        </div>
      ) : (
        <div className="space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <h1 className="text-2xl font-bold">Redirecting...</h1>
          <p className="text-muted-foreground">Please wait while we take you to your destination.</p>
        </div>
      )}
    </div>
  );
}

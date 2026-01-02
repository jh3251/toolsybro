'use client';

import { useState, useEffect } from 'react';
import type { Metadata } from 'next';

export default function TermsAndConditionsPage() {
  const [lastUpdated, setLastUpdated] = useState('');

  useEffect(() => {
    setLastUpdated(new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }));
  }, []);

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">Terms & Conditions</h1>
        {lastUpdated && <p className="mt-4 text-xl text-muted-foreground">Last updated: {lastUpdated}</p>}
      </header>
      <article className="prose prose-lg dark:prose-invert max-w-none space-y-4 text-muted-foreground">
        <p>
          By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.
        </p>
        <h2 className="text-3xl font-bold font-headline text-foreground">Use of Service</h2>
        <p>
          This site and its components are offered for informational purposes only; this site shall not be responsible or liable for the accuracy, usefulness or availability of any information transmitted or made available via the site, and shall not be responsible or liable for any error or omissions in that information.
        </p>
        <h2 className="text-3xl font-bold font-headline text-foreground">Intellectual Property</h2>
        <p>
          The Site and its original content, features, and functionality are owned by MultiToolSuite and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
        </p>
        <h2 className="text-3xl font-bold font-headline text-foreground">Termination</h2>
        <p>
          We may terminate your access to the Site, without cause or notice, which may result in the forfeiture and destruction of all information associated with your account. All provisions of this Agreement that, by their nature, should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
        </p>
        <h2 className="text-3xl font-bold font-headline text-foreground">Changes to This Agreement</h2>
        <p>
          We reserve the right to modify these Terms of Service at any time. We do so by posting and drawing attention to the updated terms on the Site. Your decision to continue to visit and make use of the Site after such changes have been made constitutes your formal acceptance of the new Terms of Service.
        </p>
      </article>
    </div>
  );
}
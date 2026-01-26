'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export function FooterAd() {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, []);

  return (
    <div className="mx-auto flex w-full items-center justify-center" style={{minHeight: '90px'}}>
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-5214845531760839"
          data-ad-slot="4538606574"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
    </div>
  );
}
